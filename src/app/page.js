import { cookies } from "next/headers";

import Public from "./Public";
import Private from "./Private";

// import { deleteCookie } from "@/serverActions/cookies";
import LoggedInLayout from "@/components/layouts/LoggedInLayout";
import Navbar from "@/components/navbars/Navbar";

export default async function Home() {
    // Force users to verify email
    // const session = await getServerSession(authOptions);
    // console.log(session);
    // if (session && session.user && !session.user.isEmailVerified) {
    //     redirect("/verify-email");
    // }

    const signedInCookie = cookies().get("signedIn");
    const signedIn = signedInCookie && signedInCookie.value === "true" ? true : false;


    if (signedIn) {
        return (
            <LoggedInLayout>
                <Private />
            </LoggedInLayout>
        );
    }

    return (
        <>
            <Navbar signedIn={false} />
            <Public />
        </>
    )
}
