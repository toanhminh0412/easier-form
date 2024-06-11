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
    published: {
        type: Boolean,
        required: true,
        default: false,
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