//ROUTES USERS
import { Router } from "express";
import { getUsers, getUsersById ,createUser, deleteUser, loginUser } from "../controllers/userControllers";

export const userRouter = Router();

userRouter.get('/', getUsers)
userRouter.get('/:id', getUsersById)
userRouter.post('/', createUser)
userRouter.delete('/:id', deleteUser)
userRouter.post('/login', loginUser)