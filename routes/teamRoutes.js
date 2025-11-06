import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { createTeam, addMember, listTeamMembers } from '../controllers/teamController.js';
const router = express.Router();
router.post('/', authenticate, authorize('admin','manager'), createTeam);
router.post('/members', authenticate, authorize('admin','manager'), addMember);
router.get('/:teamId/members', authenticate, authorize('admin','manager','member'), listTeamMembers);
export default router;
