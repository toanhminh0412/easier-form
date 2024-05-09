import { useState } from "react";

export default function Separator({ item }) {
    const [lineWidth, setLineWidth] = useState(item.lineWidth);

    return (
        <div className="border-t border-gray-900 w-full" style={{ borderWidth: lineWidth }}></div>
    )
}