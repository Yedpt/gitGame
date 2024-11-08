import multer from 'multer';
import path from 'path';

// Ruta absoluta a la carpeta de almacenamiento de imágenes
const UPLOADS_PATH = path.resolve('uploads/reviews');

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_PATH);  // Ruta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    // Usar el nombre original del archivo para el nombre
    const fileName = file.originalname;
    
    // Asegurarse de que el nombre del archivo no contenga caracteres inválidos
    const safeFileName = fileName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\.\-]/g, '').toLowerCase();
    
    cb(null, safeFileName); // Usar el nombre seguro del archivo
  }
});

// Middleware para cargar el archivo de una sola imagen
export const upload = multer({ storage });
