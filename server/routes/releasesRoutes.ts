import { Router } from 'express';
import { getUpcomingReleases, getReleasesByMonth, createRelease } from '../controllers/releasesController';
import { upload } from '../middleware/releaseUpload';
export const releaseRouter = Router();

// Route para cargar los lanzamientos
releaseRouter.get('/', getUpcomingReleases);

releaseRouter.post('/', upload.single('image_url'), createRelease);

// Route para cargar los lanzamientos del mes
releaseRouter.get('/:month', getReleasesByMonth);

export default releaseRouter;
