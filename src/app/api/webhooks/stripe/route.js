import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { Plan } from "@/models/Plan";
import planData from "@/data/planData";

export async function POST(req) {
    const event = await req.json();
    let subscription;
    let customerId;
    // let plan;
    // let frequency;
    let user;
    let userPlan;
    let planUsage;
    let newUsage;

    // Handle the event
    // Doc: https://docs.stripe.com/api/events/types
    switch (event.type) {
        // Occurs whenever a customer is signed up for a new plan.
        case 'customer.subscription.created':
            console.log(event);
            subscription = event.data.object;
            console.log(subscription.plan)
            // Update user's plan in the database
            customerId = subscription.customer;
            const { plan, frequency } = subscription.plan.metadata;
            await dbConnect();
            user = await User.findOne({ stripeCustomerId: customerId });
            userPlan = await Plan.findOne({ user: user._id });
            userPlan.type = plan;
            userPlan.frequency = frequency;
            userPlan.status = subscription.status;
            userPlan.expiredDate = new Date(subscription.current_period_end * 1000);

            // Update usage data based on the plan
            planUsage = planData.find(p => p.id === plan);
            newUsage = {
                forms: planUsage.forms,
                monthlyResponses: plan === "individual" || frequency === "monthly" ? planUsage.monthlyResponses : planUsage.monthlyResponses * 12,
                monthlyFormViews: plan === "individual" || frequency === "monthly" ? planUsage.monthlyFormViews : planUsage.monthlyFormViews * 12,
                fileStorage: planUsage.fileStorage
            }
            userPlan.usage = newUsage;
            console.log(userPlan);
            await userPlan.save();


            break;
        // Occurs whenever a subscription changes (e.g., switching from one plan to another, or changing the status from trial to active).
        case 'customer.subscription.updated':
            console.log(event);
            subscription = event.data.object;
            console.log(subscription.plan);
            // Update user's plan in the database
            customerId = subscription.customer;
            const { plan: updatedPlan, frequency: updatedFrequency } = subscription.plan.metadata;
            await dbConnect();
            user = await User.findOne({ stripeCustomerId: customerId });
            userPlan = await Plan.findOne({ user: user._id });
            userPlan.type = updatedPlan;
            userPlan.frequency = updatedFrequency;
            userPlan.status = subscription.status;
            userPlan.expiredDate = new Date(subscription.current_period_end * 1000);

            // Update usage data based on the plan
            planUsage = planData.find(p => p.id === updatedPlan);
            newUsage = {
                forms: planUsage.forms,
                monthlyResponses: updatedPlan === "individual" || updatedFrequency === "monthly" ? planUsage.monthlyResponses : planUsage.monthlyResponses * 12,
                monthlyFormViews: updatedPlan === "individual" || updatedFrequency === "monthly" ? planUsage.monthlyFormViews : planUsage.monthlyFormViews * 12,
                fileStorage: planUsage.fileStorage
            }
            userPlan.usage = newUsage;
            console.log(userPlan);
            await userPlan.save();

            break;

        // Occurs whenever a customer’s subscription ends.
        case 'customer.subscription.deleted':
            console.log(event);
            // Simply set user's plan to 'individual' in the database
            subscription = event.data.object;
            customerId = subscription.customer;
            await dbConnect();
            user = await User.findOne({ stripeCustomerId: customerId });
            userPlan = await Plan.findOne({ user: user._id });
            userPlan.type = "individual";
            userPlan.frequency = "monthly";
            userPlan.status = "active";
            userPlan.expiredDate = null;

            // Update usage data based on the plan
            planUsage = planData.find(p => p.id === "individual");
            newUsage = {
                forms: planUsage.forms,
                monthlyResponses: planUsage.monthlyResponses,
                monthlyFormViews: planUsage.monthlyFormViews,
                fileStorage: planUsage.fileStorage
            }
            userPlan.usage = newUsage;
            console.log(userPlan);
            await userPlan.save();
            break;
            
        default:
            console.log(`Unhandled event type ${event.type}`);
            return Response.json({ received: false, message: `Unhandled event type ${event.type}` }, { status: 400 });
    }

    return Response.json({ received: true }, { status: 200 });
}