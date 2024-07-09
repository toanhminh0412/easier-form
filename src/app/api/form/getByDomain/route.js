import dbConnect from "@/lib/dbConnect";
import { Form } from "@/models/Form";
import { Plan } from "@/models/Plan";

export async function GET(req) {
    const domain = req.nextUrl.searchParams.get("domain");

    await dbConnect();

    try {
        // Get the form
        const form = await Form.findOne({ domain });
        if (!form) {
            return Response.json({ error: "Form not found" }, { status: 404 });
        }

        // Check form's owner monthly form views and responses usage
        const plan = await Plan.findOne({ user: form.createdBy });
        if (!plan) {
            return Response.json({ error: "Form owner doesn't register with any plan. Please let the form's owner know." }, { status: 400 });
        }

        if (plan.usage.monthlyFormViews <= 0) {
            return Response.json({ error: "Form owner has reached the limit of monthly form views. Please let the form's owner know." }, { status: 400 });
        }

        if (plan.usage.monthlyResponses <= 0) {
            return Response.json({ error: "Form owner has reached the limit of monthly responses. Please let the form's owner know." }, { status: 400 });
        }

        // Decrement form owner's monthly form views
        plan.usage.monthlyFormViews -= 1;
        await plan.save();

        return Response.json({ 
            form: form,
        }, { status: 200 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}