import Credentials from "next-auth/providers/credentials";

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
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
                    console.log("From authorize function:");
                    console.log(user);
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
        async jwt({ token, user }) {
            // Add access_token to the token right after signin
            if (user) {
                return {...token, user};
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