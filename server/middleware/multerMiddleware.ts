// middleware/multerMiddleware.ts
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Crear la carpeta base si no existe
const createUploadsFolder = (folder: string) => {
  const dir = path.join(__dirname, '../uploads', folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configuración del almacenamiento para multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = 'reviews'; // Determina la carpeta según el tipo
    createUploadsFolder(folder); // Crea la carpeta si no existe
    cb(null, path.join(__dirname, '../uploads', folder)); // Guarda en la carpeta correspondiente
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filtro para validar solo imágenes
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no válido. Solo se permiten imágenes."));
  }
};

// Configuración de multer con almacenamiento y filtro
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB de tamaño máximo
  fileFilter: fileFilter,
});

// Exportar el middleware de multer
export const uploadMiddleware = upload.single('image_url');
