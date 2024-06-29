"use client";

import { useState, useEffect } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import { rowHeight } from "@/data/gridLayout";
import FormField from "../../edit/components/formItems/FormField";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function ResponsesForm({ form, response }) {
    const [layoutHeight, setLayoutHeight] = useState(1200);

    // An object that store field id as key, and field value as value
    const [fieldResponses, setFieldResponses] = useState({});

    // Give form layout a padding at the bottom
    useEffect(() => {
        if (!form) return;
        updateLayoutHeight(form.layout.lg, 40);
    }, [form]);

    // Populate fieldResponses with field id and value
    useEffect(() => {
        if (!response) return;
        const fieldResponses = {};
        for (const field of form.layout.lg) {
            const fieldResponse = response.data.find(f => f.id === field.i);
            if (fieldResponse) {
                fieldResponses[field.i] = fieldResponse.value;
            } else {
                // If there is no response for this field, look for response with the same label
                const fieldResponseWithSameLabel = response.data.find(f => f.label === field.label);
                if (fieldResponseWithSameLabel && fieldResponseWithSameLabel.type === field.type) {
                    fieldResponses[field.i] = fieldResponseWithSameLabel.value;
                }
            }
        }
        setFieldResponses(fieldResponses);
    }, [response]);

    // Maintain a padding at the bottom of the layout 
    const updateLayoutHeight = (layout, paddingBottom) => {
        const maxY = Math.max(...layout.map(item => item.y + item.h));
        setLayoutHeight(maxY * rowHeight + paddingBottom);
    };

    return (
        <ResponsiveGridLayout 
            className="layout bg-white shadow-lg w-full"
            style={{ height: `${layoutHeight}px` }}
            cols={{ lg: 48, md: 48, sm: 48, xs: 48, xxs: 48}}
            rowHeight={rowHeight} 
            breakpoints={{ lg: 2000, md: 1300, sm: 900, xs: 500, xxs: 0 }}
            margin={[0,0]}
            layouts={form.layout}
            autoSize={true}
            >
            {form.layout.lg.map(item => (
                <div 
                    key={item.i} 
                    className={`layout-item bg-white border-2 border-white hover:z-50`}
                    data-grid={{
                        x: item.x,
                        y: item.y,
                        w: item.w,
                        h: item.h,
                        minW: item.minW,
                        minH: item.minH,
                        static: true,
                    }}
                    >
                    <FormField item={item} value={fieldResponses[item.i]} readOnly={true}/>
                </div>
            ))}
        </ResponsiveGridLayout>
    )
}