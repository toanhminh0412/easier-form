import { cookies } from "next/headers";

import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "@/data/constants";
import { Resend } from "resend";

import { getServerSession } from "next-auth";
import authOptions from "../../../[...nextauth]/options";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    // User must login to verify email
    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
    }

    const sessionUser = session.user;

    try {
        // Generate a random 6 digits code
        const code = Math.floor(100000 + Math.random() * 900000);

        // Send the code to user's email
        const email = sessionUser.email;
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
            to: email,
            subject: 'Verify your email address',
            html: `
            Hi ${sessionUser.name ? sessionUser.name : "there"},
            <br><br>
            Here is your verification code: <b>${code}</b>. Please enter this code to verify your email address. Do not share this code with anyone.
            <br><br>
            If you did not request this code, please ignore this email.
            <br><br>
            Thank you,<br>
            The EasierForm Team`,
        });

        if (error) {
            console.log(error);
            return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
        }
        
        // Save this code encrypted in the cookie
        const hashedCode = await bcrypt.hash(code.toString(), SALT_ROUNDS);
        cookies().set('oneTimeCode', hashedCode, { maxAge: 60 * 5, httpOnly: true });


        return Response.json({ message: "Verification code sent successfully!" }, { status: 200 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}