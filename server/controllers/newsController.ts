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
export const createNew = async (req: Request, res: Response) => {
  try {
    const { user_id, title, news, published_at, updated_at, num_likes, image_url, image2_url } = req.body;
    const report = await NewsModel.create({
      user_id,
      title,
      news,
      published_at,
      updated_at,
      num_likes,
      image_url,
      image2_url,
    });
    res.json(report);
  }
  catch (error) {
    res.json({ message: "Ha ocurrido un error", error });
  }
};

//DELETE
export const deleteNew = async (req: Request, res: Response) => {
  try {
    const newId = req.params.id;
    const deletedNew = await NewsModel.destroy(
      {
        where: { id: newId }
      })
    res.status(200).json(deletedNew)

  } catch (error) {
    console.log('El meme no se pudo eliminar', error);
  }
};

//PUT
export const updateNew = async (req: Request, res: Response) => {
  try {
    const newId = req.params.id;
    const {user_id, title, news, published_at, updated_at, num_likes, image_url, image2_url} = req.body;
    const updatedNew = await NewsModel.update(
      {
        user_id,
        title,
        news,
        published_at,
        updated_at,
        num_likes,
        image_url,
        image2_url,
      },
      {
        where: { id: newId }
      });
    const report = await NewsModel.findByPk(newId);
    res.status(200).json(report);
  } catch (error) {
    res.json({ message: "Ha ocurrido un error", error });
  }
};