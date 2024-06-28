import Image from "next/image";

export default function ImageUpload({ item, value=null, edit=false }) {
    return (
        <div className={edit || value ? "relative" : ""}>
            {value ? <div className="mb-2">
                <Image
                    src={value.url}
                    alt={value.name}
                    width={200}
                    height={200}
                    className="object-cover"
                />
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
                    accept="image/*"
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