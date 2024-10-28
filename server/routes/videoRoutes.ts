// routes/videoRoutes.ts
import { Router } from 'express';
import { 
    getAllVideos, 
    createVideo, 
    deleteVideo, 
    updateVideo 
} from '../controllers/videoController'; // Asegúrate de que la ruta sea correcta

const router = Router();

// Obtener todos los videos
router.get('/', getAllVideos);

// Crear un nuevo video
router.post('/', createVideo);

// Eliminar un video por ID
router.delete('/:id', deleteVideo);

// Actualizar un video por ID
router.put('/:id', updateVideo);

export { router as videoRouter };
