"use client";

import { useState, useEffect } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import { readResponseData } from "@/helpers/responses";
import { rowHeight } from "@/data/gridLayout";
import FormField from "../../form/[formId]/edit/components/formItems/FormField";
import Alert from "@/components/ui/Alert";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Page({ params }) {
    const domain = params.domain;
    const [form, setForm] = useState(null);
    const [loadFormError, setLoadFormError] = useState("");
    const [layoutHeight, setLayoutHeight] = useState(1200);

    // State for form submission
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Fetch form data
    useEffect(() => {
        const fetchForm = async () => {
            const response = await fetch(`/api/form/getByDomain?domain=${domain}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setForm(data.form);
            } else {
                const data = await response.json();
                setLoadFormError(`${response.status} - ${data.error ? data.error : response.statusText}`);
            }
        }
        if (!form) {
            fetchForm();
        }
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

    const submitForm = async (e) => {
        e.preventDefault();

        // Ignore form submission by pressing Enter
        if (document.activeElement.type !== "submit") return;

        // Render loading state and hide previous error
        setLoading(true);
        setError(null);

        let responseData = null;
        try {
            responseData = await readResponseData(form);
            console.log(responseData);
        } catch (error) {
            console.error(error);
            setError({
                title: "Error submitting form",
                message: error.message
            });
            setLoading(false);
            return;
        }
        
        // Send response data to the server
        const response = await fetch("/api/response/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                form: form._id,
                data: responseData
            }),
        });

        // Hide loading state
        setLoading(false);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            
            // Render success state
            setSuccess(true);
        } else {
            console.error(`${response.status} ${response.error ? response.error : response.statusText}`);
            
            // Render error state
            setError({
                title: "Error submitting form",
                message: `Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`,
            });
        }
    }

    return (
        <main className="relative w-full">
            <form onSubmit={submitForm} className="relative z-0 overflow-scroll bg-slate-100 lg:px-60 pt-20 pb-20 min-h-screen">
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
                            <FormField item={item} />
                        </div>
                    ))}
                </ResponsiveGridLayout>

                {/* Error alert */}
                {error && <div className="mt-4"><Alert type="danger" title={error.title} message={error.message} /></div>}

                {/* Success alert */}
                {success && <div className="mt-4"><Alert type="success" title="Form submitted successfully!" message="Thank you for your response." /></div>}

                {/* Submit button */}
                <div className="w-full mt-8 text-center">
                    <button disabled={loading || success} type="submit" className="btn btn-primary mx-auto">Submit</button>
                </div>
            </form>
        </main>
    )
}