import bcrypt from "bcrypt";

import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";

export async function POST(req) {
    const { email, password } = await req.json();

    await dbConnect();

    // Find an user with email
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
        return Response.json({ error: "Email does not exist. Please sign up!" }, { status: 400 });
    }

    // Check if the password is correct
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return Response.json({ error: "Password is incorrect" }, { status: 400 });
    }
    
    // Return all fields from user object except password
    const { password: _, ...userWithoutPassword } = user.toObject();
    return Response.json(userWithoutPassword, { status: 200 });
}