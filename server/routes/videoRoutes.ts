// routes/videoRoutes.ts
import { Router } from 'express';
import { 
    getAllVideos, 
    createVideo, 
    deleteVideo, 
    updateVideo 
} from '../controllers/videoController'; // Asegúrate de que la ruta sea correcta
import { upload } from '../middleware/videoUpload'; // Importa el middleware de subida de archivos
import { validateCreateVideo, validateDeleteVideo, validateUpdateVideo } from '../utils/validations/videoValidations'; 
import { validationHandler } from '../utils/handle/handleValidator';

const router = Router();

// Obtener todos los videos
router.get('/', getAllVideos);

// Crear un nuevo video con la subida de imagen
router.post('/', upload.single('thumbnail'), validateCreateVideo, validationHandler, createVideo); // Añade `upload.single('thumbnail')`

// Eliminar un video por ID
router.delete('/:id',validateDeleteVideo, validationHandler, deleteVideo);

// Actualizar un video por ID
router.put('/:id', validateUpdateVideo, validationHandler, updateVideo);

export { router as videoRouter };
