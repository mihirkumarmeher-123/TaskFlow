import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { addComment } from '../controllers/commentController.js';
const router = express.Router();
router.post('/', authenticate, addComment);
export default router;
