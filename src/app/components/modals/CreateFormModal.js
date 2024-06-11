import { useState } from "react";
import { useRouter } from "next/navigation";

import Alert from "@/components/ui/Alert";

export default function CreateFormModal() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createForm = async () => {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/form/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const formId = data.formId;
            router.push(`/form/${formId}/edit`);
        } else {
            const error = await response.json();
            setError({ title: "Form creation error", message: error.error });
        }
        setLoading(false);
    }

    return (
        <dialog id="createFormModal" className="modal">
            <div className="modal-box max-w-4xl">
                {/* Close button */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Create a form</h3>
                <div className="mt-2">
                    {error && <Alert type="danger" title={error.title} message={error.message} />}
                </div>
                <p className="py-4">Select how you want to create your amazing form</p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    
                    {/* Create from scratch */}
                    <div className="card min-w-[120px] w-full md:w-1/2 bg-primary border-4 border-info cursor-pointer">
                        <div className="card-body">
                            <h2 className="card-title">Create from scratch</h2>
                            <p>Start from scratch, use your creativity and build your own personal and customized form. Publish for others to use as you wish!</p>
                        </div>
                    </div>

                    {/* Create form a template */}
                    <div className="card min-w-[120px] w-full md:w-1/2 bg-primary opacity-50 cursor-pointer">
                        <div className="card-body">
                            <h2 className="card-title">Use prebuilt templates (Coming soon!)</h2>
                            <p>Use one of our prebuilt professional form templates customized to your specific need so you can start collecting answers with as little effort as possible!</p>
                        </div>
                    </div>

                </div>

                {/* Action buttons */}
                <div className="modal-action">
                    <button 
                        className="btn btn-secondary"
                        onClick={createForm}>
                        {loading ? "Creating form..." : "Create form"}
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}