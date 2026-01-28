import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Deal from './models/Deal';
import connectDB from './config/db';

dotenv.config();

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
        logoUrl: '/logos/hubspot.svg',
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

const seedData = async () => {
    try {
        await connectDB();

        await Deal.deleteMany();
        console.log('Deals cleared...');

        await Deal.insertMany(deals);
        console.log('Deals Imported!');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
