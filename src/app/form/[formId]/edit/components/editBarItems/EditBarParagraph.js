import { useContext } from "react";

import FormActiveItemContext from "@/app/form/[formId]/edit/contexts/FormActiveItem";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditBarParagraph({ item }) {
    const { setFormActiveItem } = useContext(FormActiveItemContext);

    const updateItem = (text) => {
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                text
            }
        });
    }

    return (
        <div className="text-gray-300">
            <div>
                <label className="block text-sm font-medium leading-6">
                    Text
                </label>
                <div className="mt-2">
                    <RichTextEditor
                        value={item.text}
                        onChange={updateItem}
                    />
                </div>
            </div>
        </div>
    )
}