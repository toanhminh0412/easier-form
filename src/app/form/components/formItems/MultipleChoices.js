import { useState } from "react";

export default function MultipleChoices({ item }) {
    const [label, setLabel] = useState(item.label);
    const [description, setDescription] = useState(item.description);
    const [options, setOptions] = useState(item.options);

    // Users can select multiple options
    return (
        <div>
            <label htmlFor={item.i} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                {options.map((option, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            id={`${item.i}-${index}`}
                            name={item.i}
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`${item.i}-${index}`} className="ml-2 block text-sm text-gray-900">
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
            <p className="mt-2 text-sm text-gray-500" id={`${item.i}-description`}>
                {description}
            </p>
        </div>
    )
}