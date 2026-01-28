import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User';
import connectDB from './config/db';

dotenv.config();

const email = process.argv[2];
const password = 'password123'; // Default password

if (!email) {
    console.log('Please provide an email address. Usage: npm run create-user user@example.com');
    process.exit(1);
}

const createUser = async () => {
    try {
        await connectDB();

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log(`User ${email} already exists.`);
            process.exit(0);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            fullName: 'Test User',
            email: email,
            passwordHash: passwordHash,
            startupName: 'My Awesome Startup',
            isVerified: false,
            role: 'user'
        });

        console.log(`SUCCESS: Created user: ${user.email}`);
        console.log(`Password: ${password}`);
        console.log('You can now log in with these credentials or run "npm run verify ' + email + '"');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createUser();
