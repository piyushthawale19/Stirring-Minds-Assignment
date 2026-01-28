import { Request, Response } from 'express';
import Deal from '../models/Deal';

// Get all deals
// Public route, but filter data based on auth status implies we might need optional auth
// For this assignment, we'll keep the list public but maybe hide 'claimInstructions' entirely here
export const getDeals = async (req: Request, res: Response) => {
    try {
        const deals = await Deal.find({}).select('-claimInstructions'); // Always hide instructions in list view for security
        res.json({ success: true, count: deals.length, data: deals });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get single deal
// If locked, check if user is verified
export const getDeal = async (req: any, res: Response) => {
    try {
        const deal = await Deal.findOne({ slug: req.params.slug });

        if (!deal) {
            return res.status(404).json({ success: false, error: 'Deal not found' });
        }

        // Logic: If Deal is LOCKED, we need to check if the user is authorized/verified
        // However, this is a public endpoint often accessed by guests.
        // If it is locked, we simply DO NOT return the claimInstructions unless the user is logged in AND verified.

        // NOTE: In a real app, we'd check req.user via middleware. 
        // Since this might be hit purely public, we treat it as basic info only unless 'protect' middleware was used.
        // To support the "Locked" UI, we return the deal object. API consumer (Frontend) sees 'isLocked' and 
        // knows it can't show the "Claim" button without verifying.

        // We will separate the "Claiming info" into a protected "Claim" flow or just sanitizing here.
        // For simplicity: We strip claimInstructions if it is locked.
        // If the frontend needs to show instructions *after* claim, that's different.

        // Let's assume claimInstructions are ONLY visible after a successful claim or if verified.
        // We will hide it here by default if locked.

        let sanitizedDeal = deal.toObject();
        if (deal.isLocked) {
            delete sanitizedDeal.claimInstructions;
        }

        res.json({ success: true, data: sanitizedDeal });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Admin only: Create Deal (for seeding)
export const createDeal = async (req: Request, res: Response) => {
    try {
        const deal = await Deal.create(req.body);
        res.status(201).json({ success: true, data: deal });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid data' });
    }
}
