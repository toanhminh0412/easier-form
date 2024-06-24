"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import FormContext from "./contexts/FormContext";
import ResponsesContext from "./contexts/ResponsesContext";
import ResponsesNavbar from "./components/ResponsesNavbar";
import ResponsesTable from "./components/ResponsesTable";
import ResponsesViewOptionsDropdown from "./components/ResponsesViewOptionsDropdown";


export default function Page({ params }) {
    const formId = params.formId;
    const [form, setForm] = useState(null);
    const [loadFormError, setLoadFormError] = useState("");

    const [responses, setResponses] = useState(null);
    const [loadResponsesError, setLoadResponsesError] = useState("");

    // Fetch form data
    const fetchForm = async () => {
        const response = await fetch(`/api/form/${formId}/get?privilege=edit`);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setForm(data.form);
        } else {
            setLoadFormError(`${response.status} ${response.error ? response.error : response.statusText}`);
        }
    }

    // Fetch responses
    const fetchResponses = async () => {
        const response = await fetch(`/api/form/${formId}/responses/get`);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setResponses(data.responses);
        } else {
            setLoadResponsesError(`${response.status} ${response.error ? response.error : response.statusText}`);
        }
    }
    
    useEffect(() => {
        fetchForm();
        fetchResponses();
    }, []);

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

    if (!responses) {
        if (loadResponsesError) {
            return (
                <div className="flex justify-center items-center h-[90vh]">
                    <h2 className="text-xl">Error loading responses: {loadResponsesError}</h2>
                </div>
            );
        }

        return (
            <div className="flex justify-center items-center h-[90vh]">
                <h2 className="text-xl">Loading responses...</h2>
            </div>
        );
    }

    return (
        <div className="relative pt-14">
            <FormContext.Provider value={{ form, setForm }}>
                <ResponsesContext.Provider value={{ responses }}>
                    <ResponsesNavbar />
                    <main className="relative w-full lg:w-11/12 mx-auto mt-8">
                        <div className="bg-white p-4 border border-gray-300 shadow-sm rounded-md flex flex-col gap-3 md:gap-0 md:flex-row justify-between mb-8">
                            {/* Total responses */}
                            <div className="prose">
                                <h3 className="text-black">{responses.length} response{responses.length > 1 ? "s" : ""}</h3>
                            </div>

                            {/* View responses options */}
                            <div role="tablist" className="tabs tabs-bordered">
                                <Link href="#" role="tab" className="tab tab-active text-black">Table</Link>
                                <Link href="#" role="tab" className="tab text-black">Form</Link>
                            </div>

                            {/* Action buttons */}
                            <ResponsesViewOptionsDropdown/>
                        </div>
                        <ResponsesTable form={form} responses={responses} />
                    </main>
                </ResponsesContext.Provider>
            </FormContext.Provider>
        </div>
    )
}