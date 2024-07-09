import mongoose from "mongoose";
import { Schema } from "mongoose";

const fileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    // in KB
    size: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
}, {
    methods: {
        repr() {
            return `${this.name}`;
        },
    }
});

const fileRegistrySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    totalSize: {
        type: Number,
        required: true,
        default: 0,
    },
    images: {
        type: [fileSchema],
        required: true,
        default: [],
    },
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {
    methods: {
        repr() {
            return `${this.owner}`;
        },
        getOwner() {
            return this.owner;
        }
    }
});

export const File = mongoose.models.File || mongoose.model('File', fileSchema);
export const FileRegistry = mongoose.models.FileRegistry || mongoose.model('FileRegistry', fileRegistrySchema);