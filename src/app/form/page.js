import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import PrivatePage from "@/app/form/Private";

export default function Page() {
    // User must sign in to visit this page
    const signedInCookie = cookies().get("signedIn");
    const signedIn = signedInCookie && signedInCookie.value === "true" ? true : false;
    if (!signedIn) {
        redirect("/signin");
    }

    return <PrivatePage />;
}