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

    // Create a new customer with this user's email if user is not a Stripe customer
    const email = user.email;
    if (!user.stripeCustomerId) {
        // Check if user already has a Stripe customer id in the database
        await dbConnect();
        const existingUser = await User.findById(user._id);
        if (!existingUser.stripeCustomerId) {

            const customer = await stripe.customers.create({
                email: email
            });
            user.stripeCustomerId = customer.id;
        
            // Update user with Stripe customer id in the database
            await User.findByIdAndUpdate(user._id, { stripeCustomerId: customer.id });
            console.log(`Customer created: ${customer.id}`);
        }
    }

    // Create a new checkout session
    const customerId = user.stripeCustomerId;

    // Create a checkout session
    const body = await req.json();
    const plan = body.plan;
    const frequency = body.frequency;
    let priceId = "";

    if (plan === "small-business") {
        if (frequency === "monthly") {
            priceId = process.env.NEXT_PUBLIC_ENV === 'dev' ? 
                process.env.NEXT_PUBLIC_STRIPE_SMALL_BUSINESS_PLAN_MONTHLY_TEST_PRICE_ID : 
                process.env.NEXT_PUBLIC_STRIPE_SMALL_BUSINESS_PLAN_MONTHLY_LIVE_PRICE_ID
        } else {
            priceId = process.env.NEXT_PUBLIC_ENV === 'dev' ?
                process.env.NEXT_PUBLIC_STRIPE_SMALL_BUSINESS_PLAN_ANNUALLY_TEST_PRICE_ID :
                process.env.NEXT_PUBLIC_STRIPE_SMALL_BUSINESS_PLAN_ANNUALLY_LIVE_PRICE_ID
        }
    } else {
        if (frequency === "monthly") {
            priceId = process.env.NEXT_PUBLIC_ENV === 'dev' ?
                process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PLAN_MONTHLY_TEST_PRICE_ID :
                process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PLAN_MONTHLY_LIVE_PRICE_ID;
        } else {
            priceId = process.env.NEXT_PUBLIC_ENV === 'dev' ?
                process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PLAN_ANNUALLY_TEST_PRICE_ID :
                process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PLAN_ANNUALLY_LIVE_PRICE_ID;
        }
    }

    const stripeSession = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
            {price: priceId, quantity: 1}
        ],
        mode: 'subscription',
        success_url: `${process.env.APP_URL}/manage-account?tab=subscription`,
        cancel_url: `${process.env.APP_URL}/manage-account?tab=subscription`,
    });

    return Response.json({ 
        sessionUrl: stripeSession.url,
    }, { status: 200 });
}