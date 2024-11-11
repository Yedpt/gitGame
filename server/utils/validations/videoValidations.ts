// utils/validations/videoValidation.ts
import { check } from 'express-validator';

export const validateCreateVideo = [
  check('user_id').notEmpty().withMessage('El ID de usuario es requerido').isInt().withMessage('El ID de usuario debe ser un número entero'),
  check('title').notEmpty().withMessage('El título es requerido').isLength({ max: 100 }).withMessage('El título no debe exceder 100 caracteres'),
  check('video_url').notEmpty().withMessage('La URL del video es requerida').isURL().withMessage('Debe ser una URL válida'),
  check('published_at').optional().isISO8601().withMessage('La fecha de publicación debe ser en formato ISO8601'),
  check('thumbnail').optional().isString().withMessage('El thumbnail debe ser una cadena de texto')
];

export const validateDeleteVideo = [
  check('id').isInt().withMessage('El ID del video debe ser un número entero')
];

export const validateUpdateVideo = [
  check('user_id').optional().isInt().withMessage('El ID de usuario debe ser un número entero'),
  check('title').optional().isLength({ max: 100 }).withMessage('El título no debe exceder 100 caracteres'),
  check('video_url').optional().isURL().withMessage('La URL del video debe ser válida'),
  check('published_at').optional().isISO8601().withMessage('La fecha de publicación debe ser en formato ISO8601')
];
