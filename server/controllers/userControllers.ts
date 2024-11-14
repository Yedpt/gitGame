import { Request, Response , RequestHandler} from "express";
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { status } from '../interfaces/userInterface';
import { JWT_SECRET } from '../config';

//READ - GET
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        res.json({ message: "Error al obtener los usuarios" });
    }
}

//LoginUser
export const loginUser = async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        user.last_login = new Date();
        await user.save();

        const token = jwt.sign({ userId: user.id, rol:user.rol }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                rol: user.rol,
            },
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

///GET users by ID

export const getUsersById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id);
        res.json(user);
    } catch (error) {
        res.json({ message: "Error al obtener el usuario" });
    }
}

//CREATE user- POST
export const createUser: RequestHandler = async (req, res) => {
    try {
      const { name, email, birth_date, password, bio, avatar } = req.body;
  
      const existingUser = await UserModel.findOne({ where: { email } });
      if (existingUser) {
        res.status(409).json({ message: 'El correo ya está en uso' });
        return; 
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await UserModel.create({
        name,
        email,
        birth_date,
        password: hashedPassword,
        bio,
        avatar,
        created_at: new Date(),
        status: status.active,
        rol: 'usuario',
      });
  
      const token = jwt.sign({ userId: user.id, rol: user.rol }, JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({
        message: 'Usuario creado exitosamente',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          birth_date: user.birth_date,
          bio: user.bio,
          avatar: user.avatar,
          rol: user.rol,
          created_at: user.created_at,
          status: user.status,
        },
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ message: 'Error al crear usuario' });
    }
  };

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await UserModel.destroy({
            where: { id }
        });
        res.json({ message: "Usuario eliminado" });
    } catch (error) {
        res.json({ message: "Error al eliminar el usuario" });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, birth_date, password, bio, avatar } = req.body;

        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        await UserModel.update({
            name,
            email,
            birth_date,
            password: hashedPassword,
            bio,
            avatar
        }, {
            where: { id }
        });

        res.json({ message: "Usuario actualizado" });
    } catch (error) {
        res.json({ message: "Error al actualizar el usuario" });
    }
}
