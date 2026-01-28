import express from 'express';
import { createClaim, getMyClaims } from '../controllers/claimController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createClaim);
router.get('/', protect, getMyClaims);

export default router;
