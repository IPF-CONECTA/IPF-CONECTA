// Controlador para vincular o desvincular una habilidad a un usuario
import { SkillsUser } from './skillsUserModel.js';
import { Skill } from '../../skills/skillsModel.js';
import { Profile } from '../../profile/profileModel.js';

export const linkSkillToUser = async (req, res) => {
  const { skillId } = req.body;
  const userId = req.user.id;

  try {
    // Verificar si el usuario existe
    const userExists = await Profile.findOne({
      where: { userId }
    });
    if (!userExists) {
      return res.status(404).json({ message: 'El usuario no existe.' });
    }

    // Verificar si la habilidad existe
    const skillExists = await Skill.findByPk(skillId);
    if (!skillExists) {
      return res.status(404).json({ message: 'La habilidad no existe.' });
    }

    // Verificar si la relación ya existe
    const existingLink = await SkillsUser.findOne({
      where: { userId:userExists.id, skillId: skillExists.id }
    });
    console.log(existingLink)
    if (existingLink) {
      // Si ya existe, loguear y devolver un mensaje de error
      console.log(`La habilidad con ID ${skillId} ya está vinculada al usuario con ID ${userId}.`);
      return res.status(400).json({ message: 'La habilidad ya está vinculada a este usuario.' });
    }

    // Si no existe la relación, crearla (vincular la habilidad)
    const newSkillUser = await SkillsUser.create({
      skillId: skillExists.id,
      userId: userExists.id
    });

    res.status(201).json(newSkillUser);
  } catch (error) {
    console.error('Error al vincular habilidad:', error);
    res.status(500).json({ message: 'Error al vincular habilidad', error: error.message });
  }
};

// Controlador para obtener las habilidades del usuario autenticado// Controlador para obtener las habilidades del usuario autenticado
export const getUserSkills = async (req, res) => {
  const userId = req.params.userId; // Obtiene el userId de los parámetros

  try {
    // Busca las habilidades vinculadas del usuario
    const linkedSkills = await SkillsUser.findAll({
      where: { userId }, // Asegúrate de que la columna 'userId' exista
      include: [{ model: Skill }] // Incluye la relación con Skill
    });

    if (!linkedSkills || linkedSkills.length === 0) {
      return res.status(404).json({ message: 'No se encontraron habilidades para este usuario.' });
    }

    // Extraer habilidades y devolverlas
    const skills = linkedSkills.map(link => link.skill); // Esto debería contener las habilidades vinculadas
    res.json({ skills });
  } catch (error) {
    console.error('Error al obtener habilidades vinculadas:', error);
    res.status(500).json({ message: 'Error al obtener habilidades vinculadas', error: error.message });
  }
};


// Controlador para desvincular una habilidad del usuario
export const unlinkSkill = async (req, res) => {
  const { skillId } = req.body; // Obtener el skillId del cuerpo de la solicitud
  const userId = req.user.id; // Obtener el userId del token

  try {
    // Verificar si la relación existe
    const existingLink = await SkillsUser.findOne({
      where: { userId, skillId }
    });

    if (!existingLink) {
      return res.status(404).json({ message: 'La habilidad no está vinculada a este usuario.' });
    }

    // Desvincular la habilidad
    await existingLink.destroy();
    res.json({ message: 'Habilidad desvinculada exitosamente.' });
  } catch (error) {
    console.error('Error al desvincular habilidad:', error);
    res.status(500).json({ message: 'Error al desvincular habilidad', error: error.message });
  }
};
