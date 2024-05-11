import EditBarTextInput from "./EditBarTextInput"
import EditBarTextarea from "./EditBarTextArea"

export default function EditBarItem({ item }) {
    switch (item.type) {
        case "short-text":
            return <EditBarTextInput item={item}/>
        case "long-text":
            return <EditBarTextarea item={item}/>
        default:
            return <p>Unknown item</p>
    }
}