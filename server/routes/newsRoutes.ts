import { Router } from "express";
import { getAllNews, createNew } from "../controllers/newsController";

export const newsRouter = Router();

newsRouter.get('/', getAllNews);
newsRouter.post('/', createNew);
