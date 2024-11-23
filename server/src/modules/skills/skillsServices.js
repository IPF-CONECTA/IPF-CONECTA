import { Op } from "sequelize"
import { Skill } from "./skillsModel.js"


export const findSkillSvc = async (query = '', limit = 10, offset = 0) => {
  try {
    const results = await Skill.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`
        }
      },
      limit,      // Limitar el número de resultados
      offset      // Saltar un número de registros
    });
    return results;
  } catch (error) {
    console.error(error);
    throw new Error('Error en la búsqueda de habilidades');
  }
};


// Servicio para crear una nueva habilidad
export const createSkillSvc = async (name) => {
    try {
<<<<<<< HEAD
        const results = await Skill.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${query}%`
                }
            },
            limit: 50
        })
        return results
=======
        const newSkill = await Skill.create({ name });
        return newSkill;
>>>>>>> 166135bf0ccd58015a96076590f7549fad98facc
    } catch (error) {
        console.error('Error al crear habilidad:', error);
        throw new Error('Error al crear habilidad');
    }
<<<<<<< HEAD
}

export const getSkillByPk = async (id) => {
    try {
        const skill = Skill.findByPk(id)
        if (!skill) throw new Error("No se encontró la skill")
        return skill
    } catch (error) {
        throw error
    }
}
=======
};

// Servicio para eliminar una habilidad
export const deleteSkillSvc = async (id) => {
    try {
        const deleted = await Skill.destroy({ where: { id } });
        if (!deleted) throw new Error('Habilidad no encontrada');
        return true;
    } catch (error) {
        console.error('Error al eliminar habilidad:', error);
        throw new Error('Error al eliminar habilidad');
    }
};
>>>>>>> 166135bf0ccd58015a96076590f7549fad98facc
