import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import LoggedInLayout from "@/components/layouts/LoggedInLayout"

export default function FormLayout({ children }) {
    // NOTE: Temporarily commented out
    // Stripe when redirects to this page doesn't have the signedIn cookie set
    // Therefore, automatically redirect to signin page, leads to poor and confusing UX
    
    // const signedInCookie = cookies().get("signedIn");
    // const signedIn = signedInCookie && signedInCookie.value === "true" ? true : false;
    // if (!signedIn) {
    //     redirect("/signin");
    // }

    return (
        <LoggedInLayout>
            {children}
        </LoggedInLayout>
    )
}