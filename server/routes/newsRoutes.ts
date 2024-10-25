import { Router } from "express";
import { getAllNews, createNew } from "../controllers/newsController";

export const router = Router();

router.get('/', getAllNews);
router.post('/', createNew);
