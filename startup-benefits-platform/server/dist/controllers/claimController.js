"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyClaims = exports.createClaim = void 0;
const Claim_1 = __importDefault(require("../models/Claim"));
const Deal_1 = __importDefault(require("../models/Deal"));
// Submit a claim
const createClaim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dealId } = req.body;
    try {
        const deal = yield Deal_1.default.findById(dealId);
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
        const existingClaim = yield Claim_1.default.findOne({ userId: req.user._id, dealId });
        if (existingClaim) {
            return res.status(409).json({ success: false, error: 'You have already claimed this deal.' });
        }
        const claim = yield Claim_1.default.create({
            userId: req.user._id,
            dealId,
            status: 'approved', // Auto-approve for this assignment
        });
        res.status(201).json({ success: true, data: claim });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});
exports.createClaim = createClaim;
// Get my claims
const getMyClaims = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const claims = yield Claim_1.default.find({ userId: req.user._id }).populate('dealId', 'title logoUrl discountValue');
        res.json({ success: true, count: claims.length, data: claims });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});
exports.getMyClaims = getMyClaims;
