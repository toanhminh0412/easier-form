import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Alert({ type, title, message }) {
    switch (type) {
        case 'danger':
            return <DangerAlert title={title} message={message} />
        case 'warning':
            return <WarningAlert title={title} message={message} />
        default:
            return null
    }
}

const DangerAlert = ({ title="", message="" }) => {
    return (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faXmark} className="h-3 w-3 text-white rounded-full bg-red-500 p-1"/>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{ title }</h3>
                    <div className="mt-2 text-sm text-red-700">
                    <p>
                        { message }
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const WarningAlert = ({ title="", message="" }) => {
    return (
        <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="h-3 w-3 text-white rounded-full bg-yellow-400 p-1"/>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">{ title }</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                    <p>
                        { message }
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}