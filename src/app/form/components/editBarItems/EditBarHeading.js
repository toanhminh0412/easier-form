import { useContext } from "react";

import FormActiveItemContext from "@/contexts/FormActiveItem";

export default function EditBarBasicHeading({ item }) {
    const { setFormActiveItem } = useContext(FormActiveItemContext);

    // Change the item's text and tag
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
            {/* Text */}
            <div>
                <label className="block text-sm font-medium leading-6">
                    Text
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="e.g. Heading"
                    value={item.text}
                    onChange={updateItem}
                    />
                </div>
            </div>

            {/* Tag */}
            <div className="mt-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Heading Level
                </label>
                <select
                    name="tag"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={item.tag}
                    onChange={updateItem}
                >
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                </select>
            </div>
        </div>
    );
}