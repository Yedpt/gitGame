import multer from 'multer';
import path from 'path';

const UPLOADS_PATH = path.resolve('./uploads/video/');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_PATH); 
  },
  filename: (req, file, cb) => {
    const safeFileName = file.originalname.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\.\-]/g, '').toLowerCase();
    cb(null, safeFileName); 
  }
});

export const upload = multer({ storage });
