"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import NeutralNavbar from "./NeutralNavbar";
import SignedinNavbar from "./SignedinNavbar";

// const navigation = [
    // { name: 'Dashboard', href: '#', current: true },
    // { name: 'Team', href: '#', current: false },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
// ]

export default function Navbar({ signedIn=false }) {
    const pathname = usePathname();
    const [navigation, setNavigation] = useState([
        { name: 'Examples', href: '/example-forms', current: false }
    ]);

    useEffect(() => {
        setNavigation([
            { name: 'Examples', href: '/example-forms', current: pathname === "/example-forms" }
        ]);
    }, [pathname]);

    return signedIn ? <SignedinNavbar navigation={navigation} /> : <NeutralNavbar navigation={navigation} />
}