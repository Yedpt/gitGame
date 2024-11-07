// routes/videoRoutes.ts
import { Router } from 'express';
import { 
    getAllVideos, 
    createVideo, 
    deleteVideo, 
    updateVideo 
} from '../controllers/videoController'; // Asegúrate de que la ruta sea correcta
import { upload } from '../middleware/videoUpload'; // Importa el middleware de subida de archivos

const router = Router();

// Obtener todos los videos
router.get('/', getAllVideos);

// Crear un nuevo video con la subida de imagen
router.post('/', upload.single('thumbnail'), createVideo); // Añade `upload.single('thumbnail')`

// Eliminar un video por ID
router.delete('/:id', deleteVideo);

// Actualizar un video por ID
router.put('/:id', updateVideo);

export { router as videoRouter };
