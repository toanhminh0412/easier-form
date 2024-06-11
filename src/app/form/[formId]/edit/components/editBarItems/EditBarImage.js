import { useContext } from "react";

import FormActiveItemContext from "@/app/form/[formId]/edit/contexts/FormActiveItem";

export default function EditBarImage({ item }) {
    const { setFormActiveItem } = useContext(FormActiveItemContext);

    const updateItem = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setFormActiveItem(oldItem => {
                    return {
                        ...oldItem,
                        [name]: e.target.result
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="text-gray-300">
            <input
                type="file"
                name="src"
                accept="image/*"
                className="file-input file-input-bordered file-input-sm w-full bg-white text-gray-900"
                onChange={updateItem}
            />
        </div>
    )
}