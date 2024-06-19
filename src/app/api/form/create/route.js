import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { Form } from "@/models/Form";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
    }

    const user = session.user;

    await dbConnect();

    // Create a new form for this user
    try {
        const form = new Form({ createdBy: user._id, layout: {lg: []} });
        await form.save();

        // Set domain to form's id by default
        form.domain = form._id.toString();
        await form.save();

        return Response.json({ 
            message: "Form created successfully!",
            formId: form._id,
        }, { status: 201 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}