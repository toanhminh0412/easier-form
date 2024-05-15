export default function PDFFileUpload({ item }) {
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
                />
            </div>
            <p className="mt-2 text-sm text-gray-500" id={`${item.i}-description`}>
                {item.description}
            </p>
        </div>
    );
}