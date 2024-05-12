import EditBarBasicTextInput from "./EditBarBasicTextInput"
import EditBarBasicHeading from "./EditBarHeading"
import EditBarParagraph from "./EditBarParagraph"

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
        default:
            return <p>Unknown item</p>
    }
}