import { findSkillSvc, createSkillSvc, deleteSkillSvc } from "./skillsServices.js";



export const findSkillsCtrl = async (req, res) => {
  const { query = '', limit = 10, page = 1 } = req.query;  // obtener los parámetros
  const offset = (page - 1) * limit;  // calcular el desplazamiento para la paginación

  try {
    const results = await findSkillSvc(query, parseInt(limit), offset);
    if (results.count < 1) return res.status(404).json({ message: 'No se encontraron coincidencias' });
    res.status(200).json({
      total: results.count,           // Total de registros
      skills: results.rows,           // Habilidades
      currentPage: page,              // Página actual
      totalPages: Math.ceil(results.count / limit)  // Total de páginas
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controlador para crear una nueva habilidad
export const createSkillCtrl = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'El nombre de la habilidad es obligatorio' });
    
    try {
        const newSkill = await createSkillSvc(name);
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar una habilidad
export const deleteSkillCtrl = async (req, res) => {
    const { id } = req.params;
    
    try {
        await deleteSkillSvc(id);
        res.status(200).json({ message: 'Habilidad eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
