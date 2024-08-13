import mongoose from "mongoose";
import { Schema } from "mongoose";

const emailSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    methods: {
        repr() {
            return `${this.email}`;
        }
    }
});

export const Email = mongoose.models.Email || mongoose.model('Email', emailSchema);