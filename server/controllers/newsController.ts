import { Request, Response } from "express";
import NewsModel from "../models/newsModel";

interface File {
  path: string;
  originalname: string;
}
interface Files {
  image_url?: File[]; 
  image2_url?: File[]; 
}

//GET
export const getAllNews = async (req: Request, res: Response) => {
  try {
    const report = await NewsModel.findAll();
    res.json(report);
  } catch (error) 
  {
    res.json({ message: "Ha ocurrido un error", error });
  }
};

//GET by ID
export const getNewById = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const report = await NewsModel.findByPk(id);
      res.json(report);
  } catch (error)
  {
      res.json({ message: "No se ha encontrado el review", error });
  }
};

//POST
export const createNew = async (req: Request, res: Response) => {
  console.log('Cuerpo de la solicitud:', req.body);   // Verifica los datos
  console.log('Archivos recibidos:', req.files); 

  try {
    console.log(res)
    const { user_id, title, news, published_at, updated_at, num_likes, image_url, image2_url } = req.body;

    const files = req.files as Files | undefined;
    let image1 = "";
    if (files?.image_url && Array.isArray(files.image_url)) {
      image1 = "/" + files.image_url[0].path.replace(/\\/g, '/');
      console.log(image1);
    }
    let image2 = "";
    if (files?.image2_url && Array.isArray(files.image2_url)) {
      image2 = "/" + files.image2_url[0].path.replace(/\\/g, '/');
      console.log(image2);
    }
    const report = await NewsModel.create({
      user_id,
      title,
      news,
      published_at: new Date(),
      updated_at: new Date(),
      num_likes,
      image_url: image1,
      image2_url: image2,
    });
    res.json({ report });
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
    const { user_id, title, news, published_at, updated_at, num_likes, image_url, image2_url } = req.body;
    console.log(req.body)
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

// export const updateNew = async (req: Request, res: Response) => {
//   try {
//     const newId = req.params.id;
//     const { user_id, title, news, published_at, updated_at, num_likes, image_url, image2_url } = req.body;
//     const report = await NewsModel.findByPk(newId);
//     await report?.update({
//         user_id,
//         title,
//         news,
//         published_at,
//         updated_at,
//         num_likes,
//         image_url,
//         image2_url,
//     });
//     res.json(report);
//   } catch (error) {
//     console.log('El meme no se pudo actualizar', error);
//   }
// }