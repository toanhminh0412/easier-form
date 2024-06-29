"use client";

import Image from "next/image";
import { useState } from "react";

import { signIn as NextAuthSignIn } from "next-auth/react";

import { setCookie } from "@/serverActions/cookies";
import Navbar from "@/components/navbars/Navbar";
import Alert from "@/components/ui/Alert";


export default function ProvidePassword({ setStep }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        console.log(password, confirmPassword);

        // Check if passwords match
        if (password !== confirmPassword) {
            setError({ title: "Error", message: "Passwords do not match." });
            setLoading(false);
            return;
        }

        // Create a new password
        try {
            const response = await fetch("/api/auth/credentials/forgotPassword/setPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Sign user in
                const result = await NextAuthSignIn("credentials", { email: data.email, password, callbackUrl: "/", redirect: false});
                await setCookie("signedIn", "true");
                // Redirect to the home page
                window.location.href = result.url ? result.url : "/";
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
                                Enter your new password
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Please enter your new password. This password will be used to sign in to your account. 
                                A password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter and one number.
                            </p>
                        </div>
        
                        <div className="mt-10">
                            {error && <Alert type="danger" title={error.title} message={error.message} />}

                            <div className="mt-4">
                                <form action="#" method="POST" className="space-y-6" onSubmit={submitPassword}>
                                    <div>
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                                autoComplete="current-password"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                                Confirm password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
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