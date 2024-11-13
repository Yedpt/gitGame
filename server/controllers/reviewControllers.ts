import { Request, Response } from 'express';
import reviews from '../models/reviewModel';
// import { addLikeToReview } from "../middleware/reviewService";

// Extiende el tipo Request para incluir la propiedad file de Multer.
interface MulterRequest extends Request {
    file?: Express.Multer.File;
    user?: { // Define el tipo que tiene el usuario en tu app
        id: string;
        rol: string;
        // Otros campos según tu implementación de user
    };
}

interface UserIdRequest extends Request {
    params: {
        userId: string;
    };
}

//GET ALL
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

//GET ALL ADMIN REVIEWS
export const getAllAdminReviews = async (req: Request, res: Response) => {
    try {
        const report = await reviews.findAll({
            where: { rol: 'admin' },
        });
        res.json(report);
    } catch (error) {
        res.json({ message: "No se han encontrado reviews", error });
    }
};

//GET ALL USER REVIEWS
export const getAllUserReviews = async (req: Request, res: Response) => {
    try {
        const report = await reviews.findAll({
            where: { rol: 'usuario' },
        });
        res.json(report);
    } catch (error) {
        res.json({ message: "No se han encontrado reviews", error });
    }
};

// POST: Crear una nueva reseña
export const createReview = async (req: Request, res: Response) => {
    try {
        const { user_id, rol, title, review, author, rating } = req.body;

        // Verifica si el campo rating está presente solo si el rol es "admin"
        if (rol === 'admin' && (rating === undefined || rating < 1 || rating > 5)) {
            res.status(400).json({ message: 'El rating debe estar entre 1 y 5 para el rol admin' });
            return;
        }
        // Si el rol es "user", el rating no es necesario, o se puede asignar un valor por defecto
        const finalRating = rol === 'user' ? 0 : rating; // Si es usuario, el rating puede ser 0 o no enviado
        
        // Normaliza la ruta de la imagen
        const imagePath = req.file?.path ? req.file.path.replace(/\\/g, '/') : ''; 
        const imageName = imagePath.split('/').pop(); 
        const imageUrl = imageName ? `/uploads/reviews/${imageName}` : ''; 

        const newReview = await reviews.create({
            user_id: user_id,
            rol: rol,
            title,
            review,
            published_at: new Date(),
            updated_at: new Date(),
            image_url: imageUrl,
            author,
            num_likes: 0,

            rating: finalRating,
        });

        // Envía la respuesta y termina la ejecución sin retorno
        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error al crear la reseña:", error); // Agrega log detallado de error
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
                    user_id: user_id,
                    rol: rol,
                    title,
                    review,
                    published_at,
                    updated_at: new Date(),
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


// //PATCH LIKE
// // Controlador para agregar un like a una reseña
// export const addLike = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const reviewId = parseInt(req.params.id);
//       const updatedReview = await addLikeToReview(reviewId);
  
//       if (!updatedReview) {
//         res.status(404).json({ message: 'Reseña no encontrada' });
//         return;
//       }
  
//       res.status(200).json(updatedReview);
//     } catch (error) {
//       res.status(500).json({ message: 'Error al agregar un like' });
//     }
//   };

  //PUT LIKE
export const incrementLike = async (req: Request, res: Response) => {
    try {
      const newId = req.params.id;
      const updatedReview = await reviews.increment(
        { num_likes: 1 },
        {
          where: { id: newId }
        });
      const review = await reviews.findByPk(newId);
      res.status(200).json(review);
    } catch (error) {
      res.json({ message: "Ha ocurrido un error", error });
    }
  };