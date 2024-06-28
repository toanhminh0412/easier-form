import Image from "next/image";

export default function ImageUpload({ item, value=null, edit=false }) {
    // Display the image
    if (value) {
        return (
            <Image
                src={value}
                alt={item.label}
                width={200}
                height={200}
            />
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
            <div className={`mt-2 ${edit ? "relative" : ""}`}>
                <input
                    type="file"
                    name={item.i}
                    id={item.i}
                    accept="image/*"
                    className="file-input file-input-bordered file-input-sm w-full bg-white text-gray-900"
                    aria-describedby={`${item.i}-description`}
                    required={item.required !== false}
                />
                {edit ? <div className="absolute inset-0"></div> : null}
            </div>
            <p className="mt-2 text-sm text-gray-500" id={`${item.i}-description`}>
                {item.description}
            </p>
        </div>
    );
}