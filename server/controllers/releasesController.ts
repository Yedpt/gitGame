import { Request, Response } from 'express';
import  UpComingReleases  from '../models/releasesModels';

// Extiende el tipo Request para incluir la propiedad `file` de Multer.
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

//GET
export const getUpcomingReleases = async (req: Request, res: Response) => {
    try {
        const releases = await UpComingReleases.findAll();
        res.json(releases);
    } catch (error) {
        res.json({ message: "Lanzamiento no encontrado", error });
    }
};

//GET by month
export const getReleasesByMonth = async (req: Request, res: Response) => {
    const { month } = req.params;
    try {
        const releases = await UpComingReleases.findAll({ where: {month} });
        res.json(releases);
    } catch (error)
    {
        res.json({ message: "Lanzamiento mensual no encontrado", error });
    }
};

