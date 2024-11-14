import { Router } from "express";
import { getUsers, getUsersById ,createUser, deleteUser, loginUser , updateUser } from "../controllers/userControllers";
import { authenticateToken, isAdmin } from "../middleware/userRole";
import { validateCreateUser, validateUpdateUser, validateDeleteUser } from "../utils/validations/userValidation";
import { validationHandler } from "../utils/handle/handleValidator";


export const userRouter = Router();
export const loginRouter = Router();

userRouter.get('/', authenticateToken, isAdmin, getUsers); 
userRouter.get('/:id', authenticateToken, isAdmin, getUsersById); 
userRouter.post('/', validateCreateUser, validationHandler, createUser); 
userRouter.delete('/:id', authenticateToken, isAdmin, validateDeleteUser, validationHandler , deleteUser); 
userRouter.put('/:id', authenticateToken, isAdmin, validateUpdateUser, validationHandler, updateUser);
loginRouter.post('/', loginUser)
