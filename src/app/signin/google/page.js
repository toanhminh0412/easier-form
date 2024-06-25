"use client";

import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        window.location.href = "/";
    }, []);

    return <h1 className="text-black">Signed in successfully with Google. Loading...</h1>
}