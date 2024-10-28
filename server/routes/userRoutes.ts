//ROUTES USERS
import { Router } from "express";
import { getUsers, getUsersById ,createUser, deleteUser } from "../controllers/userControllers";

export const userRouter = Router();

userRouter.get('/', getUsers)
userRouter.get('/:id', getUsersById)
userRouter.post('/', createUser)
userRouter.delete('/:id', deleteUser)