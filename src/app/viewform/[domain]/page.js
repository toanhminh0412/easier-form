"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import planData from "@/data/planData";
import { readResponseData } from "@/helpers/responses";
import { rowHeight, breakpoints } from "@/data/gridLayout";
import FormField from "../../form/[formId]/edit/components/formItems/FormField";
import Alert from "@/components/ui/Alert";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Page({ params }) {
    const domain = params.domain;
    const [form, setForm] = useState(null);
    const [loadFormError, setLoadFormError] = useState("");
    const [layoutHeight, setLayoutHeight] = useState(1200);
    const [ownerPlanSpec, setOwnerPlanSpec] = useState(null);
    const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
    const [currentLayout, setCurrentLayout] = useState(null);
    
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
                setOwnerPlanSpec(planData.find(plan => plan.id === data.ownerPlan.type));
                console.log(planData.find(plan => plan.id === data.ownerPlan.type));
            } else {
                const data = await response.json();
                setLoadFormError(`${response.status} - ${data.error ? data.error : response.statusText}`);
            }
        }
        if (!form) {
            fetchForm();
        }
    }, []);

    // Set current breakpoint by checking the window width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCurrentBreakpoint("sm");
            } else if (window.innerWidth < 1200) {
                setCurrentBreakpoint("md");
            } else {
                setCurrentBreakpoint("lg");
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Give form layout a padding at the bottom
    useEffect(() => {
        if (!form) return;

        // Set current layout based on available breakpoints
        const layout = form.layout[currentBreakpoint] ? form.layout[currentBreakpoint] : form.layout.lg;
        setCurrentLayout(layout);

        updateLayoutHeight(layout, 40);
    }, [form, currentBreakpoint]);

    // Maintain a padding at the bottom of the layout 
    const updateLayoutHeight = (layout, paddingBottom) => {
        const maxY = Math.max(...layout.map(item => item.y + item.h));
        setLayoutHeight(maxY * rowHeight + paddingBottom);
    };

    if (!form || !currentLayout) {
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
        console.log(form);
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
            <form onSubmit={submitForm} className="relative z-0 overflow-scroll bg-slate-100 lg:px-60 pt-20 pb-40 min-h-screen">
                <ResponsiveGridLayout 
                    className="layout bg-white shadow-lg w-full"
                    style={{ height: `${layoutHeight}px` }}
                    cols={{ lg: 48, md: 48, sm: 48 }}
                    rowHeight={rowHeight} 
                    breakpoints={breakpoints}
                    margin={[0,0]}
                    layouts={form.layout}
                    autoSize={true}
                    >
                    {currentLayout.map(item => (
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

                {/* Custom branding if current plan enforces */}
                {ownerPlanSpec.branding && (
                    <div className="fixed bottom-0 left-0 right-0 bg-base-100 py-2 px-4 flex flex-row justify-center md:justify-between items-center">
                        <h2 className="text-sm md:text-lg"><span className="md:hidden text-white">Powered by </span><Link href="/" target="_blank" className="text-indigo-300 font-semibold">Easierform</Link></h2>
                        <p className="hidden md:block text-white text-base my-auto text-center">Create your own form - It&apos;s free</p>
                        <Link href="/signin"><button className="hidden md:block btn btn-primary btn-sm">Sign in</button></Link>
                    </div>
                )}
            </form>
        </main>
    )
}