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
  incrementLike
} from "../controllers/reviewControllers";
import { validateCreateReview, validateUpdateReview, validateDeleteReview } from "../utils/validations/reviewValidation";
import { validationHandler } from "../utils/handle/handleValidator";


export const reviewRouter = Router();

reviewRouter.post('/', upload.single('image_url'),validateCreateReview, validationHandler, createReview);

reviewRouter.get('/admin', getAllAdminReviews);
reviewRouter.get('/user', getAllUserReviews);
reviewRouter.get('/:id', getReviewById);
reviewRouter.get('/user/:userId', getReviewsByUserId);
reviewRouter.get('/', getAllReviews);

reviewRouter.delete('/:id',validateDeleteReview , validationHandler, deleteReview);
reviewRouter.put('/:id', validateUpdateReview, validationHandler, updateReview);
reviewRouter.put('/:id/like', incrementLike);


