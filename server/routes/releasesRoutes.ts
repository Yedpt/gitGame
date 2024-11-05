import { Router } from 'express';
import { getUpcomingReleases, getReleasesByMonth } from '../controllers/releasesController';

const router = Router();

// Route pour récupérer tous les jeux à venir
router.get('/', getUpcomingReleases);

// Route pour récupérer les jeux d’un mois spécifique
router.get('/:month', getReleasesByMonth);

export default router;
