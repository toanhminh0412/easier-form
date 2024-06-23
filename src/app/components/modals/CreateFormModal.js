import { useState } from "react";
import { useRouter } from "next/navigation";

import Alert from "@/components/ui/Alert";
import CreateFormOptions from "./CreateFormOptions";

export default function CreateFormModal() {
    const router = useRouter();

    const [selectedOption, setSelectedOption] = useState('scratch');
    const [jsonFileContent, setJsonFileContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Create a new form
    const createForm = async () => {
        setLoading(true);
        setError(null);

        // Create a blank form
        if (selectedOption === 'scratch') {
            const response = await fetch(`/api/form/create?type=${selectedOption}`, {
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
        } 
        
        // Create a form from a JSON file
        // The new form will have fields that are specified in the JSON file
        else if (selectedOption === 'json') {
            const response = await fetch(`/api/form/create?type=${selectedOption}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ layout: jsonFileContent })
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
        } else {
            console.error('Invalid form creation option:', selectedOption);
        }
        setLoading(false);
    }

    // Upload a JSON file for import
    const uploadJsonFile = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    setJsonFileContent(json);
                    console.log('File content:', json);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            };
            reader.readAsText(file);
        } else {
            console.error('Please upload a valid JSON file.');
        }
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

                <CreateFormOptions selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>

                <label className={`form-control w-full max-w-xs ${selectedOption !== 'json' ? 'hidden' : ''}`}>
                    <div className="label">
                        <span className="label-text">Upload your JSON file</span>
                    </div>
                    <input 
                        type="file"
                        accept="application/json"
                        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                        onChange={uploadJsonFile}/>
                </label>

                {/* Action buttons */}
                <div className="modal-action">
                    <button 
                        className="btn btn-secondary"
                        onClick={createForm}
                        disabled={selectedOption === 'json' && !jsonFileContent}>
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