// controllers/videoController.ts
import { Request, Response } from 'express';
import Video from '../models/videoModel'; 

// GET: Obtener todos los videos
export const getAllVideos = async (req: Request, res: Response) => {
    try {
        const videos = await Video.findAll();
        res.json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error', error });
    }
};

// POST: Crear un nuevo video
export const createVideo = async (req: Request, res: Response) => {
    const { user_id, title, video_url, published_at } = req.body;
    const thumbnail = req.file ? req.file.filename : null; // Solo guarda el nombre del archivo

    try {
        const newVideo = await Video.create({ user_id, title, video_url, published_at, thumbnail });
        res.status(201).json(newVideo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error', error });
    }
};




// DELETE: Eliminar un video por ID
export const deleteVideo = async (req: Request, res: Response) => {
    const videoId = Number(req.params.id); 
    try {
        const deletedCount = await Video.destroy({
            where: { id: videoId }
        });
        if (deletedCount) {
            res.status(200).json({ message: "Video eliminado" });
        } else {
            res.status(404).json({ message: "Video no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el video" });
    }
};

// Actualizar un video por ID
export const updateVideo = async (req: Request, res: Response) => {
    const videoId = Number(req.params.id); 
    const { user_id, title, video_url, published_at } = req.body;
    try {
        const [updatedCount] = await Video.update(
            { user_id, title, video_url, published_at },
            { where: { id: videoId } }
        );

        if (updatedCount) {
            const updatedVideo = await Video.findByPk(videoId);
            res.status(200).json(updatedVideo);
        } else {
            res.status(404).json({ message: "Video no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el video" });
    }
};
