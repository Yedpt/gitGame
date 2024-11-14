import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/reviews/");  
  },
  filename: (req, file, cb) => {
    
    const fileName = file.originalname;
    
    const safeFileName = fileName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\.\-]/g, '').toLowerCase();
    
    cb(null, safeFileName); 
  }
});

export const upload = multer({ storage });
