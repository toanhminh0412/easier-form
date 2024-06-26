import { cookies } from "next/headers";

import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import authOptions from "../../../[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
    }

    const { code } = await req.json();

    try {
    // Check if the code match the one in the cookie
    
        const hashedCode = cookies().get('oneTimeCode').value;
        const match = await bcrypt.compare(code, hashedCode);

        // 400: Code is incorrect
        if (!match) {
            return Response.json({ error: "Code is incorrect" }, { status: 400 });
        }

        // Update user's email verification status
        await dbConnect();
        const user = await User.findById(session.user._id);
        user.isEmailVerified = true;
        await user.save();
    
        return Response.json({ message: "Email verified successfully!" }, { status: 200 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}