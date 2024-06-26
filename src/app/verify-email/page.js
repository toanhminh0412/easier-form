"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { getSession, SessionProvider } from "next-auth/react";
import VerifyEmail from "./VerifyEmail";

export default function Page() {
    const router = useRouter();
    const [session, setSession] = useState(null);

    // Redirect to sign in page if user is not logged in
    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            console.log(session);
            if (!session) {
                router.push("/signin");
            }

            setSession(session);
        }

        fetchSession();
    }, []);

    return (
        <SessionProvider session={session}>
            <VerifyEmail />
        </SessionProvider>
    );
}