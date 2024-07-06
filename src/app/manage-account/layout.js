import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import LoggedInLayout from "@/components/layouts/LoggedInLayout"

export default function FormLayout({ children }) {
    // User must sign in to visit any form page
    const signedInCookie = cookies().get("signedIn");
    const signedIn = signedInCookie && signedInCookie.value === "true" ? true : false;
    if (!signedIn) {
        redirect("/signin");
    }

    return (
        <LoggedInLayout>
            {children}
        </LoggedInLayout>
    )
}