"use client";

import { useState, useEffect } from "react";

export default function Dropdown({ item, value=null, readOnly=false }) {
    const [selected, setSelected] = useState("");

    useEffect(() => {
        if (value !== null) {
            setSelected(value);
        }
    }, [value]);

    const handleChange = (e) => {
        setSelected(e.target.value);
    }
    
    return (
        <div>
            <label htmlFor={item.i} className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                {item.label} {item.required && <span className="text-red-600">*</span>}
            </label>
            <select
                id={item.i}
                name={item.i}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                aria-describedby={`${item.i}-description`}
                required = {item.required}
                disabled={readOnly}
                value={selected}
                onChange={handleChange}
            >
                {item.options.map(option =>
                    <option key={option.id} value={option.value}>
                        {option.label}
                    </option>
                )}
            </select>
            <p className="mt-2 text-sm text-gray-500" id={`${item.i}-description`}>
                {item.description}
            </p>
        </div>
    )
}