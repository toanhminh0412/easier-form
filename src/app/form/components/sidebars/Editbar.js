import { useContext } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import gridItemTypes from "@/data/gridItemTypes"
import FormActiveItemContext from "@/contexts/FormActiveItem"
import EditBarItem from "../editBarItems/EditBarItem"

export default function EditBar() {
    const { formActiveItem, setFormActiveItem } = useContext(FormActiveItemContext);

    return (
        <div className="drawer-side absolute top-0 right-0 z-40">
            <div className="py-3 px-6 bg-base-100 flex flex-row justify-between border-b border-t border-gray-600">
                <h1 className="text-md font-semibold w-fit text-white">{formActiveItem ? gridItemTypes[formActiveItem.type] : null}</h1>
                <FontAwesomeIcon 
                    icon={faXmark} 
                    className="my-auto text-xl hover:text-white"
                    onClick={() => setFormActiveItem(null)}></FontAwesomeIcon>
            </div>
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-96 min-h-full bg-base-200 text-base-content">
                {formActiveItem ? <EditBarItem item={formActiveItem}/> : null}
            </ul>
        </div>
    )
}