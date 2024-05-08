import { useState } from "react"

export default function Radio({ item }) {
    const [label, setLabel] = useState(item.label);
    const [description, setDescription] = useState(item.description);
    const [options, setOptions] = useState(item.options);

    return (
        <div>
            <label htmlFor={item.i} className="block text-sm font-medium leading-6 text-gray-900 mb-3">
                {label}
            </label>
            <div className="flex flex-col gap-2">
                {options.map(option => 
                <div className="flex flex-row gap-1">
                    <input
                        id={option.value}
                        name={item.i}
                        type="radio"
                        value={option.value}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={option.value} className="ml-2 block text-sm text-gray-900">
                        {option.label}
                    </label>
                </div>)}
            </div>
            <p className="mt-3 text-sm text-gray-500" id={`${item.i}-description`}>
                {description}
            </p>
        </div>
    )
}