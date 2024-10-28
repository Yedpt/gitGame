import { Router } from "express";
import { createNew, getAllNews } from "../controllers/newsController";

export const newRouter = Router();

newRouter.get('/', getAllNews);
newRouter.post('/', createNew);
