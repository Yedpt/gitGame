import { Router } from "express";
import { upload } from "../middleware/reviewUpload";
import path from 'path';
import { 
  createReview, 
  updateReview,
  deleteReview, 
  getAllReviews, 
  getReviewById, 
  getReviewsByUserId,
  getAllAdminReviews,
  getAllUserReviews,
} from "../controllers/reviewControllers";


// Crea el router para las rutas de reviews
export const reviewRouter = Router();

// Ruta para la creación de una reseña con imagen
reviewRouter.post('/', upload.single('image_url'), createReview);

// Rutas específicas y dinámicas
reviewRouter.get('/admin', getAllAdminReviews);
reviewRouter.get('/user', getAllUserReviews);
reviewRouter.get('/:id', getReviewById);
reviewRouter.get('/user/:userId', getReviewsByUserId);
reviewRouter.get('/', getAllReviews);

// Rutas CRUD
reviewRouter.delete('/:id', deleteReview);
reviewRouter.put('/:id', updateReview);


