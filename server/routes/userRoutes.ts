import { Router } from "express";
import { getUsers, getUsersById ,createUser, deleteUser, loginUser } from "../controllers/userControllers";
import { isAdmin } from "../middleware/userRole";

export const userRouter = Router();
export const loginRouter = Router();

userRouter.get('/',isAdmin, getUsers) //Solo admin puede ver usuarios
userRouter.get('/:id',isAdmin, getUsersById) //Solo admin puede ver usuarios por ID
userRouter.post('/', createUser)
userRouter.delete('/:id', isAdmin, deleteUser) //Solo admin puede borrarr usuarios
loginRouter.post('/', loginUser)

export default loginUser