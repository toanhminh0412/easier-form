import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";

/**
 * Search for a user by their email
 * @param {Request} req
 * @returns {Response}
 */
export async function GET(req) {
    const emailQuery = req.nextUrl.searchParams.get("emailQuery");

    if (!emailQuery) {
        return Response.json({ error: "Please type something to find a matched email" }, { status: 400 });
    }

    await dbConnect();

    try {
        const matchedUsers = await User.find({ email: { $regex: emailQuery, $options: "i" } });

        return Response.json({ users: matchedUsers }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}