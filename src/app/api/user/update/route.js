import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
    }

    const user = session.user;

    const { name, image } = await req.json();

    await dbConnect();

    // Update the user's profile
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { name, image }, { new: true });
        return Response.json({ message: "Profile updated successfully!", user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}