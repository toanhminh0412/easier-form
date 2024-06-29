"use client";

import Image from "next/image";

import { useState } from "react";

import Navbar from "@/components/navbars/Navbar";
import Alert from "@/components/ui/Alert";


export default function ProvideEmail({ setStep }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const email = e.target.email.value;
        console.log(email);

        try {
            const response = await fetch("/api/auth/credentials/forgotPassword/sendCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStep("provideCode");
            } else {
                const data = await response.json();
                setError({ title: "Error", message: data.error });
            }
        } catch (error) {
            console.error("An unexpected error happened:", error);
            setError({ title: "Error", message: "An unexpected error happened. Please try again later." });
        }

        setLoading(false);
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
                                Enter your email
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Please enter your email. We will send you a 6-digits code to verify your email address. Once you're email is verified, you can reset your password.
                            </p>
                        </div>
        
                        <div className="mt-10">
                            {error && <Alert type="danger" title={error.title} message={error.message} />}

                            <div className="mt-4">
                                <form action="#" method="POST" className="space-y-6" onSubmit={submitEmail}>
                                    <div>
                                        <div className="mt-2">
                                            <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
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
                                        {loading ? "Loading..." : "Submit"}
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