import {Router} from 'express';
import { createReview, getAllReviews } from '../controllers/reviewControllers';

export const router = Router();

router.get('/', getAllReviews);
router.post('/', createReview);