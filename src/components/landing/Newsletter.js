"use client";
import { useState } from "react";

import Alert from "../ui/Alert";

export default function Newsletter() {
    const [success, setSuccess] = useState(false);

    const subscribe = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;

        const response = await fetch('/api/email/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            console.error(response.statusText);
        }
        setSuccess(true);
    }

    return (
        <div className="bg-gray-900 py-16 sm:py-24 lg:py-32">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
                <div className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:col-span-7">
                    <h2 className="inline sm:block lg:inline xl:block">Want product news and updates?</h2>{' '}
                    <p className="inline sm:block lg:inline xl:block">Sign up for our newsletter.</p>
                </div>
                <form className="w-full max-w-md lg:col-span-5 lg:pt-2" onSubmit={subscribe}>
                    <div className="flex gap-x-4">
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            placeholder="Enter your email"
                            readOnly={success}
                        />
                        <button
                            type="submit"
                            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            disabled={success}
                        >
                            Subscribe
                        </button>
                    </div>

                    {/* Success message */}
                    {success && (
                        <div className="mt-3">
                            <Alert type="success" 
                                title="Subscribed successfully!"
                                message="You have successfully subscribed to our newsletter.">
                            </Alert>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
  }
  