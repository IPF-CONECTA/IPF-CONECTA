import { SkillsUser } from './skillsUserModel.js';
import { Skill } from '../../skills/skillsModel.js';

// Controlador para vincular una habilidad a un usuario
export const linkSkillToProfile = async (req, res) => {
  const { skillId } = req.body; // Asegúrate de que estás obteniendo el skillId del cuerpo de la solicitud
  const userId = req.user.id; // Obtener userId del token

  try {
      const newSkillUser = await SkillsUser.create({
          skillId,
          userId
      });
      res.status(201).json(newSkillUser);
  } catch (error) {
      console.error('Error al vincular habilidad:', error);
      res.status(500).json({ message: 'Error al vincular habilidad' });
  }
};

// Controlador para obtener las habilidades del usuario autenticado
export const getUserSkills = async (req, res) => {
    const userId = req.user.id;

    try {
        const linkedSkills = await SkillsUser.findAll({ where: { userId } });
        const skillIds = linkedSkills.map(s => s.skillId);

        // Obtener detalles de habilidades
        const skills = await Skill.findAll({ where: { id: skillIds } });
        res.json({ skills });
    } catch (error) {
        console.error("Error al obtener habilidades vinculadas:", error);
        res.status(500).json({ message: 'Error al obtener habilidades vinculadas' });
    }
};
