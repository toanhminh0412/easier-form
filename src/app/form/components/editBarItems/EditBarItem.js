import { useContext } from "react"
import FormActiveItemContext from "@/app/form/contexts/FormActiveItem"

import EditBarBasicTextInput from "./EditBarBasicTextInput"
import EditBarBasicTextInputWithPattern from "./EditBarBasicTextInputWithPattern"
import EditBarBasicHeading from "./EditBarHeading"
import EditBarParagraph from "./EditBarParagraph"
import EditBarImage from "./EditBarImage"
import EditBarSeparator from "./EditBarSeparator"
import EditBarLabelOnly from "./EditBarLabelOnly"
import EditBarDropdown from "./EditBarDropdown"
import EditBarGrid from "./EditBarGrid"
import EditBarLabelDescription from "./EditBarBasicTextInputLabelDescription"

export default function EditBarItem({ item }) {
    const { deleteActiveItem } = useContext(FormActiveItemContext);

    return (
        <div>
            <EditBarEditSection item={item}/>
            <button 
                className="btn btn-sm btn-error mt-6"
                onClick={deleteActiveItem}
                >Delete field</button>
        </div>
    )
}

const EditBarEditSection = ({ item }) => {
    switch (item.type) {
        case "short-text":
        case "long-text":
        case "number":
        case "password":
        case "email":
        case "address":
        case "website":
            return <EditBarBasicTextInput item={item}/>
        case "phone":
        case "zip-code":
            return <EditBarBasicTextInputWithPattern item={item}/>
        case "heading":
            return <EditBarBasicHeading item={item}/>
        case "paragraph":
            return <EditBarParagraph item={item}/>
        case "image":
            return <EditBarImage item={item}/>
        case "separator":
            return <EditBarSeparator item={item}/>
        case "checkbox":
        case "toggle":
            return <EditBarLabelOnly item={item}/>
        case "dropdown":
        case "radio":
        case "multiple-choices":
            return <EditBarDropdown item={item}/>
        case "single-choice-grid":
        case "multiple-choices-grid":
            return <EditBarGrid item={item}/>
        case "date":
        case "time":
        case "date-time":
        case "pdf-file-upload":
        case "image-upload":
            return <EditBarLabelDescription item={item}/>
        default:
            return <p>Unknown item</p>
    }
}