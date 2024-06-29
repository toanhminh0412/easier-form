import { cookies } from "next/headers";

import bcrypt from "bcrypt";

export async function POST(req) {
    const { code } = await req.json();

    try {
        // Check if the code match the one in the cookie
        const hashedCode = cookies().get('oneTimeCode').value;
        const match = await bcrypt.compare(code, hashedCode);

        // 400: Code is incorrect
        if (!match) {
            return Response.json({ error: "Code is incorrect" }, { status: 400 });
        }

        cookies().delete('oneTimeCode');

        // Update user's email verification status
        return Response.json({ message: "Email verified successfully!" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}