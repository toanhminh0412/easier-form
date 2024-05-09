import { useState } from "react";

export default function Paragraph({ item }) {
    const [text, setText] = useState(item.text);

    return (
        <div className="prose">
            <p className="text-gray-900">{text}</p>
        </div>
    )
}