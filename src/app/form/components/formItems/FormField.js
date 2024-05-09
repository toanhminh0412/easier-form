import TextInput from "./TextInput";
import Textarea from "./Textarea";
import Number from "./Number";
import Password from "./Password";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Image from "./Image";
import Separator from "./Separator";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Dropdown from "./Dropdown";
import Toggle from "./Toggle";

export default function FormField({ item }) {
    switch (item.type) {
        case "short-text":
            return <TextInput item={item}/>
        case "long-text":
            return <Textarea item={item}/>
        case "number":
            return <Number item={item}/>
        case "password":
            return <Password item={item}/>
        case "heading":
            return <Heading item={item}/>
        case "paragraph":
            return <Paragraph item={item}/>
        case "image":
            return <Image item={item}/>
        case "separator":
            return <Separator item={item}/>
        case "checkbox":
            return <Checkbox item={item}/>
        case "radio":
            return <Radio item={item}/>
        case "dropdown":
            return <Dropdown item={item}/>
        case "toggle":
            return <Toggle item={item}/>
        default:
            return <div>Unknown item type</div>;
    }
}