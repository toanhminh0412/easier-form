"use client";

import { useState } from "react";

export default function Password({ item, value=null, readOnly=false }) {    
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div>
            <label htmlFor={item.i} className="block text-sm font-medium leading-6 text-gray-900">
                {item.label} {item.required && item.label && <span className="text-red-600">*</span>}
            </label>
            <div className={`mt-2 ${readOnly && value ? "flex flex-row" : ""}`}>
                <input
                    type={showPassword ? "text" : "password"}
                    name={item.i}
                    id={item.i}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={item.placeholder}
                    aria-describedby={`${item.i}-description`}
                    required = {item.required}
                    readOnly={readOnly}
                    defaultValue={value !== null ? value : ""}
                />
                {readOnly && value && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="ml-2 btn btn-primary btn-sm"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                )}
            </div>
            <p className="mt-2 text-sm text-gray-500" id={`${item.i}-description`}>
                {item.description}
            </p>
        </div>
    )
  }
  