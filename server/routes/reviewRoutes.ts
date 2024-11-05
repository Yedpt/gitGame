import { Router } from "express";
import multer from 'multer';
import { 
  createReview, 
  updateReview, 
  deleteReview, 
  getAllReviews, 
  getReviewById, 
  getReviewsByUserId  
} from "../controllers/reviewControllers";

// Crea el router para las rutas de reviews
export const reviewRouter = Router();

// Crea una instancia de `upload` de Multer usando el middleware que ya definiste
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/reviews/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Configura la ruta para la subida de imágenes
reviewRouter.post('/upload', upload.single('image_url'), createReview);
reviewRouter.post('/', createReview); // Cambiado de '/reviews' a '/' para que coincida con el router

// Rutas de CRUD para reviews
reviewRouter.get('/', getAllReviews);
reviewRouter.get('/:id', getReviewById);
reviewRouter.delete('/:id', deleteReview);
reviewRouter.put('/:id', updateReview);
reviewRouter.get('/user/:userId', getReviewsByUserId);
