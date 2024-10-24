import { Request, Response } from 'express';
import dotenv from 'dotenv';
import UserModel from '../models/userModel';

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
