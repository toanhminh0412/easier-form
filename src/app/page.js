import Link from "next/link";
import { cookies } from "next/headers";

export default function Home() {
    const signedInCookie = cookies().get("signedIn");
    const signedIn = signedInCookie && signedInCookie.value === "true" ? true : false;

    if (signedIn) {
        return (
            <main>
                <Link href="/form">Go to form</Link>
            </main>
        );
    }

    return (
        <main>
            <Link href="/signin">Sign in</Link>
        </main>
    )
}
