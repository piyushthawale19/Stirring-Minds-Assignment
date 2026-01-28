import express from 'express';
import { getDeals, getDeal, createDeal } from '../controllers/dealController';

const router = express.Router();

router.get('/', getDeals);
router.get('/:slug', getDeal);
router.post('/', createDeal); // Should be protected in prod, leaving open for easy seeding

export default router;
