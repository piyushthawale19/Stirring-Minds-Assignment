"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dealController_1 = require("../controllers/dealController");
const router = express_1.default.Router();
router.get('/', dealController_1.getDeals);
router.get('/:slug', dealController_1.getDeal);
router.post('/', dealController_1.createDeal); // Should be protected in prod, leaving open for easy seeding
exports.default = router;
