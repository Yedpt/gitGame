import multer from 'multer';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./uploads/news/");
  },
  filename: (_req, file, cb) => {
    const fileName = file.originalname;

    const safeFileName = fileName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\.\-]/g, '').toLowerCase();
    cb(null, safeFileName);
  }
});

export const upload = multer({ storage });