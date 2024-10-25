//ROUTES USERS
import { Router } from "express";
import { getUsers } from "../controllers/userControllers";

export const userRouter = Router();

userRouter.get('/', getUsers)