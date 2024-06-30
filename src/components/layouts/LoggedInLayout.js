"use client";

import { useState, useEffect } from "react";
import { getSession, SessionProvider } from "next-auth/react";

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
            {children}
        </SessionProvider>
    )
}