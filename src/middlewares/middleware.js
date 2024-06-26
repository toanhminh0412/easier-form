import { NextResponse } from "next/server";

import emailVerificationMiddleware from "./emailVerificationMiddleware";


export default async function middleware(req) {
  console.log(req.nextUrl.pathname)
    if (!req.nextUrl.pathname.startsWith('/verify-email') && !req.nextUrl.pathname.startsWith('/api/auth')) {
        const emailVerified = await emailVerificationMiddleware(req);
        
        // If user is signed in but email is not verified, redirect to verify-email page
        if (!emailVerified) {
            return NextResponse.redirect(new URL(`/verify-email?email=${encodeURIComponent(req.nextauth.token.user.email)}`, req.url));
        }
    }
    
  
    return NextResponse.next();
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|.*\.css|.*\.json).*)',
    ],
}