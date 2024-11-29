// names: user.names,
// surnames: user.surnames,
// roleId: roleId,
// password: hashpass,
// email: user.email,
import { body } from "express-validator";
import { User } from "./userModel.js";
export const userSchema = [
    body('user.names')
        .notEmpty()
        .withMessage('Ingrese su nombre'),
    body('user.surnames')
        .notEmpty()
        .withMessage('Ingrese su apellido'),
    body('user.role')
        .notEmpty()
        .isIn(['student', 'recruiter', 'admin', 'superadmin'])
        .withMessage('El rol es incorrecto'),
    body('user.email')
        .isEmail()
        .withMessage('El email es requerido')
        .custom(async (value) => {
            const existingUser = await User.findOne({ where: { email: value } });
            if (existingUser) {
                return Promise.reject('El email ya esta en uso');
            }
        }),
    body('user.password')
        .notEmpty()
        .isString()
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }).withMessage('La contraseña no cumple con los requisitos mínimos'),
    body('user.cuil')
        .if(body('user.role').equals('student'))
        .notEmpty().withMessage('Ingrese el CUIL')
        .isNumeric().withMessage('El CUIL debe ser numérico')
        .isLength({ min: 11, max: 11 }).withMessage('El CUIL debe tener 11 dígitos')
]