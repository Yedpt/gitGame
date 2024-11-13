import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./uploads/launch/");
  },
  filename: (_req, file, cb) => {
    // Usa el nombre original del archivo para el nombre
    const fileName = file.originalname;

    // Asegura que el nombre del archivo no contenga caracteres inválidos
    const safeFileName = fileName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\.\-]/g, '').toLowerCase();
    cb(null, safeFileName);
  }
});

// Middleware para cargar el archivo de una sola imagen
export const upload = multer({ storage });
