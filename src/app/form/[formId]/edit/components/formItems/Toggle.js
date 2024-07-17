"use client";

import { useState, useEffect } from "react";

export default function Toggle({ item, value=null, readOnly=false }) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (typeof value === "boolean") {
            setChecked(value);
        }
    }, [value]);

    const handleChange = (e) => {
        setChecked(e.target.checked);
    }
    
    return (
        <div className="flex items-center">
            <input
                id={item.i}
                name={item.i}
                type="checkbox"
                className="toggle toggle-primary"
                checked={checked}
                disabled={readOnly}
                onChange={handleChange}
                required={item.required}
            />
            <label htmlFor={item.i} className="ml-2 text-sm font-medium leading-6 text-gray-900">
                {item.label} {item.required && item.label && <span className="text-red-600">*</span>}
            </label>
        </div>
    )
}