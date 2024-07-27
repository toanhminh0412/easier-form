import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { Form } from "@/models/Form";
import { User } from "@/models/User";

// Transfer form to another user. Make that user the owner of the form.
export async function POST(req, { params }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
    }

    const user = session.user;

    await dbConnect();

    const { newOwnerEmail } = await req.json();

    const formId = params.formId;

    // Find the form
    const form = await Form.findById(formId).exec();

    // 404: Form doesn't exist
    if (!form) {
        return Response.json({ error: "Form not found" }, { status: 404 });
    }

    // 401: Unauthorized. Only the owner can transfer the form
    if (form.createdBy.toString() !== user._id.toString()) {
        return Response.json({ error: "Unauthorized. You are not the owner of this form." }, { status: 401 });
    }

    // Find the new owner
    const newOwner = await User.findOne({ email: newOwnerEmail }).exec();

    // 404: New owner doesn't exist
    if (!newOwner) {
        return Response.json({ error: "New owner not found" }, { status: 404 });
    }

    // Transfer the form
    form.createdBy = newOwner._id;
    await form.save();

    return Response.json({ message: "Form transferred successfully!" }, { status: 200 });
}