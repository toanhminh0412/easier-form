"use client";

import { useState, useEffect } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import { rowHeight } from "@/data/gridLayout";
import FormField from "../../form/[formId]/edit/components/formItems/FormField";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Page({ params }) {
    const domain = params.domain;
    const [form, setForm] = useState(null);
    const [loadFormError, setLoadFormError] = useState("");
    const [layoutHeight, setLayoutHeight] = useState(1200);

    // Fetch form data
    useEffect(() => {
        const fetchForm = async () => {
            const response = await fetch(`/api/form/getByDomain?domain=${domain}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setForm(data.form);
            } else {
                setLoadFormError(`${response.status} ${response.error ? response.error : response.statusText}`);
            }
        }
        fetchForm();
    }, []);

    // Give form layout a padding at the bottom
    useEffect(() => {
        if (!form) return;
        updateLayoutHeight(form.layout.lg, 40);
    }, [form]);

    // Maintain a padding at the bottom of the layout 
    const updateLayoutHeight = (layout, paddingBottom) => {
        const maxY = Math.max(...layout.map(item => item.y + item.h));
        setLayoutHeight(maxY * rowHeight + paddingBottom);
    };

    if (!form) {
        if (loadFormError) {
            return (
                <div className="flex justify-center items-center h-[90vh]">
                    <h2 className="text-xl">Error loading form: {loadFormError}</h2>
                </div>
            );
        }
        return (
            <div className="flex justify-center items-center h-[90vh]">
                <h2 className="text-xl">Loading...</h2>
            </div>
        );
    }

    return (
        <main className="relative w-full">
            <div className="relative z-0 overflow-scroll bg-slate-100 lg:px-60 pt-20 min-h-screen">
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
                            className={`layout-item bg-white border-2 border-white cursor-move cursor-move-all hover:z-50`}
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
                            <FormField item={item} />
                        </div>
                    ))}
                </ResponsiveGridLayout>

                {/* Submit button */}
                <div className="w-full mt-8 text-center">
                    <button className="btn btn-primary w-1/2 mx-auto">Submit</button>
                </div>
            </div>
        </main>
    )
}