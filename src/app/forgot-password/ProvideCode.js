"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Navbar from "@/components/navbars/Navbar";
import Alert from "@/components/ui/Alert";

export default function ProvideCode({ setStep }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [failedTrials, setFailedTrials] = useState(0);

    // Redirect user to signin page if they have failed 3 times
    useEffect(() => {
        if (failedTrials >= 3) {
            router.push("/signin");
        }
    }, [failedTrials]);

    const verifyCode = async (e) => {
        e.preventDefault();
        console.log("Verifying email...");
        setLoading(true);
        setError(null);
        const code = e.target.code.value;

        const response = await fetch("/api/auth/credentials/forgotPassword/verifyCode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
        });

        if (response.ok) {
            setStep("providePassword");
        } else {
            const data = await response.json();
            setError({ title: "Wrong code", message: data.error });
            setLoading(false);
            setFailedTrials(trials => trials + 1);
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="flex min-h-[95vh] flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h1 className="text-xl font-bold text-indigo-600">EasierForm</h1>
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Provide code
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                We&apos;ve sent you a 6-digits one-time code to verify your email address. Please enter the code below.
                            </p>
                        </div>
        
                        <div className="mt-10">
                            {error && <Alert type="danger" title={error.title} message={error.message} />}

                            <div className="mt-4">
                                <form action="#" method="POST" className="space-y-6" onSubmit={verifyCode}>
                                    <div>
                                        <div className="mt-2">
                                            <input
                                            id="code"
                                            name="code"
                                            type="text"
                                            pattern="[0-9]{6}"
                                            placeholder="Enter your 6-digits code"
                                            title="Code should be 6 digits long"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                
                                    <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        disabled={loading}
                                    >
                                        {loading ? "Verifying..." : "Submit"}
                                    </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <Image
                    width={1000}
                    height={1500}
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/img/login.png"
                    alt=""
                    />
                </div>
            </div>
        </div>
    )
}