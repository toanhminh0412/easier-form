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
import MultipleChoicesGrid from "./MultipleChoidesGrid";
import Email from "./Email";
import Phone from "./Phone";
import Address from "./Address";
import Zipcode from "./Zipcode";
import Website from "./Website";
import Date from "./Date";
import Time from "./Time";
import DateTime from "./DateTime";

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
        case "multiple-choices-grid":
            return <MultipleChoicesGrid item={item}/>
        case "email":
            return <Email item={item}/>
        case "phone":
            return <Phone item={item}/>
        case "address":
            return <Address item={item}/>
        case "zip-code":
            return <Zipcode item={item}/>
        case "website":
            return <Website item={item}/>
        case "date":
            return <Date item={item}/>
        case "time":
            return <Time item={item}/>
        case "date-time":
            return <DateTime item={item}/>

        default:
            return <div>Unknown item type</div>;
    }
}