import multer from 'multer';
import path from 'path';

// Ruta absoluta a la carpeta de almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('C:/Users/usuario/Desktop/bootcamp/gitGame/server/uploads/reviews'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
}
});

export const upload = multer({ storage });
