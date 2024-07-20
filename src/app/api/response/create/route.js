import { Resend } from "resend";
import ResponseDefaultEmailTemplate from "@/components/emailTemplates/ResponseDefaultEmailTemplate";

import dbConnect from "@/lib/dbConnect";
import { Response as ResponseModel } from "@/models/Response";
import { Form } from "@/models/Form";
import { Plan } from "@/models/Plan";
import { User } from "@/models/User";

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

        // Send email to form creator
        const resend = new Resend(process.env.RESEND_API_KEY);
        const user = await User.findById(form.createdBy);
        const creatorEmail = user.email;

        const { data, error } = await resend.emails.send({
            from: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
            to: creatorEmail,
            subject: `New response for ${form.title} form`,
            react: ResponseDefaultEmailTemplate({ form, response }),
        });

        if (error) {
            console.log("Failed to send email to form creator");
            console.log(error);
        }

        return Response.json({ 
            message: "Response submitted successfully!"
        }, { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}