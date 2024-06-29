"use client";

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { signIn as NextAuthSignIn } from "next-auth/react";

import { setCookie } from "@/serverActions/cookies";
import Alert from "@/components/ui/Alert"

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        // POST request to /api/credentials/signup
        try {
            const response  = await fetch('/api/auth/credentials/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, confirmPassword }),
            })
            const data = await response.json();
            if (!response.ok) {
                setError({
                    title: 'Login error',
                    message: data.error,
                });
                setLoading(false);
            } else {
                // Sign in the user
                const result = await NextAuthSignIn("credentials", { email, password, callbackUrl: "/", redirect: false});

                if (result && result.ok) {
                    await setCookie("signedIn", "true");
                    // Redirect to the home page
                    window.location.href = result.url ? result.url : "/";
                } else {
                    console.log(result);
                    setError({ title: "Sign in error", message: result.error });
                }
            }
        } catch (error) {
            setError({
                title: 'An error occurred',
                message: `Error received: ${ error }. Please try again later or contact us at easierform@gmail.com for support`,
            });
            setLoading(false);
        }

    }

    return (
        <div className="flex min-h-[95vh] flex-1">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <h1 className="text-xl font-bold text-indigo-600">EasierForm</h1>
                        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign up for an account
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Already a member?{' '}
                            <Link href="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Sign in now
                            </Link>
                        </p>
                    </div>
    
                    <div className="mt-10">
                        {error ? <Alert type="danger" title={error.title} message={error.message} /> : null}

                        <div className="mt-4">
                            <form action="#" method="POST" className="space-y-6" onSubmit={signUp}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
            
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
                                    <p className="mt-2 text-sm text-gray-500" id="email-description">
                                        A password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter and one number.
                                    </p>
                                </div>

                                <div>
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
            
                                <div className="flex items-center justify-between">
                                    {/* <div className="flex items-center">
                                        <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                                        Remember me
                                        </label>
                                    </div> */}
                
                                    <div className="text-sm leading-6">
                                        <Link href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                        </Link>
                                    </div>
                                </div>
            
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        disabled={loading}
                                    >
                                        {loading ? "Signing up ..." : "Sign up"}
                                    </button>
                                </div>
                            </form>
                        </div>
        
                        <div className="mt-10">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                </div>
                            </div>
            
                            <div className="mt-6">
                                <Link
                                href="#"
                                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                                onClick={async () => {
                                    setLoading(true);
                                    await NextAuthSignIn("google", { callbackUrl: "/signin/google" });
                                }}
                                >
                                    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                        <path
                                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                        fill="#EA4335"
                                        />
                                        <path
                                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                        fill="#4285F4"
                                        />
                                        <path
                                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                        fill="#FBBC05"
                                        />
                                        <path
                                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                        fill="#34A853"
                                        />
                                    </svg>
                                    <span className="text-sm font-semibold leading-6">Google</span>
                                </Link>
                            </div>
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
    )
}
  