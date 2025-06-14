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
import PDFFileUpload from "./PDFFileUpload";
import ImageUpload from "./ImageUpload";

export default function FormField({ item, value, edit=false, readOnly=false }) {
    switch (item.type) {
        case "short-text":
            return <TextInput item={item} value={value} readOnly={readOnly}/>
        case "long-text":
            return <Textarea item={item} value={value} readOnly={readOnly}/>
        case "number":
            return <Number item={item} value={value} readOnly={readOnly}/>
        case "password":
            return <Password item={item} value={value} readOnly={readOnly}/>
        case "heading":
            return <Heading item={item}/>
        case "paragraph":
            return <Paragraph item={item}/>
        case "image":
            return <Image item={item}/>
        case "separator":
            return <Separator item={item}/>
        case "checkbox":
            return <Checkbox item={item} value={value} readOnly={readOnly}/>
        case "toggle":
            return <Toggle item={item} value={value} readOnly={readOnly}/>
        case "dropdown":
            return <Dropdown item={item} value={value} readOnly={readOnly}/>
        case "radio":
            return <Radio item={item} value={value} readOnly={readOnly}/>
        case "multiple-choices":
            return <MultipleChoices item={item} value={value} readOnly={readOnly}/>
        case "single-choice-grid":
            return <SingleChoiceGrid item={item} value={value} readOnly={readOnly}/>
        case "multiple-choices-grid":
            return <MultipleChoicesGrid item={item} value={value} readOnly={readOnly}/>
        case "email":
            return <Email item={item} value={value} readOnly={readOnly}/>
        case "phone":
            return <Phone item={item} value={value} readOnly={readOnly}/>
        case "address":
            return <Address item={item} value={value} readOnly={readOnly}/>
        case "zip-code":
            return <Zipcode item={item} value={value} readOnly={readOnly}/>
        case "website":
            return <Website item={item} value={value} readOnly={readOnly}/>
        case "date":
            return <Date item={item} value={value} readOnly={readOnly}/>
        case "time":
            return <Time item={item} value={value} readOnly={readOnly}/>
        case "date-time":
            return <DateTime item={item} value={value} readOnly={readOnly}/>
        case "pdf-file-upload":
            return <PDFFileUpload item={item} value={value} edit={edit} readOnly={readOnly}/>
        case "image-upload":
            return <ImageUpload item={item} value={value} edit={edit} readOnly={readOnly}/>

        default:
            return <div>Unknown item type</div>;
    }
}