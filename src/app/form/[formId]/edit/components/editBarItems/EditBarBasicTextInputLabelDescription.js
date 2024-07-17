import { useContext } from "react";

import FormActiveItemContext from "@/app/form/[formId]/edit/contexts/FormActiveItem";

export default function EditBarLabelDescription({ item }) {
    const { setFormActiveItem } = useContext(FormActiveItemContext);

    // Change the item's label, description and required
    const updateItem = (e) => {
        if (e.target.name === "required") {
            setFormActiveItem(oldItem => {
                return {
                    ...oldItem,
                    required: e.target.checked
                }
            });
            return;
        }

        const { name, value } = e.target;
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                [name]: value
            }
        });
    }

    return (
        <div className="text-white">
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
                    value={item.label}
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
                    <input
                    type="text"
                    name="description"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={item.description}
                    onChange={updateItem}
                    />
                </div>
            </div>

            {/* Required */}
            <div className="relative flex items-start mt-3">
                <div className="flex h-6 items-center">
                    <input
                    name="required"
                    type="checkbox"
                    aria-describedby="field-required"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={item.required}
                    onChange={updateItem}
                    />
                </div>
                <div className="ml-3 text-sm leading-6">
                    <label htmlFor="required" className="font-medium text-white">
                        Required
                    </label>
                    <p className="text-gray-200">
                        Visitors must fill out this field before submitting the form.
                    </p>
                </div>
            </div>
        </div>
    );
}