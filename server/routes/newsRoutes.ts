import { Router } from "express";
import { getAllNews } from "../controllers/newsController";

export const router = Router();

router.get('/', getAllNews);