export default function Date({ item }) {
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
                    type="date"
                    name={item.i}
                    id={item.i}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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