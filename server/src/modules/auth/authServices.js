import { User } from "../users/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BASIC_ROLES } from "../../constant/roles.js";
import { sendRecoverPasswordEmail } from "./mailServices/recoverPassMail.js";
import { generateVerificationCode } from "../../helpers/generateCode.js";
import { sendConfirmAccount } from "./mailServices/confirmAccount.js";
import { Role } from "../roles/roleModel.js";
import { sequelize } from "../../config/db.js";
import { Profile } from "../profile/profileModel.js";
import { getUserById } from "../users/userServices.js";
import { getApprovedAssociationsByUser } from "../recruiters/associations/associationServices.js";
import { Op } from "sequelize";

export const authSignUpSvc = async (user) => {
  const t = await sequelize.transaction();
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: user.username },
          { email: user.email }
        ]
      }
    });

    if (existingUser) {
      throw new Error("El usuario ya existe en nuestro sistema.");
    }

    const roleId = BASIC_ROLES[user.role];
    if (!roleId) {
      throw new Error("Rol no valido");
    }

    const createdUser = await User.create({
      username: user.username,
      email: user.email,
      roleId: roleId,
      password: user.password,
    }, { transaction: t });

    const profile = await Profile.create({
      userId: createdUser.id,
      names: user.names,
      surnames: user.surnames,
      cuil: user.cuil,
      userStateId: 1,
      state: 1,
    }, { transaction: t });


    const token = jwt.sign(
      { userId: createdUser.id },
      process.env.TOKEN_SECRET_KEY
    );

    await sendConfirmAccountSvc(createdUser.id, t);
    await t.commit();
    return token;
  } catch (error) {
    await t.rollback();
    throw new Error(error.message);
  }
};

export const authIsEmailAvailableSvc = async (email) => {
  try {
    return User.findOne({ where: { email } })
  } catch (error) {
    throw error
  }
}
export const authIsUsernameAvailableSvc = async (username) => {
  try {
    return User.findOne({ where: { username } })
  } catch (error) {
    throw error
  }
}
// Si el usuario que se loguea tiene el campo verified == false, se le envia el correo de confirmacion
// La funcion retorna isVerified, en el cliente se debe verificar si es true o false para mostrar la pagina correspondiente
export const authLogInSvc = async (user) => {
  try {
    const isUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: user.email },
          { email: user.email }
        ]
      }
    })

    if (!isUser) {
      throw new Error('No se encontro una cuenta con ese email o nombre de usuario')
    }
    if (isUser.dataValues.banned) {
      throw new Error("Tu cuenta se encuentra suspendida permanentemente. Revisa la casilla de tu correo electrónico para más información");
    }
    if (isUser.dataValues.suspensionExpires && new Date(isUser.dataValues.suspensionExpires) > new Date()) {
      throw new Error(`Tu cuenta se encuentra suspendida temporalmente hasta el ${isUser.dataValues.suspensionExpires}. Revisa la casilla de tu correo electrónico para más información`);
    }
    const validPassword = await bcrypt.compare(user.password, isUser.password);
    if (!validPassword) throw new Error("Contraseña incorrecta");

    const isVerified = isUser.verified
    // if (!isVerified) { COMENTADO EN DESARROLLO
    //     sendConfirmAccount(isUser.email, isUser.verifyCode, isUser.names)
    // }

    const token = jwt.sign({ userId: isUser.id }, process.env.TOKEN_SECRET_KEY);

    const existingUser = await getUserById(isUser.id)
    console.log("existingUser", existingUser)

    const response = { token, existingUser, isVerified };

    if (existingUser.role.name === 'recruiter') {
      response.associations = await getApprovedAssociationsByUser(existingUser.profile.id);
    }

    return response;

  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

export const sendConfirmAccountSvc = async (userId, t) => {
  try {
    const newVerifyCode = generateVerificationCode();
    await User.update({ verifyCode: newVerifyCode }, { where: { id: userId }, attributes: ['verifyCode', 'email'], transaction: t },);
    const user = await User.findByPk(userId, {
      include: [{
        model: Profile,
        attributes: ['names']
      }],
      transaction: t
    });
    if (!user.verifyCode || !user.email || !user.profile.names) {
      throw new Error("Error interno en el servidor, inicie sesion nuevamente");
    }
    if (user.verified == true) {
      throw new Error("Correo ya verificado");
    }
    await sendConfirmAccount(user.email, user.verifyCode, user.profile.names);
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
};

export const confirmAccountSvc = async (id, receivedCode) => {
  try {
    const user = await User.findByPk(id);
    if (user.verified == true) {
      throw new Error("Correo ya verificado");
    } else if (user.verifyCode != receivedCode) {
      throw new Error("Codigo incorrecto");
    }

    const [rowUpdated] = await User.update(
      { verified: true, verifyCode: null },
      { where: { id: id } }
    );

    if (rowUpdated < 1)
      throw new Error(
        "Hubo un error al confirmar la cuenta, intentelo de nuevo"
      );

    return {
      token: jwt.sign(
        { userId: user.id },
        process.env.TOKEN_SECRET_KEY
      ), existingUser: await getUserById(id)
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
};

export const sendRecoverPasswordSvc = async (email) => {
  try {
    const { names, id } = await User.findOne({ where: { email: email } });
    if (!id) {
      throw new Error("No se encontro una cuenta con ese correo electronico");
    }
    const newVerifyCode = generateVerificationCode();

    const [rowUpdated] = await User.update(
      { verifyCode: newVerifyCode },
      { where: { email: email } }
    );
    if (rowUpdated < 1)
      throw new Error("Hubo un error al enviar el correo electronico");

    const token = jwt.sign({ email: email }, process.env.TOKEN_SECRET_KEY);
    await sendRecoverPasswordEmail(email, newVerifyCode, names);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

export const recoverPasswordSvc = async (email, receivedCode, newPass) => {
  const { verifyCode } = await User.findOne({ where: { email: email } });

  if (verifyCode !== receivedCode) {
    throw new Error("El codigo ingresado es incorrecto");
  }
  const passhash = await bcrypt.hash(newPass, 10);

  try {
    const [rowUpdated] = await User.update(
      { password: passhash, verifyCode: null },
      { where: { email: email, verifyCode: verifyCode } }
    );
    if (rowUpdated < 1)
      throw new Error("Hubo un error al actualizar la contraseña");
  } catch (error) {
    throw new Error(error);
  }
};

export const validateToken = () => {
  return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
}

export const getRoles = async (id) => {
  try {
    const role = await Role.findByPk(id)
    if (!role) {
      throw new Error('No se encontro el rol')
    }
    return role.name
  } catch (error) {
    throw new Error(error.message)
  }
}