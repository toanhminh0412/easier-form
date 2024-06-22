import dbConnect from "@/lib/dbConnect";
import { Response as ResponseModel } from "@/models/Response";
import { Form } from "@/models/Form";

export async function POST(req) {
    await dbConnect();

    // Create a new response
    try {
        const response = new ResponseModel();
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

        response.form = body.form;
        response.data = body.data;
        response.lastUpdated = Date.now();
        await response.save();

        return Response.json({ 
            message: "Response submitted successfully!"
        }, { status: 201 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}