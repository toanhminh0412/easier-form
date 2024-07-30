import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import Navbar from "@/components/navbars/Navbar"

export const metadata = {
    title: "Sign up",
};

export default function FormLayout({ children }) {
    const signedInCookie = cookies().get("signedIn");
    const signedIn = signedInCookie && signedInCookie.value === "true" ? true : false;
    if (signedIn) {
        redirect("/");
    }

    return (
        <div>
            <Navbar signedIn={false}/>
            {children}
        </div>
    )
}