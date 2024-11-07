import { Router } from "express";
import { getAllNews, createNew, deleteNew, updateNew } from "../controllers/newsController";
import { upload } from "../middleware/newUpload";

export const newRouter = Router();

newRouter.get('/', getAllNews);
newRouter.post('/', upload.fields([
  { name: 'image_url', maxCount: 1 },
  { name: 'image2_url', maxCount: 1 }
]), createNew);
newRouter.delete('/:id', deleteNew)
newRouter.put('/:id', updateNew)