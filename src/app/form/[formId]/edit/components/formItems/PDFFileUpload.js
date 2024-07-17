import Link from "next/link";

export default function PDFFileUpload({ item, value=null, readOnly=false }) {
    if (value) {
        return (
        <div>
            <label
                htmlFor={item.i}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {item.label}
            </label>
            <Link href={value.url} target="_blank" className="text-indigo-600 hover:text-indigo-900 underline">
                {value.name}
            </Link>
        </div>)
    }

    return (
        <div className={readOnly ? "relative" : ""}>
            <label
                htmlFor={item.i}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {item.label} {item.required && <span className="text-red-600">*</span>}
            </label>
            <div className="mt-2">
                <input
                    type="file"
                    name={item.i}
                    id={item.i}
                    accept=".pdf"
                    className="file-input file-input-bordered file-input-sm w-full bg-white text-gray-900"
                    aria-describedby={`${item.i}-description`}
                    required={item.required}
                />
                {readOnly ? <div className="absolute inset-0"></div> : null}
            </div>
            <p className="mt-2 text-sm text-gray-500" id={`${item.i}-description`}>
                {item.description}
            </p>
        </div>
    );
}