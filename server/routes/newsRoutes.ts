import { Router } from "express";
import { getAllNews, createNew, deleteNew, editNew } from "../controllers/newsController";

export const newsRouter = Router();

newsRouter.get('/', getAllNews);
newsRouter.post('/', createNew);
newsRouter.delete('/:id', deleteNew)
newsRouter.put('/:id', editNew)