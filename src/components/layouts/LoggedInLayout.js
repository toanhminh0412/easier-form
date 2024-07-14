"use client";

import { useState, useEffect } from "react";
import { getSession, SessionProvider, signOut } from "next-auth/react";

import { deleteCookie } from "@/serverActions/cookies";
import Navbar from "../navbars/Navbar";

export default function LoggedInLayout({ children }) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const initSession = async () => {
            const session = await getSession();
            setSession(session);

            // Force users to verify email
            if (session && session.user && !session.user.isEmailVerified) {
                window.location.href = "/verify-email";
            }

            // If user doesn't have a session, sign them out
            if (!session) {
                deleteCookie("signedIn");
                await signOut({ redirect: true, callbackUrl: "/signin" });
            }
        }

        initSession();
    }, []);

    if (!session) {
        return <h1>Loading...</h1>
    }

    return (
        <SessionProvider session={session}>
            <Navbar signedIn/>
            {children}
        </SessionProvider>
    )
}