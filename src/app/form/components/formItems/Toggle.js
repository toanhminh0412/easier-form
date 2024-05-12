export default function Toggle({ item }) {
    return (
        <div className="flex items-center">
            <input
                id={item.i}
                name={item.i}
                type="checkbox"
                className="toggle toggle-primary"
            />
            <label htmlFor={item.i} className="ml-2 text-sm font-medium leading-6 text-gray-900">
                {item.label}
            </label>
        </div>
    )
}