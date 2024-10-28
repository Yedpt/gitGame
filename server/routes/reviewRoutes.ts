import {Router} from 'express';
import { createReview, getAllReviews } from '../controllers/reviewControllers';

export const reviewRouter = Router();

reviewRouter.get('/', getAllReviews);
reviewRouter.post('/', createReview);