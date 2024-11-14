import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

// Define el tipo para el usuario decodificado
interface DecodedUser {
    id: string;
    rol: string;
}


interface UserRequest extends Request {
    user?: DecodedUser;
}

export const authenticateToken = (req: UserRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token no proporcionado' });
        return; 
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err || !decoded) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = decoded as DecodedUser; 
        next();
    });
}

export const isAdmin = (req: UserRequest, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.rol !== 'admin') {
        res.status(403).json({ message: 'No tienes permisos de administrador' });
        return; 
    }
    next();
};
