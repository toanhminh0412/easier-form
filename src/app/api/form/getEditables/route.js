import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { Form } from "@/models/Form";
import { User } from "@/models/User";

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
    }

    const user = session.user;

    await dbConnect();

    // Get all forms that this user can edit
    // NOTE: For now, users can only edit forms that they create
    try {
        const forms = await Form.find({ createdBy: user._id }).sort({ lastUpdated: -1 }).exec();
        
        // Replace createdBy field with user's email to display on the frontend
        for (let i = 0; i < forms.length; i++) {
            const form = forms[i];
            const creator = await User.findById(form.createdBy).exec();
            forms[i] = {
                ...form.toObject(),
                createdBy: creator.email,
            }
        }

        return Response.json({ forms: forms }, { status: 200 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}