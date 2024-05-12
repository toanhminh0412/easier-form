import { useContext } from "react";

import FormActiveItemContext from "@/contexts/FormActiveItem";

export default function EditBarBasicTextInput({ item }) {
    const { setFormActiveItem } = useContext(FormActiveItemContext);

    // Change the item's label, placeholder, and description on type
    const updateItem = (e) => {
        const { name, value } = e.target;
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                [name]: value
            }
        });
    }

    return (
        <div className="text-gray-300">
            {/* Label */}
            <div>
                <label className="block text-sm font-medium leading-6">
                    Label
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="label"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="e.g. First Name"
                    value={item.label}
                    onChange={updateItem}
                    />
                </div>
            </div>

            {/* Placeholder */}
            <div className="mt-3">
                <label className="block text-sm font-medium leading-6">
                    Placeholder
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="placeholder"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="e.g. John Doe"
                    value={item.placeholder}
                    onChange={updateItem}
                    />
                </div>
            </div>

            {/* Description */}
            <div className="mt-3">
                <label className="block text-sm font-medium leading-6">
                    Description
                </label>
                <div className="mt-2">
                    <textarea
                    rows={4}
                    name="description"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={item.description}
                    onChange={updateItem}
                    />
                </div>
            </div>
        </div>
    );
}