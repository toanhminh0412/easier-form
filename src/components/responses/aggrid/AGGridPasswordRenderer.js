"use client";

import { useState } from "react";

export default function AGGridPasswordRenderer({ value }) {
    const [showPassword, setShowPassword] = useState(false);

    if (!value) return null;

    return (
        <div className="flex flex-row gap-2">
            <input
                type={showPassword ? "text" : "password"}
                value={value}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                readOnly
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mt-1 text-sm text-indigo-600 hover:text-indigo-900 focus:outline-none"
            >
                {showPassword ? "Hide" : "Show"}
            </button>
        </div>
    );
}