"use client";

import { useState, useEffect } from "react";

import FormContext from "./contexts/FormContext";
import ResponsesNavbar from "./components/ResponsesNavbar";
import ResponsesTable from "./components/ResponsesTable";

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
                <ResponsesNavbar />
                <main className="relative w-full lg:w-11/12 mx-auto mt-8">
                    <div className="prose mb-8">
                        <h1 className="text-black">{responses.length} response{responses.length > 1 ? "s" : ""}</h1>
                    </div>
                    <ResponsesTable form={form} responses={responses} />
                </main>
            </FormContext.Provider>
        </div>
    )
}