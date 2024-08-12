import mongoose from "mongoose";
import { Schema } from "mongoose";

const formSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: "Untitled Form",
    },
    description: {
        type: String,
        required: false,
        default: "",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    domain: {
        type: String,
        required: false,
        default: "",
        unique: true
    },
    views: {
        type: Number,
        required: true,
        default: 0,
    },
    responsesEmails: {
        type: [String],
        required: true,
        default: []
    },
    layout: {
        type: Schema.Types.Mixed
    },
}, {
    methods: {
        repr() {
            return `${this.title}`;
        },
        getCreator() {
            return this.createdBy;
        }
    }
});

export const Form = mongoose.models.Form || mongoose.model('Form', formSchema);