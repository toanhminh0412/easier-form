import SafeHtml from "@/components/SafeHtml"

export default function Paragraph({ item }) {
    return (
        <div>
            <SafeHtml className="text-gray-900 text-sm" htmlContent={item.text}></SafeHtml>
        </div>
    )
}