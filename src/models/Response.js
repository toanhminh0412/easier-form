import mongoose from "mongoose";
import { Schema } from "mongoose";

const responseSchema = new Schema({
    form: {
        type: Schema.Types.ObjectId,
        ref: "Form",
        required: true,
    },
    // data: list of responses to form items
    // Each response is an object with the following fields:
    // - id: String
    // - label: String
    // - type: String
    // - Value: Any
    data: {
        type: Schema.Types.Mixed,
        required: true,
    },
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {
    methods: {
        repr() {
            return `${this.form.title} response`;
        },
        getForm() {
            return this.form;
        }
    }
});

export const Response = mongoose.models.Response || mongoose.model('Response', responseSchema);