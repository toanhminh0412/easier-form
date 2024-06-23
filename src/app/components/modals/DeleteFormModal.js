import { useState, useContext } from "react";

import FormsContext from "@/app/contexts/FormsContext";
import FormToDeleteContext from "@/app/contexts/FormToDeleteContext";
import Alert from "@/components/ui/Alert";

export default function DeleteFormModal() {
    const { setForms } = useContext(FormsContext);
    const { formToDelete, setFormToDelete } = useContext(FormToDeleteContext);
    const [error, setError] = useState(null);

    const deleteForm = async () => {
        setError(null);
        const response = await fetch(`/api/form/${formToDelete._id}/delete`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setForms(prevForms => prevForms.filter(f => f._id !== formToDelete._id));
            
            // Close the modal
            document.getElementById('deleteFormModal').close();
            setFormToDelete(null);
        } else {
            const error = await response.json();
            setError({ title: "Form deletion error", message: error.error });
        }
    }

    return (
        <dialog id="deleteFormModal" className="modal">
            <div className="modal-box">
                {/* Close button */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Delete form</h3>
                <div className="mt-2">
                    {error && <Alert type="danger" title={error.title} message={error.message} />}
                </div>
                {formToDelete ? 
                    <div>
                        <p className="py-4">Are you sure you want to delete <strong>{formToDelete.title}</strong> form?</p>
                        <p><strong>Note: </strong>Delete this form will delete all responses that are associated it.</p>
                    </div>
                    : <p className="py-4">Loading...</p>}
                <div className="modal-action">
                    <button
                        className="btn btn-error"
                        onClick={() => deleteForm()}>
                        Delete
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => document.getElementById('deleteFormModal').close()}>
                        Cancel
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}