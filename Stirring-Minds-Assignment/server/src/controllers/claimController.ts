import { Response } from 'express';
import Claim from '../models/Claim';
import Deal from '../models/Deal';

// Submit a claim
export const createClaim = async (req: any, res: Response) => {
    const { dealId } = req.body;

    try {
        const deal = await Deal.findById(dealId);
        if (!deal) {
            return res.status(404).json({ success: false, error: 'Deal not found' });
        }

        // CHECK: If deal is locked, user MUST be verified
        if (deal.isLocked && !req.user.isVerified) {
            return res.status(403).json({
                success: false,
                error: 'This deal is locked. You must be a verified startup to claim it.'
            });
        }

        // CHECK: Duplicate claim
        const existingClaim = await Claim.findOne({ userId: req.user._id, dealId });
        if (existingClaim) {
            return res.status(409).json({ success: false, error: 'You have already claimed this deal.' });
        }

        const claim = await Claim.create({
            userId: req.user._id,
            dealId,
            status: 'approved', // Auto-approve for this assignment
        });

        res.status(201).json({ success: true, data: claim });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get my claims
export const getMyClaims = async (req: any, res: Response) => {
    try {
        const claims = await Claim.find({ userId: req.user._id }).populate('dealId', 'title logoUrl discountValue');
        res.json({ success: true, count: claims.length, data: claims });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
