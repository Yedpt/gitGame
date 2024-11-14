import { check, param } from 'express-validator';

export const validateCreateNew = [
    check('title').notEmpty().withMessage('El titulo de la noticia es obligatorio'),
    check('news').notEmpty().withMessage('El contenido de la noticia es obligatorio'),
    
];

export const validateUpdateNew = [
    check('title').notEmpty().withMessage('El titulo de la noticia es obligatorio'),
    check('news').notEmpty().withMessage('El contenido de la noticia es obligatorio'),
];

export const validateDeleteNew = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
];
