import { useState } from "react";

export default function Image({ item }) {
    const [src, setSrc] = useState(item.src);

    return (
        <div className="bg-cover bg-center w-full h-full" style={{ backgroundImage: `url("${item.src}")` }}></div>
    )
}