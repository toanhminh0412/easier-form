import Showcase from "./Showcase"
import forms from "@/data/landing/demoForms"

export default function ShortExamples() {
    return <Showcase forms={forms.slice(0, 6)} />
}