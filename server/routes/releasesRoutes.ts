import { Router } from 'express';

import { getUpcomingReleases, getReleasesByMonth, createRelease, getReleaseById, updateRelease, deleteRelease } from '../controllers/releasesController';
import { upload } from '../middleware/releaseUpload';
export const releaseRouter = Router();


releaseRouter.get('/', getUpcomingReleases);
releaseRouter.get('/:id', getReleaseById);
releaseRouter.put('/:id', updateRelease);
releaseRouter.delete('/:id', deleteRelease);

releaseRouter.post('/', upload.single('image_url'), createRelease);

releaseRouter.get('/:month', getReleasesByMonth);



