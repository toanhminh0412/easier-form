import { useContext } from "react";

import FormActiveItemContext from "@/contexts/FormActiveItem";

export default function EditBarSeparator({ item }) {
    const { setFormActiveItem } = useContext(FormActiveItemContext);

    const updateItem = (lineWidth) => {
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                lineWidth
            }
        });
    }

    return (
        <div className="text-gray-300">
            <div>
                <label className="block text-sm font-medium leading-6">
                    Line Width
                </label>
                <div className="mt-2">
                    <input
                        type="range"
                        name="lineWidth"
                        min="1"
                        max="10"
                        step="1"
                        value={item.lineWidth}
                        className="range-input range-input-primary w-full"
                        onChange={(e) => updateItem(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}