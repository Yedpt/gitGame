import { Request, Response } from "express";
import NewsModel from "../models/newsModel";

//GET
export const getAllNews = async (req: Request, res: Response) => {
    try {
      const report = await NewsModel.findAll();
      res.json(report);
    } catch (error) {
      res.json({ message: "Ha ocurrido un error", error });
    }
  };

//POST
export const createNew = async (req:Request, res:Response) => {
  try{
      const {user_id, title,  news, published_at, updated_at, num_likes, image_url} = req.body;
      const report = await NewsModel.create({
        user_id,
        title,
        news,
        published_at,
        updated_at,
        num_likes,
        image_url,
      });
      res.json(report);
    }
    catch (error){
      res.json({message: "Ha ocurrido un error", error});
    }
  };