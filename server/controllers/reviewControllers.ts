import { Request, Response } from 'express';
import reviews from '../models/reviewModel';

// Extiende el tipo Request para incluir la propiedad `file` de Multer.
interface MulterRequest extends Request {
    file?: Express.Multer.File;
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

//POST
export const createReview = async (req: MulterRequest, res: Response) => {
    try{
        const { user_id, rol, title, review, author, num_likes, rating } = req.body;

        console.log(req.file);

        // La URL de la imagen se construye a partir del nombre del archivo cargado.
        const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/reviews/${req.file.filename}` : null;

        const report = await reviews.create({
            user_id,
            rol,
            title,
            review,
            published_at: new Date(),
            updated_at: new Date(),
            image_url: imageUrl,
            author,
            num_likes,
            rating,
        });

        res.json(report);
        } catch (error){
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