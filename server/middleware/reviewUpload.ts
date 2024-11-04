// src/middleware/upload.ts
import multer from 'multer';
import path from 'path';

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/reviews'); // Carpeta de destino
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Nombre único para el archivo
    }
});

export const upload = multer({ storage });
