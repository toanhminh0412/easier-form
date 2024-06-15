import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { Form } from "@/models/Form";

export async function POST(req, { params }) {
    const formId = params.formId;
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
    }

    const user = session.user;

    await dbConnect();

    // Save the form
    try {
        const form = await Form.findById(formId).exec();

        // 404: Form doesn't exist
        if (!form) {
            return Response.json({ error: "Form not found" }, { status: 404 });
        }

        // 401: Unauthorized. Only the owner can save the form
        if (form.createdBy.toString() !== user._id.toString()) {
            return Response.json({ error: "Unauthorized. You are not the owner of this form." }, { status: 401 });
        }

        const body = await req.json();
    
        form.title = body.title;
        form.description = body.description;
        form.layout = body.layout;
        form.lastUpdated = Date.now();

        await form.save();

        return Response.json({ message: "Form saved successfully!" }, { status: 200 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}