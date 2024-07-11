import mongoose from "mongoose";
import { Schema } from "mongoose";

import { Form } from "./Form";
import { Response } from "./Response";
import { FileRegistry } from "./FileRegistry";

import planData from "@/data/planData";

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
    // In MB
    fileStorage: {
        type: Number,
        required: true,
        default: 0,
        set: v => parseFloat(v.toFixed(2)), // Setter to limit to 2 decimal points
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
    timestamps: true,
    methods: {
        async updateUsage(type="all") {
            const planUsage = planData.find(p => p.id === this.type);
            const createdForms = await Form.find({ createdBy: this.user });
            let totalResponses;
            let totalFormViews;
            let fileRegistry;
            let totalSize;

            switch (type) {
                case "form":
                    // Get the number of forms created by the user
                    this.usage.forms = planUsage.forms - createdForms.length;
                    break;
                case "response":
                    totalResponses = 0;
                    for (const form of createdForms) {
                        const responses = await Response.find({ form: form._id });
                        totalResponses += responses.length;
                    }
                    this.usage.monthlyResponses = planUsage.monthlyResponses - totalResponses;
                    break;
                case "formView":
                    totalFormViews = 0;
                    for (const form of createdForms) {
                        totalFormViews += form.views;
                    }
                    this.usage.monthlyFormViews = planUsage.monthlyFormViews - totalFormViews;
                    break;
                case "file":
                    fileRegistry = await FileRegistry.findOne({ owner: this.user });
                    totalSize = fileRegistry ? parseFloat(fileRegistry.totalSize / 1000000) : 0;
                    this.usage.fileStorage = planUsage.fileStorage - totalSize;
                    break;
                default:
                    this.usage.forms = planUsage.forms - createdForms.length;
                    totalResponses = 0;
                    totalFormViews = 0;
                    for (const form of createdForms) {
                        const responses = await Response.find({ form: form._id });
                        totalResponses += responses.length;
                        totalFormViews += form.views;
                    }
                    this.usage.monthlyResponses = planUsage.monthlyResponses - totalResponses;
                    this.usage.monthlyFormViews = planUsage.monthlyFormViews - totalFormViews;
                    fileRegistry = await FileRegistry.findOne({ owner: this.user });
                    totalSize = fileRegistry ? parseFloat(fileRegistry.totalSize / 1000000) : 0;
                    this.usage.fileStorage = planUsage.fileStorage - totalSize;
                    break;
            }

            await this.save();
        }
    }
});

export const Plan = mongoose.models.Plan || mongoose.model('Plan', planSchema);