import { SkillsUser } from './skillsUserModel.js';
import { Skill } from '../../skills/skillsModel.js';
import { User } from '../userModel.js';
// Controlador para vincular una habilidad a un usuario
export const linkSkillToUser = async (req, res) => {
  const { skillId } = req.body;
  const userId = req.user.id;
  console.log('userId desde el token:', userId);

  try {
    // Verificar si el userId existe en la tabla users
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'El usuario no existe.' });
    }

    // Verificar si la habilidad existe
    const skillExists = await Skill.findByPk(skillId);
    if (!skillExists) {
      return res.status(404).json({ message: 'La habilidad no existe.' });
    }

    // Crear la relación
    const newSkillUser = await SkillsUser.create({
      skillId,
      userId,
    });
    res.status(201).json(newSkillUser);
  } catch (error) {
    console.error('Error al vincular habilidad:', error);
    res.status(500).json({ message: 'Error al vincular habilidad', error: error.message });
  }
};


// Controlador para obtener las habilidades del usuario autenticado
export const getUserSkills = async (req, res) => {
  const userId = req.user.id;

  try {
    const linkedSkills = await SkillsUser.findAll({ where: { userId } });
    const skillIds = linkedSkills.map((s) => s.skillId);

    if (skillIds.length === 0) {
      return res.status(404).json({ message: 'No se encontraron habilidades para este usuario.' });
    }

    const skills = await Skill.findAll({ where: { id: skillIds } });
    res.json({ skills });
  } catch (error) {
    console.error('Error al obtener habilidades vinculadas:', error);
    res.status(500).json({ message: 'Error al obtener habilidades vinculadas' });
  }
};
