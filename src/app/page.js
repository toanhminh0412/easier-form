import { cookies } from "next/headers";

import Public from "./Public";
import Private from "./Private";

import Navbar from "@/components/navbars/Navbar";

export default function Home() {
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
