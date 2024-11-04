import { Request, Response } from 'express';
import db from '../database/conectionDb.js';

// Fonction pour récupérer tous les jeux à venir
export const getUpcomingReleases = (req: Request, res: Response) => {
    db.query('SELECT * FROM upcoming_releases', (err: Error | null, results: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Fonction pour récupérer les jeux d'un mois spécifique
export const getReleasesByMonth = (req: Request, res: Response) => {
    const month = req.params.month;
    db.query('SELECT * FROM upcoming_releases WHERE month = ?', [month], (err: Error | null, results: any) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

//Usar sequelize para el modelo 
