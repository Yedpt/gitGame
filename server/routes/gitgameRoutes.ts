//ROUTES USERS
import { Router } from "express";
import { getUsers } from "../controllers/userControllers";

export const router = Router();

router.get('/', getUsers)