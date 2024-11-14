// routes/videoRoutes.ts
import { Router } from 'express';
import { 
    getAllVideos, 
    createVideo, 
    deleteVideo, 
    updateVideo 
} from '../controllers/videoController'; 
import { upload } from '../middleware/videoUpload'; 
import { validateCreateVideo, validateDeleteVideo, validateUpdateVideo } from '../utils/validations/videoValidations'; 
import { validationHandler } from '../utils/handle/handleValidator';

const router = Router();

router.get('/', getAllVideos);

router.post('/', upload.single('thumbnail'), validateCreateVideo, validationHandler, createVideo); // Añade `upload.single('thumbnail')`

router.delete('/:id',validateDeleteVideo, validationHandler, deleteVideo);

router.put('/:id', validateUpdateVideo, validationHandler, updateVideo);

export { router as videoRouter };
