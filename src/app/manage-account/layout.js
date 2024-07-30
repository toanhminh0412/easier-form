// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"
import { Suspense } from "react"

import LoggedInLayout from "@/components/layouts/LoggedInLayout"

export const metadata = {
    title: "Manage account",
};

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
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
        </LoggedInLayout>
    )
}