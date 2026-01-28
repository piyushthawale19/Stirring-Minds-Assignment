import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import connectDB from './config/db';

dotenv.config();

const email = process.argv[2];

if (!email) {
    console.log('Please provide an email address. Usage: npm run verify val@example.com');
    process.exit(1);
}

const verifyUser = async () => {
    try {
        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User with email ${email} not found.`);
            process.exit(1);
        }

        user.isVerified = true;
        await user.save();

        console.log(`SUCCESS: User ${user.fullName} (${user.email}) has been VERIFIED.`);
        console.log('They can now access locked deals.');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verifyUser();
