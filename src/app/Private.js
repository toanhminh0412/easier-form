"use client";

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import FormsContext from "./contexts/FormsContext";
import FormToDeleteContext from "./contexts/FormToDeleteContext";
import Form from "./components/Form";
import CreateFormModal from "@/app/components/modals/CreateFormModal";
import DeleteFormModal from "./components/modals/DeleteFormModal";
import Alert from "@/components/ui/Alert";

export default function Private() {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Track the form that is being deleted
    const [formToDelete, setFormToDelete] = useState(null);

    // Get all forms that this user creates
    useEffect(() => {
        const getForms = async() => {
            // Reset error
            setError(null);

            // Render page loading state
            setLoading(true);
            
            // Fetch forms
            try {
                const response = await fetch('/api/form/getEditables');
                const data = await response.json();
                console.log(data);

                // Display forms if successful, otherwise display error
                if (response.ok) {
                    setForms(data.forms);
                } else {
                    setError({
                        type: "get-forms",
                        title: "Get forms error",
                        message: data.error
                    })
                }
            } catch (error) {
                setError({
                    type: "get-forms",
                    title: "Get forms error",
                    message: `Oops, something went wrong! Please try again or contact us for support at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`
                });
            }

            setLoading(false);
        }

        getForms();
    }, []);

    return (
        <FormsContext.Provider value={{ forms, setForms }}>
            <FormToDeleteContext.Provider value={{ formToDelete, setFormToDelete }}>
                <header className="bg-white shadow-sm border-b border-slate-200">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex flex-row justify-between">
                        <h1 className="text-lg font-semibold leading-6 text-gray-900">Dashboard</h1>
                        <button
                            className='btn btn-primary btn-sm ml-auto'
                            onClick={() => document.getElementById('createFormModal').showModal()}>
                            <FontAwesomeIcon icon={faPlus} />
                            Create form
                        </button>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div>
                            {/* {error && error.type === "get-forms" ? 
                            <Alert type="danger" title={error.title} message={error.message} /> :
                            <ul role="list" className="divide-y divide-gray-100">
                                {forms.map((form) => <Form key={form._id} form={form} />)}
                            </ul>} */}
                            <DashboardBody forms={forms} error={error} loading={loading} />
                        </div>
                    </div>
                </main>
                {/* Form creation modal */}
                <CreateFormModal />
                {/* Form deletion modal */}
                <DeleteFormModal/>
            </FormToDeleteContext.Provider>
        </FormsContext.Provider>
    );
}

const DashboardBody = ({forms, error, loading}) => {
    if (forms.length === 0) {
        if (loading) {
            return (
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p>Loading forms...</p>
                    </div>
                </div>
            );
        } else {
            return <Alert type="warning" title="No forms found" message="You haven't created any forms yet. Click the 'Create form' button above to create a new form." />;
        }
    }

    if (error && error.type === "get-forms") {
        return <Alert type="danger" title={error.title} message={error.message} />;
    }

    return (
        <ul role="list" className="divide-y divide-gray-100">
            {forms.map((form) => <Form key={form._id} form={form} />)}
        </ul>
    );
}