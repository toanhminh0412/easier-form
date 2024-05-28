import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures the email is unique in the collection
        trim: true, // Trims whitespace from the email
        lowercase: true, // Converts the email to lowercase
        match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Validates the email format
    },
    password: {
        type: String,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    methods: {
        repr() {
            return `${this.email}`;
        }
    }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);