import { useState } from "react"

export default function Dropdown({ item }) {
    const [label, setLabel] = useState(item.label);
    const [options, setOptions] = useState(item.options);
    const [description, setDescription] = useState(item.description);

    return (
        <div>
            <label htmlFor={item.i} className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                {label}
            </label>
            <select
                id={item.i}
                name={item.i}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                aria-describedby={`${item.i}-description`}
            >
                {options.map(option =>
                    <option value={option.value}>
                        {option.label}
                    </option>
                )}
            </select>
            <p className="mt-2 text-sm text-gray-500" id={`${item.i}-description`}>
                {description}
            </p>
        </div>
    )
}