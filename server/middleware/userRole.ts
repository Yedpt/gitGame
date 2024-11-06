import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

// Extiende la interfaz Request para incluir la propiedad user
interface UserRequest extends Request {
    user?: any; // Puedes definir un tipo más específico si tienes un tipo de usuario definido
}

// Middleware para autenticar el token
export const authenticateToken = (req: UserRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token no proporcionado' });
        return; // Agrega un return explícito
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Token inválido' });
            return; // Agrega un return explícito
        }
        req.user = user; // Guarda el usuario decodificado en la solicitud
        next();
    });
};

// Middleware para verificar si el usuario es administrador
export const isAdmin = (req: UserRequest, res: Response, next: NextFunction): void => {
    // Verifica si el usuario está definido y si tiene el rol de admin
    if (!req.user || req.user.rol !== 'admin') {
        res.status(403).json({ message: 'No tienes permisos de administrador' });
        return; // Agrega un return explícito
    }
    next();
};
