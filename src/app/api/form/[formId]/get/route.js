import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { Form } from "@/models/Form";

export async function GET(req, { params }) {
    const privilege = req.nextUrl.searchParams.get("privilege");

    let session;

    // User must sign in to edit form
    if (privilege === "edit") {
        session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
        }
    }

    const user = session ? session.user : null;

    await dbConnect();

    // Get the form
    try {
        const form = await Form.findById(params.formId);
        if (!form) {
            return Response.json({ error: "Form not found" }, { status: 404 });
        }

        // Only owner can edit the form
        if (privilege === "edit" && form.createdBy.toString() !== user._id.toString()) {
            return Response.json({ error: "Unauthorized. You are not the owner of this form." }, { status: 401 });
        }

        return Response.json({ 
            form: form,
        }, { status: 200 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}