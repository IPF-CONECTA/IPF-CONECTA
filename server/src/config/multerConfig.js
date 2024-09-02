import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'logoUrl') {
      cb(null, 'uploads/logoUrlS/'); // Carpeta para logos
    } else if (file.fieldname === 'Profile') {
      cb(null, 'uploads/profiles/'); // Carpeta para perfiles
    } else {
      cb(new Error('Campo de archivo no válido'), false);
    }
  },
  filename: (req, file, cb) => {
    const datetime = new Date().toISOString().replace(/[-T:.Z]/g, '');
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
