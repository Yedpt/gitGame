import { Router } from "express";
import multer from 'multer';
import { uploadMiddleware } from "../middleware/multerMiddleware";
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


// Configura la ruta para la subida de imágenes
reviewRouter.post('/', uploadMiddleware, createReview);
// reviewRouter.post('/', createReview); // Cambiado de '/reviews' a '/' para que coincida con el router

// Rutas de CRUD para reviews
reviewRouter.get('/', getAllReviews);
reviewRouter.get('/:id', getReviewById);
reviewRouter.delete('/:id', deleteReview);
reviewRouter.put('/:id', updateReview);
reviewRouter.get('/user/:userId', getReviewsByUserId);
