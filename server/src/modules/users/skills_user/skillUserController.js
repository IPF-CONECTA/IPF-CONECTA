// controllers/skillUserController.js
import { SkillsUser } from './skillsUserModel.js';
import { Skill } from '../../skills/skillsModel.js';

// Controlador para vincular una habilidad a un usuario
export const linkSkillToUser = async (req, res) => {
  const { skillId } = req.body;
  const userId = req.user.id; // Esto ya estará disponible gracias al middleware

  try {
    const skill = await Skill.findByPk(skillId);
    if (!skill) {
      return res.status(404).json({ message: 'Habilidad no encontrada' });
    }

    // Crear la relación en la tabla SkillsUser
    await SkillsUser.create({ skillId, userId });
    res.json({ message: 'Habilidad vinculada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al vincular habilidad' });
  }
};

// Controlador para obtener las habilidades del usuario autenticado
export const getUserSkills = async (req, res) => {
  const userId = req.user.id;

  try {
    const linkedSkills = await SkillsUser.findAll({ where: { userId } });
    res.json({ linkedSkills: linkedSkills.map(s => s.skillId) });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener habilidades vinculadas' });
  }
};
