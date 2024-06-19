import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTriangleExclamation, faInfoCircle, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Alert({ type, title, message }) {
    switch (type) {
        case 'success':
            return <SuccessAlert title={title} message={message} />
        case 'danger':
            return <DangerAlert title={title} message={message} />
        case 'warning':
            return <WarningAlert title={title} message={message} />
        case 'info':
            return <InfoAlert title={title} message={message} />
        default:
            return null
    }
}

const SuccessAlert = ({ title="", message="" }) => {
    return (
        <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faCheck} className="h-3 w-3 text-white rounded-full bg-green-500 p-1"/>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">{ title }</h3>
                    <div className="mt-2 text-sm text-green-700">
                    <p>
                        { message }
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
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

const InfoAlert = ({ title="", message="" }) => {
    return (
        <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faInfoCircle} className="h-3 w-3 text-white rounded-full bg-blue-500 p-1"/>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">{ title }</h3>
                    <div className="mt-2 text-sm text-blue-700">
                    <p>
                        { message }
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}