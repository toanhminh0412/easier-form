import Link from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faPencil, faAlignLeft, 
    faHashtag, faLock, faCheck, faDotCircle,
    faList, faToggleOn, faHeading, faParagraph,
    faImage, faMinus, faTasks, faThList
} from "@fortawesome/free-solid-svg-icons"

export default function Sidebar() {
    return (
        <div className="drawer-side">
            <div className="py-3 px-6 bg-base-100 flex flex-row justify-between border-b border-t border-gray-600">
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

                {/* Decorative fields */}
                <li className="menu-title text-gray-300">Decorative fields</li>
                {/* Includes Heading, paragraph, image, separator. Provide a FontAwesomeIcon for each */}
                <DraggableItem type="heading"><FontAwesomeIcon icon={faHeading}/> Heading</DraggableItem>
                <DraggableItem type="paragraph"><FontAwesomeIcon icon={faParagraph}/> Paragraph</DraggableItem>
                <DraggableItem type="image"><FontAwesomeIcon icon={faImage}/> Image</DraggableItem>
                <DraggableItem type="separator"><FontAwesomeIcon icon={faMinus}/> Separator</DraggableItem>

                {/* Choice fields */}
                <li className="menu-title text-gray-300">Choice fields</li>
                <DraggableItem type="checkbox"><FontAwesomeIcon icon={faCheck}/> Checkbox</DraggableItem>
                <DraggableItem type="toggle"><FontAwesomeIcon icon={faToggleOn}/> Toggle</DraggableItem>
                <DraggableItem type="dropdown"><FontAwesomeIcon icon={faList}/> Dropdown</DraggableItem>
                <DraggableItem type="radio"><FontAwesomeIcon icon={faDotCircle}/> Single Choice</DraggableItem>
                <DraggableItem type="multiple-choices"><FontAwesomeIcon icon={faTasks}/> Multiple Choices</DraggableItem>
                <DraggableItem type="single-choice-grid"><FontAwesomeIcon icon={faThList}/> Single Choice Grid</DraggableItem>

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
  