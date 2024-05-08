import { useState } from "react";

export default function Toggle({ item }) {
    const [label, setLabel] = useState(item.label);

    return (
        <div className="flex items-center">
            <input
                id={item.i}
                name={item.i}
                type="checkbox"
                className="toggle toggle-primary"
            />
            <label htmlFor={item.i} className="ml-2 text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
        </div>
    )
}