import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";

const stripe = require('stripe')(
    process.env.NEXT_PUBLIC_ENV === 'dev' ?
    process.env.NEXT_PUBLIC_STRIPE_TEST_SECRET_KEY :
    process.env.NEXT_PUBLIC_STRIPE_LIVE_SECRET_KEY
);

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({ error: "Unauthorized. Must log in!" }, { status: 401 });
    }

    const user = session.user;

    // 400: User must already have a Stripe customer id to access this route
    if (!user.stripeCustomerId) {
        return Response.json({ error: "User must already be a Stripe customer to access this route" }, { status: 400 });
    }

    // Create a new portal session for this customer
    const customerId = user.stripeCustomerId;
    const stripeSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.APP_URL}/manage-account?tab=subscription`
    });

    return Response.json({ 
        sessionUrl: stripeSession.url,
    }, { status: 200 });
}