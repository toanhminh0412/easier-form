"use client";

import { useState, useEffect } from "react";

export default function Checkbox({ item, value=null, readOnly=false }) {
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
        <div>
            <div className="flex items-center">
                <input
                    id={item.i}
                    name={item.i}
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={checked}
                    disabled={readOnly}
                    onChange={handleChange}
                />
                <label htmlFor={item.i} className="ml-2 block text-sm text-gray-900">
                    {item.label}
                </label>
            </div>
        </div>
    )
}