import SafeHtml from "@/components/SafeHtml"

export default function Paragraph({ item }) {
    return (
        <div>
            <SafeHtml className="text-gray-900" htmlContent={item.text}></SafeHtml>
        </div>
    )
}