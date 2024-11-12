// utils/validations/reviewValidation.ts
import { check } from 'express-validator';

export const validateCreateReview = [
  check('user_id').notEmpty().withMessage('El ID de usuario es requerido'),
  check('rol').isIn(['admin', 'user']).withMessage('El rol debe ser "admin" o "user"'),
  check('title').notEmpty().withMessage('El título es requerido'),
  check('review').notEmpty().withMessage('La reseña es requerida'),
  check('author').notEmpty().withMessage('El autor es requerido'),
  check('rating')
    .optional()
    .custom((value, { req }) => {
      if (req.body.rol === 'admin' && (value === undefined || value < 1 || value > 5)) {
        throw new Error('El rating debe estar entre 1 y 5 para el rol admin');
      }
      return true;
    })
];

export const validateDeleteReview = [
  check('id').isInt().withMessage('El ID de la reseña debe ser un número entero')
];

export const validateUpdateReview = [
  check('user_id').optional().notEmpty().withMessage('El ID de usuario es requerido'),
  check('rol').optional().isIn(['admin', 'user']).withMessage('El rol debe ser "admin" o "user"'),
  check('title').optional().notEmpty().withMessage('El título es requerido'),
  check('review').optional().notEmpty().withMessage('La reseña es requerida'),
  check('author').optional().notEmpty().withMessage('El autor es requerido'),
  check('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('El rating debe estar entre 1 y 5'),
  check('num_likes')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El número de likes debe ser un número entero positivo')
];
