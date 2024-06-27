import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { FileRegistry } from "@/models/FileRegistry";

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
    }

    const user = session.user;

    try {
        await dbConnect();

        // Get file registry for this user
        let fileRegistry = await FileRegistry.findOne({ owner: user._id });

        if (!fileRegistry) {
            fileRegistry = new FileRegistry({ owner: user._id });
            await fileRegistry.save();
        }

        return Response.json({ 
            userId: user._id,
            images: fileRegistry.images,
            size: fileRegistry.totalSize,
        });
    } catch (error) {
        return Response.json({ error: `Oops, failed to get images! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}` }, { status: 500 });
    }
}