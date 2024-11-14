import multer from 'multer';
import path from 'path';

// Ruta absoluta a la carpeta de almacenamiento de imágenes
const UPLOADS_PATH = path.resolve('./uploads/video/');


// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_PATH); // Ruta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    const safeFileName = file.originalname.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\.\-]/g, '').toLowerCase();
    cb(null, safeFileName); // Nombre seguro del archivo
  }
});

export const upload = multer({ storage });
