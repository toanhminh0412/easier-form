import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { FileRegistry } from "@/models/FileRegistry";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
    }

    const user = session.user;

    const { deleteImages } = await req.json();
    
    if (!deleteImages) {
        return Response.json({ error: "No images to delete" }, { status: 400 });
    }

    await dbConnect();

    // Get file registry for this user
    let fileRegistry = await FileRegistry.findOne({ owner: user._id });

    if (!fileRegistry) {
        fileRegistry = new FileRegistry({ owner: user._id });
        await fileRegistry.save();
    }

    // Delete images
    try {
        const images = fileRegistry.images.filter(image => !deleteImages.find(deleteImage => deleteImage.name === image.name));
        fileRegistry.images = images;
        fileRegistry.totalSize = images.reduce((acc, image) => acc + image.size, 0);
        fileRegistry.lastUpdated = Date.now();
        await fileRegistry.save();

        return Response.json({ 
            message: "Images deleted successfully!",
            images: fileRegistry.images,
            size: fileRegistry.totalSize,
        }, { status: 200 });
    } catch (error) {
        return Response.json({ error: `Oops, failed to delete images! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}