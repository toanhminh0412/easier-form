"use client";

import { useState, useEffect } from "react";

import { signOut as NextAuthSignOut, useSession } from "next-auth/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import planData from "@/data/planData";
import FormsContext from "./contexts/FormsContext";
import FormToDeleteContext from "./contexts/FormToDeleteContext";
import Form from "./components/Form";
import CreateFormModal from "@/app/components/modals/CreateFormModal";
import DeleteFormModal from "./components/modals/DeleteFormModal";
import Alert from "@/components/ui/Alert";

export default function Private() {
    const { data: session, update } = useSession();
    const [sessionLoaded, setSessionLoaded] = useState(false);
    const [currentPlanTotalUsage, setCurrentPlanTotalUsage] = useState(null);
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [warning, setWarning] = useState(null);

    // Track the form that is being deleted
    const [formToDelete, setFormToDelete] = useState(null);

    // Update user's current session
    useEffect(() => {
        if (sessionLoaded) {
            update();
        }
    }, [sessionLoaded]);

    // Get the current plan's total usage
    useEffect(() => {
        if (session) {
            setSessionLoaded(true);
        }

        if (session?.user?.plan) {
            const plan = planData.find(plan => plan.id === session.user.plan.type);
            setCurrentPlanTotalUsage(plan);
        }
        
        if (session?.user?.plan.usage.forms === 0) {
            setWarning({
                type: "plan-usage",
                title: "No forms left",
                message: "You have reached the limit of forms you can create. Please upgrade your plan or delete existing forms to create more forms."
            });
        }
    }, [session]);

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
                    if (response.status === 401) {
                        // Sign out if unauthorized
                        await NextAuthSignOut({ redirect: true, callbackUrl: "/signin" });
                    }
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
                            className={`btn ${session?.user?.plan.usage.forms === 0 ? "btn-disabled" : "btn-primary"} btn-sm ml-auto`}
                            onClick={() => document.getElementById('createFormModal').showModal()}>
                            <FontAwesomeIcon icon={faPlus} />
                            Create form
                        </button>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div>
                            <p className="text-sm text-gray-900 mb-4">You have <strong>{session?.user?.plan?.usage.forms} / {currentPlanTotalUsage?.forms}</strong> forms left</p>
                            <DashboardBody forms={forms} error={error} warning={warning} loading={loading} />
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

const DashboardBody = ({forms, error, warning, loading}) => {
    if (error) {
        return <Alert type="danger" title={error.title} message={error.message} />;
    }

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

    return (
        <div>
            {warning && <Alert type="warning" title={warning.title} message={warning.message} />}
            <ul role="list" className="divide-y divide-gray-100">
                {forms.map((form) => <Form key={form._id} form={form} />)}
            </ul>
        </div>
    );
}