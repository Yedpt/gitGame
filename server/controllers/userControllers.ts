import { Request, Response } from 'express';
import dotenv from 'dotenv';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//CRUD
//READ - GET

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        res.json({message: "error al obtener los usuarios"});
    }
}

export const getUsersById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id);
        res.json(user);
    } catch (error) {
        res.json({message: "error al obtener el usuario"});
    }
}
export const createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, birth_date, password, bio, avatar } = req.body;
      const user = await UserModel.create({
        name,
        email,
        birth_date,
        password,
        bio,
        avatar,
        create_at: new Date(),
        status: 'active',
        role: 'usuario',
      });
      res.status(201).json(user);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ message: 'Error al crear usuario' });
    }
  };


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await UserModel.destroy({
            where: {
                id
            }
        });
        res.json({message: "usuario eliminado"});
    } catch (error) {
        res.json({message: "error al eliminar el usuario"});
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, birth_date, password, bio, avatar } = req.body;
        await UserModel.update({
            name,
            email,
            birth_date,
            password,
            bio,
            avatar
        }, {
            where: {
                id
            }
        });
        res.json({message: "usuario actualizado"});
    } catch (error) {
        res.json({message: "error al actualizar el usuario"});
    }
}

// // Función para iniciar sesión de un usuario
// export const loginUser = async (req: Request, res: Response) => {
//     try {
//       const { email, password } = req.body;
      
//       // Buscar el usuario por email
//       const user = await UserModel.findOne({ where: { email } });
//       if (!user) {
//         return res.status(404).json({ message: 'Usuario no encontrado' });
//       }
  
//       // Verificar la contraseña
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ message: 'Contraseña incorrecta' });
//       }
  
//       // Actualizar el campo last_login con la fecha actual
//       user.last_login = new Date();
//       await user.save();
  
//       // Generar un token de autenticación (si usas JWT)
//       const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
//       // Devolver el token y los datos del usuario, si es necesario
//       res.status(200).json({
//         message: 'Inicio de sesión exitoso',
//         token,
//         user: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           last_login: user.last_login,
//           // puedes devolver otros campos según lo necesites
//         },
//       });
//     } catch (error) {
//       console.error('Error al iniciar sesión:', error);
//       res.status(500).json({ message: 'Error al iniciar sesión' });
//     }
//   };