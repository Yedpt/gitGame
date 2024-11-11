// UserValidator.ts
import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const validateCreateUser = [
  check('name').notEmpty().withMessage('El nombre es requerido'),
  check('email')
    .isEmail().withMessage('Debe ser un correo electrónico válido')
    .notEmpty().withMessage('El correo es requerido'),
  check('birth_date')
    .isISO8601().withMessage('Debe ser una fecha válida en formato ISO')
    .notEmpty().withMessage('La fecha de nacimiento es requerida'),
  check('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .notEmpty().withMessage('La contraseña es requerida'),
  check('bio')
    .isLength({ max: 200 }).withMessage('La biografía no debe superar los 200 caracteres')
    .optional(),
  check('avatar')
    .isURL().withMessage('El avatar debe ser una URL válida')
    .optional(),

  // Middleware para capturar y manejar los errores de validación
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
