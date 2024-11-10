import { Router } from "express";
import { getAllNews, createNew, deleteNew, updateNew, getNewById } from "../controllers/newsController";
import { upload } from "../middleware/newUpload";
import { authenticateToken, isAdmin } from "../middleware/userRole";

export const newRouter = Router();

newRouter.get('/', getAllNews);
newRouter.get('/:id', getNewById);
newRouter.post('/', authenticateToken, isAdmin, upload.fields([
  { name: 'image_url', maxCount: 1 },
  { name: 'image2_url', maxCount: 1 }
]), createNew);
newRouter.delete('/:id', authenticateToken, isAdmin, deleteNew)
newRouter.put('/:id', authenticateToken, isAdmin, updateNew)