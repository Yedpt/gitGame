// src/services/reviewService.ts
import { Model } from 'sequelize';
import Reviews from '../models/reviewModel';
import { ReviewAttributes } from '../interfaces/reviewInterfaces';

export const addLikeToReview = async (reviewId: number): Promise<Model<ReviewAttributes> | null> => {
  try {
    const review = await Reviews.findByPk(reviewId);
    if (!review) return null;

    const currentLikes = review.get('num_likes') as number || 0;
    await review.update({ num_likes: currentLikes + 1 });

    return review;
  } catch (error) {
    throw new Error('Error al agregar un like a la reseña');
  }
};
