import { cookies } from "next/headers"

import LoggedInLayout from "@/components/layouts/LoggedInLayout"
import Navbar from "@/components/navbars/Navbar"
import Showcase from "@/components/landing/Showcase"
import forms from "@/data/landing/demoForms"

export const metadata = {
    title: "Example forms",
};

export default function Page() {
    const signedInCookie = cookies().get("signedIn")
    const signedIn = signedInCookie && signedInCookie.value === "true" ? true : false


    if (signedIn) {
        return (
            <LoggedInLayout>
                <Showcase forms={forms.slice(0, 6)} />
            </LoggedInLayout>
        )
    }

    return (
        <>
            <Navbar signedIn={signedIn}/>
            <Showcase forms={forms.slice(0, 6)} />
        </>
    )
}