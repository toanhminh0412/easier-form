import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import planData from "@/data/planData";
import { File, FileRegistry } from "@/models/FileRegistry";
import { Plan } from "@/models/Plan";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
    }

    const user = session.user;

    const file = await req.json();

    if (!file) {
        return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    await dbConnect();

    // Create a new file registry for this user if it doesn't exist
    let fileRegistry = await FileRegistry.findOne({ owner: user._id });

    if (!fileRegistry) {
        fileRegistry = new FileRegistry({ owner: user._id });
        await fileRegistry.save();
    }

    // Create a new file
    try {
        // Check if user has enough file storage usage left
        const plan = await Plan.findOne({ user: user._id });
        if (!plan) {
            return Response.json({ error: "User must be on a plan" }, { status: 400 });
        }

        if (plan.usage.fileStorage < file.size / 1000000) {
            return Response.json({ error: "Not enough file storage left. Please either upgrade your plan or choose a smaller file" }, { status: 400 });
        }

        const newFile = new File({ ...file, uploadedAt: Date.now() });

        // Update file registry
        fileRegistry.totalSize += file.size;
        fileRegistry.images.push(newFile);
        fileRegistry.lastUpdated = Date.now();
        await fileRegistry.save();

        // Decrement user's file storage usage
        const currentPlanUsage = planData.find(p => p.id === plan.type);
        plan.usage.fileStorage = currentPlanUsage.fileStorage  - fileRegistry.totalSize / 1000000;
        await plan.save();

        return Response.json({ 
            message: "File uploaded successfully!",
            images: fileRegistry.images,
            size: fileRegistry.totalSize,
        }, { status: 201 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}