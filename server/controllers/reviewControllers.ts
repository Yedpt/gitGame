import { Request, Response } from "express";
import reviews from '../models/reviewModel';

//GET
export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const report = await reviews.findAll();
        res.json(report);
    } catch (error) {
        res.json({ message: "No se han encontrado reviews", error });
    }
};

//POST
export const createReview = async (req:Request, res:Response) => {
    try{
        const {user_id, rol, title, review, published_at,  updated_at, image_url, author, num_likes, rating} = req.body;
        const report = await reviews.create({
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
        });
        res.json(report);
        }
        catch (error){
            res.json({message: "No se ha podido crear un review", error});
        }
    };