import dbConnect from "@/lib/dbConnect";
import { Response as ResponseModel } from "@/models/Response";
import { Form } from "@/models/Form";
import { Plan } from "@/models/Plan";

export async function POST(req) {
    await dbConnect();

    // Create a new response
    try {
        const body = await req.json();
        const formId = body.form;

        // 400: Missing form id
        if (!formId) {
            return Response.json({ error: "Missing form id" }, { status: 400 });
        }

        // 404: Form doesn't exist
        const form = await Form.findById(formId);
        if (!form) {
            return Response.json({ error: "Form not found" }, { status: 404 });
        }

        // Decrement monthly form response usage
        const plan = await Plan.findOne({ user: form.createdBy });

        // 400: No plan found
        if (!plan) {
            return Response.json({ error: "No plan found" }, { status: 400 });
        }

        // 400: No more responses left
        if (plan.usage.monthlyRepsonses <= 0) {
            return Response.json({ error: "This user has no more responses left for this month. Please contact him/her for support." }, { status: 400 });
        }

        plan.usage.monthlyResponses -= 1;
        await plan.save();

        const response = new ResponseModel();
        response.form = body.form;
        response.data = body.data;
        response.lastUpdated = Date.now();
        await response.save();

        return Response.json({ 
            message: "Response submitted successfully!"
        }, { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}