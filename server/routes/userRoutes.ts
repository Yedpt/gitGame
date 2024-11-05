import { Router } from "express";
import { getUsers, getUsersById ,createUser, deleteUser, loginUser } from "../controllers/userControllers";


export const userRouter = Router();
export const loginRouter = Router();

userRouter.get('/', getUsers) //Solo admin puede ver usuarios, cambiar al final del desarrrollo
userRouter.get('/:id', getUsersById) //Solo admin puede ver usuarios por ID
userRouter.post('/', createUser)
userRouter.delete('/:id' , deleteUser) //Solo admin puede borrarr usuarios
loginRouter.post('/', loginUser)

export default loginUser