import { cookies } from "next/headers";

import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { Plan } from "@/models/Plan";
import planData from "@/data/planData";

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            id: 'credentials',
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.org", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch(`${process.env.APP_URL}/api/auth/credentials/signin`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json();
            
                // If no error and we have user data, return it
                if (res.status === 200 && user) {
                    return user
                }

                // Return null if user data could not be retrieved
                throw new Error(user.error);
            },
            
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async signIn({ account, profile }) {
            // Handle Google sign in
            if (account.provider === "google") {
                const email = profile.email;
                
                await dbConnect();

                // Check if an user with the same email exists
                const existingUser = await User.findOne({ email: email });

                // If yes, update user profile if there is any missing field
                if (existingUser) {
                    if (!existingUser.name) {
                        existingUser.name = profile.name;
                    }
                    if (!existingUser.image) {
                        existingUser.image = profile.picture;
                    }
                    if (!existingUser.isEmailVerified && profile.email_verified) {
                        existingUser.isEmailVerified = true;
                    }
                    await existingUser.save();
                } else {
                    // If no, create a new user
                    const newUser = new User({
                        email: email,
                        name: profile.name,
                        image: profile.picture,
                        isEmailVerified: profile.email_verified
                    });
                    await newUser.save();
                }

                cookies().set("signedIn", "true", { httpOnly: true, secure: true, sameSite: "strict" });

                return true;
            
            // Handle credentials sign in
            } else if (account.provider === "credentials") {
                return true;

            // Handle other sign in methods
            } else {
                return false;
            }
        },
        async jwt({ token, user, trigger, session }) {
            // When signed in, populate session user from database
            if (trigger === "signIn") {
                await dbConnect();
                const dbUser = await User.findOne({ email: user.email });
                token = { ...token, user: dbUser }
            }

            // Update token to store the latest user data
            if (trigger === "update") {
                await dbConnect();
                const dbUserDoc = await User.findOne({ email: token.user.email });
                const dbUser = dbUserDoc.toObject();
                const updatedUser = { ...token.user, ...dbUser };
                token = { ...token, user: updatedUser }

                // Update user's plan
                if (token.user && token.user.plan) {
                    const dbPlanDoc = await Plan.findOne({ _id: token.user.plan._id });
                    if (dbPlanDoc) {
                        // Do a heavy operation to update plan usage
                        // Call only be triggered by update({ updatePlanUsage: true })
                        if (session && session.updatePlanUsage === true) {
                            await dbPlanDoc.updateUsage("all");
                        }
                        const plan = dbPlanDoc.toObject();
                        token.user.plan = plan;
                    // Handle the case where plan is deleted from the database manually
                    } else {
                        token.user.plan = null;
                    }
                }
            }

            // Create a plan for user if user doesn't have one
            if (token.user && !token.user.plan) {
                await dbConnect();
                // Check if user already has a plan
                const existingPlan = await Plan.findOne({ user: token.user._id });
                if (existingPlan) {
                    token.user.plan = existingPlan;
                    return token;
                }

                // Individual (free) plan by default
                const planUsage = planData.find(p => p.id === "individual");
                const plan = new Plan({
                    type: "individual",
                    user: token.user._id,
                    status: "active",
                    usage: {
                        forms: planUsage.forms,
                        monthlyResponses: planUsage.monthlyResponses,
                        monthlyFormViews: planUsage.monthlyFormViews,
                        fileStorage: planUsage.fileStorage
                    },
                    frequency: "monthly",
                    expiredDate: null
                })
                await plan.save();
                await plan.updateUsage("all");
                token.user.plan = plan;
            }
            return token;
        },
        async session({ session, token }) {
            // Add property to session, like an access_token from a provider.
            session.user = token.user || session.user;
            return session;
        }
    }
}

export default authOptions;