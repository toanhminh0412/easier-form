import Link from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faPencil, faAlignLeft, faHashtag, faLock, faCheck, faDotCircle, faList, faToggleOn } from "@fortawesome/free-solid-svg-icons"

export default function Sidebar() {
    return (
        <div className="drawer-side">
            <div className="py-3 px-6 bg-base-300 flex flex-row justify-between">
                <h1 className="text-xl font-semibold w-fit text-white">Add elements</h1>
                <FontAwesomeIcon icon={faXmark} className="my-auto text-xl hover:text-white"></FontAwesomeIcon>
            </div>
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
            <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
                {/* Basic fields */}
                <li className="menu-title text-gray-300">Basic fields</li>
                <DraggableItem type="short-text"><FontAwesomeIcon icon={faPencil}/> Short text</DraggableItem>
                <DraggableItem type="long-text"><FontAwesomeIcon icon={faAlignLeft}/> Long text</DraggableItem>
                <DraggableItem type="number"><FontAwesomeIcon icon={faHashtag}/> Number</DraggableItem>
                <DraggableItem type="password"><FontAwesomeIcon icon={faLock}/> Password</DraggableItem>

                {/* Choice fields */}
                <li className="menu-title text-gray-300">Choice fields</li>
                <DraggableItem type="checkbox"><FontAwesomeIcon icon={faCheck}/> Checkbox</DraggableItem>
                <DraggableItem type="radio"><FontAwesomeIcon icon={faDotCircle}/> Radio</DraggableItem>
                <DraggableItem type="dropdown"><FontAwesomeIcon icon={faList}/> Dropdown</DraggableItem>
                <DraggableItem type="toggle"><FontAwesomeIcon icon={faToggleOn}/> Toggle</DraggableItem>
                {/* <li><Link href="#"><FontAwesomeIcon icon={faToggleOn}/> Toggle</Link></li> */}

                {/* File fields */}
            </ul>
        </div>
    )
}

const DraggableItem = ({ children, type }) => {
    return (
        <li>
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
  