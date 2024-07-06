import dbConnect from "@/lib/dbConnect";
import { Plan } from "@/models/Plan";
import planData from "@/data/planData";

export async function POST(req) {
    const event = await req.json();

    // Handle the event
    switch (event.type) {
        case 'customer.subscription.created':
            console.log(event);
            const subscription = event.data.object;
            // Update user's plan in the database
            const { userId, plan, frequency } = subscription.metadata;
            await dbConnect();
            const userPlan = await Plan.findOne({ user: userId });
            userPlan.type = plan;
            userPlan.frequency = frequency;
            userPlan.status = "active";

            if (frequency === "monthly") {
                userPlan.expiredDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
            } else {
                userPlan.expiredDate = new Date(new Date().setMonth(new Date().getMonth() + 12));
            }

            // Update usage data based on the plan
            const planUsage = planData.find(p => p.id === plan);
            const newUsage = {
                forms: planUsage.forms,
                monthlyResponses: planUsage.monthlyResponses,
                monthlyFormViews: planUsage.monthlyFormViews,
                fileStorage: planUsage.fileStorage
            }
            userPlan.usage = newUsage;
            console.log(userPlan);
            await userPlan.save();


            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
            return Response.json({ received: false, message: `Unhandled event type ${event.type}` }, { status: 400 });
    }

    return Response.json({ received: true }, { status: 200 });
}