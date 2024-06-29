"use client";

import { useState } from "react";

import ProvideEmail from "./ProvideEmail";
import ProvideCode from "./ProvideCode";
import ProvidePassword from "./ProvidePassword";

export default function Page() {
    const [step, setStep] = useState("provideEmail");

    if (step === "provideEmail") {
        return <ProvideEmail setStep={setStep}/>;
    }

    if (step === "provideCode") {
        return <ProvideCode setStep={setStep}/>;
    }

    if (step === "providePassword") {
        return <ProvidePassword setStep={setStep}/>;
    }

    return <div>404 - Page does not exist</div>;
}