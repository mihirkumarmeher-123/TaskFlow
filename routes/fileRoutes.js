import express from 'express';
import multer from 'multer';
import path from 'path';
import { authenticate } from '../middleware/authMiddleware.js';
import { uploadFile, downloadFile } from '../controllers/fileController.js';
const router = express.Router();
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'))
});
const upload = multer({ storage });
router.post('/upload', authenticate, upload.single('file'), uploadFile);
router.get('/download/:id', authenticate, downloadFile);
export default router;
