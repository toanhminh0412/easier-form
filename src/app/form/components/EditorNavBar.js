import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faEye, faCode } from "@fortawesome/free-solid-svg-icons"

export default function EditorNavbar() {
    return (
        <div className="sticky top-0 left-0 w-full h-14 bg-neutral px-3 flex flex-row justify-between">
            <div className="flex flex-col justify-center h-full">
                <h1 className="text-lg font-medium my-auto px-3 py-2 w-fit h-fit rounded-lg hover:bg-gray-900 cursor-pointer text-white">Form name</h1>
            </div>
            <div className="flex flex-row gap-2 my-auto">
                <button className="btn btn-sm btn-primary text-white">
                    <FontAwesomeIcon icon={faEye} />
                    Preview
                </button>
                <button 
                    className="btn btn-sm btn-warning"
                    onClick={()=>document.getElementById('form-json-modal').showModal()}>
                    <FontAwesomeIcon icon={faCode} />
                    View JSON
                </button>
            </div>
        </div>
    )
}