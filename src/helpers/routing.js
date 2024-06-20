"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const redirectToHomeIfLoggedIn = () => {
    const signedInCookie = cookies().get("signedIn");
    const signedIn = signedInCookie && signedInCookie.value === "true" ? true : false;
    if (signedIn) {
        redirect("/");
    }
}

export { redirectToHomeIfLoggedIn };