export default function Textarea({ item, value=null, readOnly=false }) {    
    return (
        <div className="h-full flex flex-col">
            <label htmlFor={item.i} className="block text-sm font-medium leading-6 text-gray-900">
                {item.label} {item.required && item.label && <span className="text-red-600">*</span>}
            </label>
            <div className="mt-2 flex-grow">
                <textarea 
                    name={item.i} 
                    id={item.i}
                    className="textarea textarea-bordered w-full h-full bg-white disabled:bg-white disabled:text-black disabled:ring-gray-300 disabled:border-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={item.placeholder}
                    aria-describedby={`${item.i}-description`}
                    required = {item.required}
                    readOnly={readOnly}
                    defaultValue={value !== null ? value : ""}
                >
                </textarea>                    
            </div>
            <p className="mt-2 text-sm text-gray-500" id={`${item.i}-description`}>
                {item.description}
            </p>
        </div>
    )
}