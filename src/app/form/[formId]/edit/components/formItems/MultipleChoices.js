"use client";

import { useState, useEffect } from "react";

export default function MultipleChoices({ item, value=null, readOnly=false }) {
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (value !== null) {
            setSelected(value);
        }
    }, [value]);

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        if (selected.includes(selectedValue)) {
            setSelected(selected.filter(value => value !== selectedValue));
        } else {
            setSelected([...selected, selectedValue]);
        }
    }

    // Users can select multiple options
    return (
        <div>
            <label htmlFor={item.i} className="block text-sm font-medium leading-6 text-gray-900 mb-3">
                {item.label} {item.required && <span className="text-red-600">*</span>}
            </label>
            <div className="flex flex-col gap-2">
                {item.options.map((option, index) => (
                    <div key={option.id} className="flex flex-row gap-1">
                        <input
                            id={`${item.i}-${option.id}`}
                            value={option.value}
                            name={item.i}
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            checked={selected.includes(option.value)}
                            disabled={readOnly}
                            onChange={handleChange}
                            required={item.required && selected.length === 0}
                        />
                        <label htmlFor={`${item.i}-${index}`} className="ml-2 block text-sm text-gray-900">
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
            <p className="mt-3 text-sm text-gray-500" id={`${item.i}-description`}>
                {item.description}
            </p>
        </div>
    )
}