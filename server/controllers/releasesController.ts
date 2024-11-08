import { Request, Response } from 'express';
import releases from '../models/releasesModels';

interface MulterRequest extends Request {
    file?: Express.Multer.File;
    user?: {
        id: string;
        rol: string;
    };
}

interface UserIdRequest extends Request {
    params: {
        userId: string;
    };
}

export const getUpcomingReleases = async (req: Request, res: Response) => {
    try {
        const upcomingReleases = await releases.findAll();
        res.json(upcomingReleases); // Utilisez upcomingReleases ici
    } catch (error) {
        res.status(500).json({ message: "Lanzamiento no encontrado", error });
    }
};

export const getReleasesByMonth = async (req: Request, res: Response) => {
    const { month } = req.params;
    try {
        const releasesByMonth = await releases.findAll({ where: { month } });
        res.json(releasesByMonth); // Corrigez ici aussi
    } catch (error) {
        res.status(500).json({ message: "Lanzamiento mensual no encontrado", error });
    }
};

export const createRelease = async (req: Request, res: Response) => {
    const { user_id, title, release_date, rating, image_url, month } = req.body; // Corrigé relese_date
    try {
        const newRelease = await releases.create({
            user_id,
            title,
            release_date, // Corrigé ici
            rating,
            image_url,
            month
        });
        res.status(201).json(newRelease);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el lanzamiento", error });
    }
};

export const getReleaseById = async (req: UserIdRequest, res: Response) => { // Utilisez UserIdRequest ici
    const { userId } = req.params;
    try {
        const release = await releases.findByPk(userId);
        if (!release) {
            return res.status(404).json({ message: "Lanzamiento no encontrado" });
        }
        res.json(release);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el lanzamiento", error });
    }
};

export const updateRelease = async (req: UserIdRequest, res: Response) => { // Utilisez UserIdRequest ici
    const { userId } = req.params;
    try {
        const [updated] = await releases.update(req.body, {
            where: { userId }
        });
        if (updated === 0) {
            return res.status(404).json({ message: "Lanzamiento no encontrado" });
        }
        const updatedRelease = await releases.findByPk(userId);
        res.json(updatedRelease);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el lanzamiento", error });
    }
};

export const deleteRelease = async (req: UserIdRequest, res: Response) => { // Utilisez UserIdRequest ici
    const { userId } = req.params;
    try {
        const deleted = await releases.destroy({
            where: { userId }
        });
        if (deleted === 0) {
            return res.status(404).json({ message: "Lanzamiento no encontrado" });
        }
        res.json({ message: "Lanzamiento eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el lanzamiento", error });
    }
};
