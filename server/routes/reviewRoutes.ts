import { Router } from "express";
import { upload } from "../middleware/reviewUpload";
import path from 'path';
import { 
  createReview, 

  deleteReview, 
  getAllReviews, 
  getReviewById, 
  getReviewsByUserId  
} from "../controllers/reviewControllers";



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

