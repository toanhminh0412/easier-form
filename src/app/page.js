import { cookies } from "next/headers";

import Public from "./Public";
import Private from "./Private";

export default function Home() {
    const signedInCookie = cookies().get("signedIn");
    const signedIn = signedInCookie && signedInCookie.value === "true" ? true : false;

    if (signedIn) {
        return (
            <Private />
        );
    }

    return (
        <Public />
    )
}
