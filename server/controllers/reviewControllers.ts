import { Request, Response } from 'express';
import reviews from '../models/reviewModel';

// Extiende el tipo Request para incluir la propiedad `file` de Multer.
interface MulterRequest extends Request {
    file?: Express.Multer.File;
    user?: { // Define el tipo que tiene el usuario en tu app
        id: string;
        rol: string;
        // Otros campos según tu implementación de `user`
    };
}

interface UserIdRequest extends Request {
    params: {
        userId: string;
    };
}

//GET
export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const report = await reviews.findAll();
        res.json(report);
    } catch (error) {
        res.json({ message: "No se han encontrado reviews", error });
    }
};

//GET by ID
export const getReviewById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const report = await reviews.findByPk(id);
        res.json(report);
    } catch (error)
    {
        res.json({ message: "No se ha encontrado el review", error });
    }
};

// GET REVIEWS BY USER ID
export const getReviewsByUserId = async (req: UserIdRequest, res: Response) => {
    try {
        const { userId } = req.params;
        const report = await reviews.findAll({
            where: { user_id: userId },
        });
        res.json(report);
    } catch (error) {
        res.json({ message: "No se han encontrado reviews", error });
    }
};

// POST: Crear una nueva reseña
export const createReview = async (req: Request, res: Response) => {
    try {
      const { title, review, author, rating } = req.body;
  
      // Guardar la URL de la imagen si el archivo fue subido
      const imageUrl = req.file ? `/uploads/reviews/${req.file.filename}` : null;
  
      // Crear la reseña en la base de datos
      const newReview = await reviews.create({
        title,
        review,
        author,
        rating,
        image_url: imageUrl,
        published_at: new Date(),
        updated_at: new Date(),
      });
  
      res.status(201).json(newReview);
    } catch (error) {
      console.error("Error al crear la reseña:", error);
      res.status(500).json({ message: "No se ha podido crear un review", error });
    }
  };
  
//DELETE 
export const deleteReview = async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.id;
        const deletedReview = await reviews.destroy(
            {
                where: { id: reviewId }
            })
            res.status(200).json(deletedReview)

        } catch (error) {
            console.log('El review no se pudo eliminar', error);
        }
    };


//PUT
export const updateReview = async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.id;
        const { user_id, rol, title, review, published_at,  updated_at, image_url, author, num_likes, rating } = req.body;
        const updatedReview = await reviews.update(
            {
                user_id,
                rol,
                title,
                review,
                published_at,
                updated_at,
                image_url,
                author,
                num_likes,
                rating,
            },
            {
                where: { id: reviewId }
            });
        const report = await reviews.findByPk(reviewId);
        res.status(200).json(report);
    } catch (error) {
        res.json({ message: "No se ha podido actualizar el review", error });
    }
};