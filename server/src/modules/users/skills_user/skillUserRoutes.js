// Rutas para vincular habilidades a usuarios
import { SkillsUser } from './skillsUserModel.js';
import { User } from '../userModel.js';
import { Skill } from '../../skills/skillsModel.js';

// Vincular una habilidad a un usuario
app.post('/link-skill', async (req, res) => {
  const { skillId } = req.body;
  const userId = req.user.id; // Asumiendo que tienes autenticación y userId está disponible en req.user

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
});

// Obtener habilidades vinculadas al usuario
app.get('/user-skills', async (req, res) => {
  const userId = req.user.id; // Asumiendo autenticación
  try {
    const linkedSkills = await SkillsUser.findAll({ where: { userId } });
    res.json({ linkedSkills: linkedSkills.map(s => s.skillId) });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener habilidades vinculadas' });
  }
});
