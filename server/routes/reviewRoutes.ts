import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { 
  createReview, 

  deleteReview, 
  getAllReviews, 
  getReviewById, 
  getReviewsByUserId  
} from "../controllers/reviewControllers";

// Ruta absoluta para almacenar las imágenes de reseñas
const UPLOADS_PATH = path.resolve('C:/Users/Administrator/Desktop/bootcamp/gitGame/gitGame/server/uploads/reviews');

// Define el tipo de archivo de Multer
interface MulterRequest extends Express.Request {
  file?: Express.Multer.File;
}

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_PATH);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Crea el router para las rutas de reviews
export const reviewRouter = Router();

// Ruta para la creación de una reseña con imagen
reviewRouter.post('/', upload.single('image_url'), createReview);

// Rutas CRUD para reviews
reviewRouter.get('/', getAllReviews);
reviewRouter.get('/:id', getReviewById);
reviewRouter.delete('/:id', deleteReview);
// reviewRouter.put('/:id', updateReview);
reviewRouter.get('/user/:userId', getReviewsByUserId);

