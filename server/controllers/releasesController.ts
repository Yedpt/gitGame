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
        res.json(upcomingReleases); 
    } catch (error) {
        res.status(500).json({ message: "Lanzamiento no encontrado", error });
    }
};

export const getReleasesByMonth = async (req: Request, res: Response) => {
    const { month } = req.params;
    try {
        const releasesByMonth = await releases.findAll({ where: { month } });
        res.json(releasesByMonth); 
    } catch (error) {
        res.status(500).json({ message: "Lanzamiento mensual no encontrado", error });
    }
};

export const createRelease = async (req: Request, res: Response) => {
    const { user_id, title, release_date, rating, month } = req.body;
    const image_url = req.file ? `/uploads/launch/${req.file.filename}` : null; // Ruta donde se guarda la imagen

    try {
        const newRelease = await releases.create({
            user_id: user_id,
            title,
            release_date, 
            rating,
            image_url: image_url,
            month
        });
        res.status(201).json(newRelease);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el lanzamiento", error });
    }
};


export const getReleaseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const report = await releases.findByPk(id);
        res.json(report);
    } catch (error)
    {
        res.json({ message: "No se ha encontrado el review", error });
    }
};

export const updateRelease = async (req: Request, res: Response) => {
    try {
        const releaseId = req.params.id;
        const { user_id, title, release_date,  rating,  month } = req.body;
        const updatedRelease = await releases.update(
            {
                user_id: user_id,
                title,
                release_date,
                rating,
                month
            },
            {
                where: { id: releaseId }
            });
        const report = await releases.findByPk(releaseId);
        res.status(200).json(report);
    } catch (error) {
        res.json({ message: "No se ha podido actualizar el review", error });
    }
};

export const deleteRelease = async (req: Request, res: Response) => {
    try {
        const releaseId = req.params.id;
        const deletedRelease = await releases.destroy(
            {
                where: { id: releaseId }
            })
            res.status(200).json(deletedRelease)
        } catch (error) {
            console.log('El review no se pudo eliminar', error);
        }
    };