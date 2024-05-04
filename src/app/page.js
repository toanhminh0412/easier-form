import Link from "next/link";

import Navbar from "@/components/navbars/Navbar";

export default function Home() {
    return (
        <main>
            <Navbar/>
            <Link href="/form">Go to form</Link>
        </main>
    );
}
