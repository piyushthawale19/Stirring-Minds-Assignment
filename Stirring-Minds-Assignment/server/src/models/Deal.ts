import mongoose, { Document, Schema } from 'mongoose';

export interface IDeal extends Document {
    title: string;
    slug: string;
    description: string;
    category: string;
    logoUrl: string;
    discountValue: string;
    isLocked: boolean;
    claimInstructions?: string; // Hidden from unverified users
}

const DealSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    logoUrl: { type: String, required: true },
    discountValue: { type: String, required: true },
    isLocked: { type: Boolean, default: false, index: true },
    claimInstructions: { type: String }
}, {
    timestamps: true
});

export default mongoose.model<IDeal>('Deal', DealSchema);
