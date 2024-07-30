import React from "react";

export default function Heading({ item }) {
    const textAlignClass = item.textAlign ? `text-${item.textAlign}` : "text-left";

    return (
        <div className="prose max-w-none">
            <DynamicHeading tag={item.tag} className={`text-gray-900 ${textAlignClass}`}>{item.text}</DynamicHeading>
        </div>
    )
}

const DynamicHeading = ({ tag, children, className="" }) => {
    const Tag = React.createElement(tag, {className: className}, children);
    return Tag;
}