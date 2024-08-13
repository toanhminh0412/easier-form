import dbConnect from "@/lib/dbConnect";
import { Email } from "@/models/Email";

export async function POST(req) {
    const { email } = await req.json();

    await dbConnect();

    try {
        // Check if email already exists
        const existingEmail = await Email.findOne({ email: email });
        if (existingEmail) {
            return Response.json({ message: "Email already exists. No need to add!" }, { status: 200 });
        }

        const newEmail = new Email({ email, createdAt: new Date() });
        await newEmail.save();

        return Response.json({ message: "Email added successfully!" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}