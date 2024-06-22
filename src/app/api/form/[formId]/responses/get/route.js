import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { Form } from "@/models/Form";
import { Response as ResponseModel } from "@/models/Response";

export async function GET(req, { params }) {
    let session;
    session = await getServerSession(authOptions);

    // 401: User must sign in to view responses
    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
    }

    const user = session.user;
    
    await dbConnect();

    // Get the form's responses
    try {
        const form = await Form.findById(params.formId);

        // 404: Form not found
        if (!form) {
            return Response.json({ error: "Form not found" }, { status: 404 });
        }

        // 401: Only owner can view responses
        if (form.createdBy.toString() !== user._id.toString()) {
            return Response.json({ error: "Unauthorized. You are not the owner of this form." }, { status: 401 });
        }

        // Get the responses
        const responses = await ResponseModel.find({ form: params.formId });
        return Response.json({ responses: responses }, { status: 200 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}
