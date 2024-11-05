import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

// Extiende la interfaz Request para incluir la propiedad user
interface UserRequest extends Request {
    user?: any; // Puedes definir un tipo más específico si tienes un tipo de usuario definido
}

// Middleware para autenticar el token
export const authenticateToken = (req: UserRequest, res: Response, next: NextFunction): Response<any> | void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user; // Guarda el usuario decodificado en la solicitud
        next();
    });
};

// Middleware para verificar si el usuario es administrador
export const isAdmin = (req: UserRequest, res: Response, next: NextFunction): Response<any> | void => {
    // Verifica si el usuario está definido y si tiene el rol de admin
    if (!req.user || req.user.rol !== 'admin') {
        return res.status(403).json({ message: 'No tienes permisos de administrador' });
    }
    next();
};
