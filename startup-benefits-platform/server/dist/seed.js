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
const dotenv_1 = __importDefault(require("dotenv"));
const Deal_1 = __importDefault(require("./models/Deal"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const deals = [
    {
        title: 'AWS Activate',
        slug: 'aws-activate',
        description: 'Get $5,000 in AWS Cloud Credits for 2 years. Valid for bootstrapped startups.',
        category: 'Cloud',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
        discountValue: '$5,000 Credits',
        isLocked: true,
        claimInstructions: '1. Go to aws.amazon.com/activate\n2. Use Organization ID: 12345-STARTUP\n3. Upload your verification letter found in your dashboard.'
    },
    {
        title: 'Notion Plus',
        slug: 'notion-plus',
        description: '6 months free of Notion Plus with AI. Organize your entire startup in one workspace.',
        category: 'Productivity',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
        discountValue: '6 Months Free',
        isLocked: false,
        claimInstructions: 'Use code STARTUP2024 at checkout on notion.so'
    },
    {
        title: 'HubSpot for Startups',
        slug: 'hubspot-startups',
        description: 'Get up to 90% off HubSpot professional software. CRM, Marketing, and Sales hub included.',
        category: 'Marketing',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/HubSpot_Logo.svg/2560px-HubSpot_Logo.svg.png',
        discountValue: '90% Off',
        isLocked: true,
        claimInstructions: 'Apply via the exclusive partner link: hubspot.com/startups/partner-123. Your application will be auto-approved.'
    },
    {
        title: 'Stripe Atlas',
        slug: 'stripe-atlas',
        description: 'Incorporate your company in Delaware for $250 off. Setup bank account and tax ID instantly.',
        category: 'Legal',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
        discountValue: '$250 Off',
        isLocked: false,
        claimInstructions: 'Click here to apply: stripe.com/atlas/invite/partner'
    }
];
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        yield Deal_1.default.deleteMany();
        console.log('Deals cleared...');
        yield Deal_1.default.insertMany(deals);
        console.log('Deals Imported!');
        process.exit();
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
seedData();
