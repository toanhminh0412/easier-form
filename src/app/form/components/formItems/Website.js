import { useState } from "react";

export default function Website({ item }) {
    const [label, setLabel] = useState(item.label);
    const [placeholder, setPlaceholder] = useState(item.placeholder);
    const [description, setDescription] = useState(item.description);

    return (
        <div>
            <label
                htmlFor={item.i}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    type="url"
                    name={item.i}
                    id={item.i}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                    aria-describedby={`${item.i}-description`}
                />
            </div>
            <p className="mt-2 text-sm text-gray-500" id={`${item.i}-description`}>
                {description}
            </p>
        </div>
    );
}