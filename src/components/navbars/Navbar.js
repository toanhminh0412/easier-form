"use client";

import NeutralNavbar from "./NeutralNavbar";
import SignedinNavbar from "./SignedinNavbar";

const navigation = [
    // { name: 'Dashboard', href: '#', current: true },
    // { name: 'Team', href: '#', current: false },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
]

export default function Navbar({ signedIn=false }) {
    return signedIn ? <SignedinNavbar navigation={navigation} /> : <NeutralNavbar navigation={navigation} />
}