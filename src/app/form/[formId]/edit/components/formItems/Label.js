"use client";

import { useState, useEffect } from "react";

export default function Label({ label }) {
    // Label with spaces replaced by hyphens and lowercased
    const [processedLabel, setProcessedLabel] = useState(label.replace(/\s+/g, '-').toLowerCase());

    useEffect(() => {
        setProcessedLabel(label.replace(/\s+/g, '-').toLowerCase());
    }, [label]);

    return (
        <label htmlFor={processedLabel} className="block text-sm font-medium leading-6 text-gray-900">
            {label}
        </label>
    );
}