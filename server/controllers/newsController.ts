import { Request, Response } from "express";
import news from "../models/newsModel";

export const getAllNews = async (req: Request, res: Response) => {
    try {
      const report = await news.findAll();
      res.json(report);
    } catch (error) {
      res.json({ message: "Ha ocurrido un error", error });
    }
  };