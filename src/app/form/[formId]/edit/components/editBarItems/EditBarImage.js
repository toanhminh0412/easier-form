import Image from "next/image";
import { useContext, useState } from "react";

import FormActiveItemContext from "@/app/form/[formId]/edit/contexts/FormActiveItem";

import FilesManagerModal from "@/components/modals/FilesManagerModal";

export default function EditBarImage({ item }) {
    const { setFormActiveItem } = useContext(FormActiveItemContext);
    const [previewSrc, setPreviewSrc] = useState(item.src);

    const updateItem = (src) => {
        document.getElementById('filesManager').close();
        setPreviewSrc(src);
        setFormActiveItem(oldItem => {
            return {
                ...oldItem,
                src: src
            }
        });
    }

    return (
        <div className="text-gray-300">
            {/* Preview image */}
            <Image
                src={previewSrc}
                width={200}
                height={200}
                alt="Preview"
                className="object-cover mx-auto"
            />

            <div className="mt-8">
                <button className="btn btn-primary w-full" onClick={()=>document.getElementById('filesManager').showModal()}>
                    Change image
                </button>
                <FilesManagerModal selectImage={updateItem}/>
            </div>
        </div>
    )
}