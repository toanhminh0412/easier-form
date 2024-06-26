import { withAuth } from "next-auth/middleware"

export default withAuth (
    async function emailVerificationMiddleware(req) {
        const token = req.nextauth.token;
        console.log("Token in middleware");
        console.log(token);

        if (token && token.user) {
            const user = token.user;
            if (!user.isEmailVerified) {
                return false
                
            }
        }

        return true;
    }
)