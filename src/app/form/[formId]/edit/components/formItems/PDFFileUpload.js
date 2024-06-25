import Link from "next/link";

export default function PDFFileUpload({ item, value=null }) {
    // Download the file
    if (value) {
        return (
            <div>
                <Link href={value} target="_blank">
                    <a className="text-indigo-600 hover:text-indigo-900">{item.label}</a>
                </Link>
            </div>
        )
    }
    
    return (
        <div>
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
                    required = {item.required !== false}
                />
            </div>
            <p className="mt-2 text-sm text-gray-500" id={`${item.i}-description`}>
                {item.description}
            </p>
        </div>
    );
}