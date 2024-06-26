import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";

import Public from "./Public";
import Private from "./Private";

import Navbar from "@/components/navbars/Navbar";

export default async function Home() {
    // Force users to verify email
    const session = await getServerSession(authOptions);
    console.log(session);
    if (session && session.user && !session.user.isEmailVerified) {
        redirect("/verify-email");
    }

    const signedInCookie = cookies().get("signedIn");
    const signedIn = signedInCookie && signedInCookie.value === "true" ? true : false;

    if (signedIn) {
        return (
            <>
                <Navbar signedIn/>
                <Private />
            </>
        );
    }

    return (
        <>
            <Navbar signedIn={false} />
            <Public />
        </>
    )
}
