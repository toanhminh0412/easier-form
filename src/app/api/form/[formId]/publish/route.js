import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

import planData from "@/data/planData";
import dbConnect from "@/lib/dbConnect";
import { Form } from "@/models/Form";
import { Plan } from "@/models/Plan";

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
        const form = await Form.findById(formId);

        // 404: Form doesn't exist
        if (!form) {
            return Response.json({ error: "Form not found" }, { status: 404 });
        }

        // 401: Unauthorized. Only the owner can save the form
        if (form.createdBy.toString() !== user._id.toString()) {
            return Response.json({ error: "Unauthorized. You are not the owner of this form." }, { status: 401 });
        }

        // 400: Bad request. Domain is required
        const body = await req.json();
        const domain = body.domain;
        if (!domain) {
            return Response.json({ error: "Domain is required" }, { status: 400 });
        }

        // 400: Bad request. Domain must be alphanumeric
        if (!/^[a-zA-Z0-9-]*$/.test(domain)) {
            return Response.json({ error: "Domain must be alphanumeric" }, { status: 400 });
        }

        // 400: Bad request. Domain must be between 3 and 30 characters
        if (domain.length < 3 || domain.length > 30) {
            return Response.json({ error: "Domain must be between 3 and 30 characters" }, { status: 400 });
        }

        // Check if user's current plan allows custom domains
        const plan = await Plan.findOne({ user: user._id });
        const currentPlan = planData.find(p => p.id === plan.type);
        if (!currentPlan.customUrl && domain !== form._id.toString()) {
            return Response.json({ error: "Upgrade to a plan that supports custom URLs to use this feature" }, { status: 400 });
        }

        // 400: Bad request. Domain must be unique
        const existingForm = await Form.findOne({ domain: domain });
        if (existingForm && existingForm._id.toString() !== formId) {
            return Response.json({ error: "Domain must be unique" }, { status: 400 });
        }

        Form.updateOne({ _id: formId }, { domain: domain, lastUpdated: Date.now() });
        form.domain = domain;
        form.lastUpdated = Date.now();

        await form.save();

        return Response.json({ message: "Form saved successfully!" }, { status: 200 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}