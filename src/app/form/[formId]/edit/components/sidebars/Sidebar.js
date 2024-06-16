import Link from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faPencil, faAlignLeft, 
    faHashtag, faLock, faCheck, faDotCircle,
    faList, faToggleOn, faHeading, faParagraph,
    faImage, faMinus, faTasks, faThList, faThLarge,
    faEnvelope, faPhone, faHome, faMapPin, faGlobe,
    faCalendar, faClock, faCalendarAlt, faFileUpload
} from "@fortawesome/free-solid-svg-icons"

export default function Sidebar({ open }) {
    if (!open) return null

    return (
        <div id="sidebar" className="absolute top-0 left-0 z-30 max-h-full overflow-scroll">
            <div className="py-3 px-6 bg-base-100 flex flex-row justify-between border-b border-t border-gray-600">
                <h1 className="text-md font-semibold w-fit text-white">Add elements</h1>
                <FontAwesomeIcon icon={faXmark} className="my-auto text-xl hover:text-white"></FontAwesomeIcon>
            </div>
            <ul className="menu p-4 w-60 bg-base-100 text-base-content">
                {/* Basic fields */}
                <li className="menu-title text-gray-300">Basic fields</li>
                <DraggableItem type="short-text"><FontAwesomeIcon icon={faPencil}/> Short text</DraggableItem>
                <DraggableItem type="long-text"><FontAwesomeIcon icon={faAlignLeft}/> Long text</DraggableItem>
                <DraggableItem type="number"><FontAwesomeIcon icon={faHashtag}/> Number</DraggableItem>
                <DraggableItem type="password"><FontAwesomeIcon icon={faLock}/> Password</DraggableItem>

                {/* Decorative fields */}
                <li className="menu-title text-gray-300 mt-3">Decorative fields</li>
                <DraggableItem type="heading"><FontAwesomeIcon icon={faHeading}/> Heading</DraggableItem>
                <DraggableItem type="paragraph"><FontAwesomeIcon icon={faParagraph}/> Paragraph</DraggableItem>
                <DraggableItem type="image"><FontAwesomeIcon icon={faImage}/> Image</DraggableItem>
                <DraggableItem type="separator"><FontAwesomeIcon icon={faMinus}/> Separator</DraggableItem>

                {/* Choice fields */}
                <li className="menu-title text-gray-300 mt-3">Choice fields</li>
                <DraggableItem type="checkbox"><FontAwesomeIcon icon={faCheck}/> Checkbox</DraggableItem>
                <DraggableItem type="toggle"><FontAwesomeIcon icon={faToggleOn}/> Toggle</DraggableItem>
                <DraggableItem type="dropdown"><FontAwesomeIcon icon={faList}/> Dropdown</DraggableItem>
                <DraggableItem type="radio"><FontAwesomeIcon icon={faDotCircle}/> Single Choice</DraggableItem>
                <DraggableItem type="multiple-choices"><FontAwesomeIcon icon={faTasks}/> Multiple Choices</DraggableItem>
                <DraggableItem type="single-choice-grid"><FontAwesomeIcon icon={faThList}/> Single Choice Grid</DraggableItem>
                <DraggableItem type="multiple-choices-grid"><FontAwesomeIcon icon={faThLarge}/> Multiple Choices Grid</DraggableItem>

                {/* Contact info fields */}
                <li className="menu-title text-gray-300 mt-3">Contact info fields</li>
                <DraggableItem type="email"><FontAwesomeIcon icon={faEnvelope}/> Email</DraggableItem>
                <DraggableItem type="phone"><FontAwesomeIcon icon={faPhone}/> Phone</DraggableItem>
                <DraggableItem type="address"><FontAwesomeIcon icon={faHome}/> Address</DraggableItem>
                <DraggableItem type="zip-code"><FontAwesomeIcon icon={faMapPin}/> Zip Code</DraggableItem>
                <DraggableItem type="website"><FontAwesomeIcon icon={faGlobe}/> Website</DraggableItem>
            
                {/* Date and time fields */}
                <li className="menu-title text-gray-300 mt-3">Date and time fields</li>
                <DraggableItem type="date"><FontAwesomeIcon icon={faCalendar}/> Date</DraggableItem>
                <DraggableItem type="time"><FontAwesomeIcon icon={faClock}/> Time</DraggableItem>
                <DraggableItem type="date-time"><FontAwesomeIcon icon={faCalendarAlt}/> Date & Time</DraggableItem>
            
                {/* File field */}
                <li className="menu-title text-gray-300 mt-3">File field</li>
                <DraggableItem type="pdf-file-upload"><FontAwesomeIcon icon={faFileUpload}/> PDF File upload</DraggableItem>
                <DraggableItem type="image-upload"><FontAwesomeIcon icon={faImage}/> Image upload</DraggableItem>
            </ul>
        </div>
    )
}

const DraggableItem = ({ children, type }) => {
    return (
        <li className="pl-4 cursor-move-all">
            <Link 
                href="#"
                className="draggable-element"
                draggable={true}
                onDragStart={e => 
                {
                    e.dataTransfer.setData("type", type)
                    e.dataTransfer.effectAllowed = "move";
                }}>
                {children}</Link>
        </li>
    )
}
  