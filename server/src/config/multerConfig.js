import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    // Obtener la fecha y hora actual
    const datetime = new Date().toISOString().replace(/[-T:.Z]/g, '');

    // Crear el nuevo nombre del archivo con fecha y nombre original
    const newFileName = `${datetime}_${file.originalname}`;

    cb(null, newFileName);
  },
});

// Configuración de Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB máximo
});

export default upload;
