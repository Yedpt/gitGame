import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token no proporcionado' });
        return; // Asegúrate de que el middleware termine aquí si falta el token
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;

        if (decoded.rol !== 'admin') {
            res.status(403).json({ message: 'No tienes permisos de administrador' });
            return; // Termina aquí si el rol no es admin
        }

        next(); // Permite el acceso si el usuario es administrador
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};