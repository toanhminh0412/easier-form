import Link from "next/link";

export default function PDFFileUpload({ item, value=null, edit=false }) {
    return (
        <div className={edit || value ? "relative" : ""}>
            {value ? <div className="mb-2">
                <Link href={value.url} target="_blank" className="text-indigo-600 hover:text-indigo-900 underline">
                    {value.name}
                </Link>
            </div> : null}
            <label
                htmlFor={item.i}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {item.label}
            </label>
            <div className="mt-2">
                <input
                    type="file"
                    name={item.i}
                    id={item.i}
                    accept=".pdf"
                    className="file-input file-input-bordered file-input-sm w-full bg-white text-gray-900"
                    aria-describedby={`${item.i}-description`}
                    required={item.required !== false}
                />
                {edit || value ? <div className="absolute inset-0"></div> : null}
            </div>
            <p className="mt-2 text-sm text-gray-500" id={`${item.i}-description`}>
                {item.description}
            </p>
        </div>
    );
}