import React from "react";

export default function Heading({ item }) {
    return (
        <div className="prose">
            <DynamicHeading tag={item.tag}>{item.text}</DynamicHeading>
        </div>
    )
}

const DynamicHeading = ({ tag, children }) => {
    const Tag = React.createElement(tag, {className: "text-gray-900"}, children);
    return Tag;
}