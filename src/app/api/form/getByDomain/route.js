import dbConnect from "@/lib/dbConnect";
import { Form } from "@/models/Form";

export async function GET(req) {
    const domain = req.nextUrl.searchParams.get("domain");

    await dbConnect();

    // Get the form
    try {
        const form = await Form.findOne({ domain });
        if (!form) {
            return Response.json({ error: "Form not found" }, { status: 404 });
        }

        return Response.json({ 
            form: form,
        }, { status: 200 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}