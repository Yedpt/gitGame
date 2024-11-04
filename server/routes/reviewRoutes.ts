import express from 'express';
import multer from 'multer';
import { createReview, updateReview, deleteReview, getAllReviews, getReviewById } from '../controllers/reviewControllers';

const router = express.Router();

export const uploadRouter = express.Router();

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/reviews/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

uploadRouter.post('/', upload.single('image_url'), createReview);

// Ruta POST para crear un review, usando el middleware de carga de archivos

router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.delete('/:id', deleteReview);
router.put('/:id', updateReview)

export default router;