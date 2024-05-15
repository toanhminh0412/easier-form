export default function Radio({ item }) {
    return (
        <div>
            <label htmlFor={item.i} className="block text-sm font-medium leading-6 text-gray-900 mb-3">
                {item.label}
            </label>
            <div className="flex flex-col gap-2">
                {item.options.map(option => 
                <div key={option.id} className="flex flex-row gap-1">
                    <input
                        id={option.id}
                        name={item.i}
                        type="radio"
                        value={option.value}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={option.value} className="ml-2 block text-sm text-gray-900">
                        {option.label}
                    </label>
                </div>)}
            </div>
            <p className="mt-3 text-sm text-gray-500" id={`${item.i}-description`}>
                {item.description}
            </p>
        </div>
    )
}