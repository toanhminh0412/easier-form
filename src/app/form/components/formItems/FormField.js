import TextInput from "./TextInput";
import Textarea from "./Textarea";
import Number from "./Number";
import Password from "./Password";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Image from "./Image";
import Separator from "./Separator";
import Checkbox from "./Checkbox";
import Toggle from "./Toggle";
import Dropdown from "./Dropdown";
import Radio from "./Radio";
import MultipleChoices from "./MultipleChoices";
import SingleChoiceGrid from "./SingleChoideGrid";

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
        case "toggle":
            return <Toggle item={item}/>
        case "dropdown":
            return <Dropdown item={item}/>
        case "radio":
            return <Radio item={item}/>
        case "multiple-choices":
            return <MultipleChoices item={item}/>
        case "single-choice-grid":
            return <SingleChoiceGrid item={item}/>

        default:
            return <div>Unknown item type</div>;
    }
}