import { Router } from "express";
import { createNew, getAllNews } from "../controllers/newsController";

export const router = Router();

router.get('/', getAllNews);
router.post('/', createNew);
