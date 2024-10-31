import { Router } from "express";
import { getAllNews, createNew, deleteNew, updateNew } from "../controllers/newsController";

export const newRouter = Router();

newRouter.get('/', getAllNews);
newRouter.post('/', createNew);
newRouter.delete('/:id', deleteNew)
newRouter.put('/:id', updateNew)