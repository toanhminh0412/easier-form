import { useContext } from "react";

import FormActiveItemContext from "@/app/form/[formId]/edit/contexts/FormActiveItem";

export default function EditBarLabelOnly({ item }) {
    const { setFormActiveItem } = useContext(FormActiveItemContext);

    const updateItem = (label) => {
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                label
            }
        });
    }

    return (
        <div className="text-gray-300">
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
                        onChange={(e) => updateItem(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}