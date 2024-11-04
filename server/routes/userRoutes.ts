//ROUTES USERS
import { Router } from "express";
import { getUsers, getUsersById ,createUser, deleteUser, loginUser } from "../controllers/userControllers";

export const userRouter = Router();
export const loginRouter = Router();

userRouter.get('/', getUsers)
userRouter.get('/:id', getUsersById)
userRouter.post('/', createUser)
userRouter.delete('/:id', deleteUser)
loginRouter.post('/', loginUser)

export default loginUser