import EditBarBasicTextInput from "./EditBarBasicTextInput"
import EditBarBasicHeading from "./EditBarHeading"
import EditBarParagraph from "./EditBarParagraph"
import EditBarImage from "./EditBarImage"
import EditBarSeparator from "./EditBarSeparator"
import EditBarLabelOnly from "./EditBarLabelOnly"
import EditBarDropdown from "./EditBarDropdown"
import EditBarGrid from "./EditBarGrid"

export default function EditBarItem({ item }) {
    switch (item.type) {
        case "short-text":
        case "long-text":
        case "number":
        case "password":
            return <EditBarBasicTextInput item={item}/>
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
        default:
            return <p>Unknown item</p>
    }
}