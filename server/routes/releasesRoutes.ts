import { Router } from 'express';
import { getUpcomingReleases, getReleasesByMonth } from '../controllers/releasesController';

const router = Router();

// Route para cargar los lanzamientos
router.get('/', getUpcomingReleases);

// Route para cargar los lanzamientos del mes
router.get('/:month', getReleasesByMonth);

export default router;
