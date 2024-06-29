import { cookies } from "next/headers";

import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "@/data/constants";

import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";

export async function POST(req) {
    const { password } = await req.json();

    try {
        const email = cookies().get('resetPasswordEmail').value;

        await dbConnect();

        // Set the new password for the user
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await User.findOne({ email });
        user.password = hashedPassword;
        await user.save();

        cookies().delete('resetPasswordEmail');

        return Response.json({ 
            message: "Password reset successfully!",
            email
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}