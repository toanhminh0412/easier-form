"use client";

import { useState, useEffect } from "react";
import { getSession, SessionProvider } from "next-auth/react";

import Navbar from "../navbars/Navbar";

export default function LoggedInLayout({ children }) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const initSession = async () => {
            const session = await getSession();
            console.log("Session initialized");
            console.log(session);
            setSession(session);

            // Force users to verify email
            if (session && session.user && !session.user.isEmailVerified) {
                window.location.href = "/verify-email";
            }
        }

        initSession();
    }, []);

    return (
        <SessionProvider session={session}>
            <Navbar signedIn/>
            {children}
        </SessionProvider>
    )
}