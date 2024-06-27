import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { File, FileRegistry } from "@/models/FileRegistry";

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
        const newFile = new File({ ...file, uploadedAt: Date.now() });
        // await newFile.save();

        // Update file registry
        fileRegistry.totalSize += file.size;
        fileRegistry.images.push(newFile);
        fileRegistry.lastUpdated = Date.now();
        await fileRegistry.save();

        return Response.json({ 
            message: "File uploaded successfully!",
            images: fileRegistry.images,
            size: fileRegistry.totalSize,
        }, { status: 201 });
    } catch (error) {
        return Response.json({ error: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}