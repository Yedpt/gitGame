import { Router } from "express";
import { getUsers, getUsersById ,createUser, deleteUser, loginUser , updateUser } from "../controllers/userControllers";
import { authenticateToken, isAdmin } from "../middleware/userRole";
import { validateCreateUser, validateUpdateUser, validateDeleteUser } from "../utils/validations/userValidation";
import { validationHandler } from "../utils/handle/handleValidator";


export const userRouter = Router();
export const loginRouter = Router();

userRouter.get('/', authenticateToken, isAdmin, getUsers); // Solo admin puede ver todos los usuarios
userRouter.get('/:id', authenticateToken, isAdmin, getUsersById); // Solo admin puede ver usuario por ID
userRouter.post('/', validateCreateUser, validationHandler, createUser); // Crear usuario (puede ser público, si lo necesitas)
userRouter.delete('/:id', authenticateToken, isAdmin, validateDeleteUser, validationHandler , deleteUser); 
userRouter.put('/:id', authenticateToken, isAdmin, validateUpdateUser, validationHandler, updateUser);
loginRouter.post('/', loginUser)

export default loginUser