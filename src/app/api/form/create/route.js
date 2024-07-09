import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { Form } from "@/models/Form";
import { Plan } from "@/models/Plan";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
    }

    const user = session.user;

    const type = req.nextUrl.searchParams.get("type");
    let layout = {lg: []};

    if (type === 'json') {
        const body = await req.json();
        layout = body.layout;

        // 400: Missing JSON file for importing JSON for form creation
        if (!layout) {
            return Response.json({ error: "Missing JSON file for importing JSON for form creation" }, { status: 400 });
        }
    }

    await dbConnect();

    // Create a new form for this user
    try {
        // Check if this user has any forms usage left
        const plan = await Plan.findOne({ user: user._id });
        if (!plan) {
            return Response.json({ error: "You need to subscribe to a plan to create forms" }, { status: 400 });
        }

        if (plan.usage.forms <= 0) {
            return Response.json({ error: "You have reached the maximum number of forms allowed for your current plan" }, { status: 400 });
        }

        const form = new Form({ createdBy: user._id, layout: layout });
        await form.save();

        // Set domain to form's id by default
        form.domain = form._id.toString();
        await form.save();

        // Decrement the number of forms left for this user
        plan.usage.forms -= 1;
        await plan.save();

        return Response.json({ 
            message: "Form created successfully!",
            formId: form._id,
        }, { status: 201 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}