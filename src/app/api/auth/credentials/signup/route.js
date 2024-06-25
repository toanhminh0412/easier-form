import bcrypt from "bcrypt";

import { SALT_ROUNDS } from "@/data/constants";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";

export async function POST(req) {
    const { email, password, confirmPassword } = await req.json();

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
        return Response.json({ error: "Passwords do not match" }, { status: 400 });
    }

    await dbConnect();

    // Check if an user with the same email exists
    const existingUser = await User.findOne({ email: email }).exec();
    if (existingUser) {
        return Response.json({ error: "User with the email already exists. Please sign in if you have an account already." }, { status: 400 });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ email: email, password: hashedPassword, isEmailVerified: false });
    await user.save();
    return Response.json({ message: "Sign up successfully!" }, { status: 201 });
}