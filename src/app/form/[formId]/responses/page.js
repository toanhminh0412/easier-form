"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import FormContext from "./contexts/FormContext";
import ResponsesContext from "./contexts/ResponsesContext";
import ResponsesNavbar from "./components/ResponsesNavbar";
import ResponsesTable from "./components/ResponsesTable";
import ResponsesForm from "./components/ResponsesForm";
import ResponsesViewOptionsDropdown from "./components/ResponsesViewOptionsDropdown";


export default function Page({ params }) {
    const formId = params.formId;
    const [form, setForm] = useState(null);
    const [loadFormError, setLoadFormError] = useState("");

    const [responses, setResponses] = useState(null);
    const [loadResponsesError, setLoadResponsesError] = useState("");
    const [view, setView] = useState("table");
    const [activeResponseFormIndex, setActiveResponseFormIndex] = useState(0);

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
                                <Link href="#" role="tab" className={`tab text-black ${view === "table" ? "tab-active" : ""}`} onClick={() => setView("table")}>Table</Link>
                                <Link href="#" role="tab" className={`tab text-black ${view === "form" ? "tab-active" : ""}`} onClick={() => setView("form")}>Form</Link>
                            </div>

                            {/* Action buttons */}
                            <ResponsesViewOptionsDropdown/>
                        </div>

                        {/* Table view */}
                        <div className={view === "table" ? "" : "hidden"}>
                            <ResponsesTable form={form} responses={responses} />
                        </div>

                        {/* Form view */}
                        <div className={view === "form" ? "" : "hidden"}>
                            <div className="flex flex-row items-center gap-3 mb-4">
                                <button
                                    className="text-gray-500 hover:text-black disabled:text-gray-300 duration-100"
                                    onClick={() => setActiveResponseFormIndex(activeResponseFormIndex - 1)}
                                    disabled={activeResponseFormIndex === 0}
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                                <div className="flex flex-row gap-2 text-black items-center">
                                    <input
                                        type="number"
                                        className="block w-16 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        min={1}
                                        max={responses.length}
                                        value={activeResponseFormIndex + 1}
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                // Prevent users from entering a value smaller than 1 and greater than the number of responses
                                                if (e.target.value < 1) {
                                                    setActiveResponseFormIndex(0);
                                                } else if (e.target.value > responses.length) {
                                                    setActiveResponseFormIndex(responses.length - 1);
                                                } else {
                                                    setActiveResponseFormIndex(e.target.value - 1);             
                                                }
                                            }
                                        }}
                                        />
                                    of { responses.length } responses
                                </div>
                                <button
                                    className="text-gray-500 hover:text-black disabled:text-gray-300 duration-100"
                                    onClick={() => setActiveResponseFormIndex(activeResponseFormIndex + 1)}
                                    disabled={activeResponseFormIndex === responses.length - 1}
                                >
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>
                            <div className={`relative z-0 overflow-scroll bg-slate-50 lg:px-20 pt-8 pb-20 min-h-screen`}>
                                <ResponsesForm form={form} response={responses[activeResponseFormIndex]} />
                            </div>
                        </div>

                    </main>
                </ResponsesContext.Provider>
            </FormContext.Provider>
        </div>
    )
}