import mongoose from "mongoose";
import { Schema } from "mongoose";

// Track user's current usage for the current plan
const usageSchema = new Schema({
    forms: {
        type: Number,
        required: true,
        default: 0
    },
    monthlyResponses: {
        type: Number,
        required: true,
        default: 0
    },
    monthlyFormViews: {
        type: Number,
        required: true,
        default: 0
    },
    fileStorage: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

// Track user's current plan
const planSchema = new Schema({
    // Type can only be one of the following: 'individual', 'small-business', 'enterprise'
    type: {
        type: String,
        required: true,
        enum: ['individual', 'small-business', 'enterprise']
    },
    frequency: {
        type: String,
        required: true,
        enum: ['monthly', 'annually'],
        default: 'monthly'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'canceled', 'trialing', 'past_due', 'unpaid'],
        default: 'active'
    },
    expiredDate: {
        type: Date,
        required: false
    },
    usage: {
        type: usageSchema,
        required: true
    }
}, {
    timestamps: true
});

export const Plan = mongoose.models.Plan || mongoose.model('Plan', planSchema);