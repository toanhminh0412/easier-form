import { useState, useEffect } from "react";

export default function Textarea({ item }) {
    const [label, setLabel] = useState(item.label);
    const [placeholder, setPlaceholder] = useState(item.placeholder);
    const [description, setDescription] = useState(item.description);
    
    return (
        <div className="h-full flex flex-col">
            <label htmlFor={item.i} className="block text-sm font-medium leading-6 text-gray-900">
            {label}
            </label>
            <div className="mt-2 flex-grow">
                <textarea 
                    name={item.i} 
                    id={item.i}
                    className="textarea textarea-bordered w-full h-full bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                    aria-describedby={`${item.i}-description`}>
                </textarea>                    
            </div>
            <p className="mt-2 text-sm text-gray-500" id={`${item.i}-description`}>
                {description}
            </p>
        </div>
    )
}