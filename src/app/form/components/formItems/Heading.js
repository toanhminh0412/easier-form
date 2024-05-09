import React, { useState } from "react";

export default function Heading({ item }) {
    const [text, setText] = useState(item.text);
    const [tag, setTag] = useState(item.tag);

    return (
        <div className="prose">
            <DynamicHeading tag={tag}>{text}</DynamicHeading>
        </div>
    )
}

const DynamicHeading = ({ tag, children }) => {
    const Tag = React.createElement(tag, {className: "text-gray-900"}, children);
    return Tag;
}