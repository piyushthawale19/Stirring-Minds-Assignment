import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    fullName: string;
    email: string;
    passwordHash: string;
    startupName: string;
    isVerified: boolean;
    role: 'user' | 'admin';
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    startupName: { type: String, required: true },
    isVerified: { type: Boolean, default: false }, // Critical for locked deals
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
