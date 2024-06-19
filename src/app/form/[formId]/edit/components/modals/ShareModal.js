import { useState, useEffect } from "react"

import { CopyToClipboard } from "react-copy-to-clipboard";

import Alert from "@/components/ui/Alert"

export default function ShareModal({ currentDomain, formId }) {
    const [domain, setDomain] = useState(currentDomain);
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Update domain when currentDomain changes
    // curretDomain changes when form is loaded
    useEffect(() => {
        setDomain(currentDomain);
    }, [currentDomain]);

    // Publish form
    const publishForm = async () => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        // Send an AJAX request to set the form domain
        const response = await fetch(`/api/form/${formId}/publish`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ domain })
        });

        if (response.ok) {
            console.log("Form published successfully");
            setSuccess(true);
        } else {
            console.error("Error publishing form");
            setError({ title: "Publish error", message: response.error ? response.error : response.statusText });
        }

        setLoading(false);
    }

    return (
        <dialog id="shareModal" className="modal">
            <div className="modal-box">

                {/* Close button */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h2 className="font-bold text-lg">Share form with others</h2>

                {/* <div className="mt-4">
                    <Alert type="info" title="Empty domain" message="If domain is left empty, form's id will be used"/>
                </div> */}

                {/* Success message */}
                {success && <div className="mt-4">
                    <Alert type="success" title="Form published" message="Your form is now live at the domain below!"/>
                </div>}

                {/* Error message */}
                {error && <div className="mt-4">
                    <Alert type="danger" title={error.title} message={error.message} />
                </div>}

                {/* Domain */}
                <label className="form-control w-full max-w-xs mt-2">
                    <div className="label">
                        <span className="label-text">Domain name:</span>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Enter a domain" 
                        className="input input-sm input-bordered w-full max-w-xs"
                        value={domain}
                        onChange={e => setDomain(e.target.value)}/>
                </label>

                <div className="mt-4 text-sm">
                    <p>Your form is hosted at:</p>
                    <div className="px-3 py-1 bg-slate-200 text-black rounded-sm mt-2">{window.location.protocol}//{window.location.hostname}/form/{domain}</div>
                    <CopyToClipboard 
                        text={`${window.location.protocol}//${window.location.hostname}/form/${domain}`}
                        onCopy={() => console.log(`copied: ${domain}`)}>
                        <button className="btn btn-secondary btn-sm mt-2 ml-auto">Copy link</button>
                    </CopyToClipboard>
                </div>

                <div className="modal-action">
                    <button disabled={domain==="" || loading} className="btn btn-primary" onClick={publishForm}>{loading ? "Publishing..." : "Publish"}</button>
                </div>
            </div>
            
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}