"use client";

import { useState, useEffect } from "react";
import { getSession, SessionProvider } from "next-auth/react";

import Navbar from "../navbars/Navbar";

export default function LoggedInLayout({ children }) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const initSession = async () => {
            const session = await getSession();
            setSession(session);
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