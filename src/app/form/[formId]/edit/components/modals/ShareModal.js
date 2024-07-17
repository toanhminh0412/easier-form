import { useState, useEffect, useContext } from "react"

import { useSession } from "next-auth/react";

import { CopyToClipboard } from "react-copy-to-clipboard";

import planData from "@/data/planData";
import FormInfoContext from "../../contexts/FormInfoContext";
import Alert from "@/components/ui/Alert"

export default function ShareModal() {
    const { formInfo, setFormInfo } = useContext(FormInfoContext);
    const { data: session } = useSession();
    const [currentPlan, setCurrentPlan] = useState(null);

    const [domain, setDomain] = useState(formInfo.domain || formInfo._id);
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Get current plan
    useEffect(() => {
        if (session) {
            const plan = planData.find(plan => plan.id === session.user?.plan?.type);
            setCurrentPlan(plan);
        }
    }, [session]);

    // Update domain when currentDomain changes
    // curretDomain changes when form is loaded
    useEffect(() => {
        setDomain(formInfo.domain || formInfo._id);
    }, [formInfo]);

    // Publish form
    const publishForm = async () => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        // Send an AJAX request to set the form domain
        const response = await fetch(`/api/form/${formInfo._id}/publish`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ domain })
        });

        if (response.ok) {
            console.log("Form published successfully");
            setFormInfo(oldFormInfo => {
                return {
                    ...oldFormInfo,
                    domain
                }
            });
            setSuccess(true);
        } else {
            const data = await response.json();
            console.error("Error publishing form");
            setError({ title: "Publish error", message: data.error ? data.error : response.statusText });
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

                {/* Display an info message explaining if the current plan doesn't allow custom URL */}
                {!currentPlan?.customUrl && <div className="mt-4">
                    <Alert type="info" title="Custom URL not available" message="Custom URL is only available for Small Business and Enterprise plans"/>
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
                        readOnly={!currentPlan?.customUrl}
                        onChange={e => setDomain(e.target.value)}/>
                    <div className="text-xs mt-2">Domains must contain only letters (lowercase or uppercase) and numbers. Domains must have between 3-20 characters.</div>
                </label>

                <div className="mt-4 text-sm">
                    <p>Your form is hosted at:</p>
                    <div className="px-3 py-1 bg-slate-200 text-black rounded-sm mt-2">{window.location.protocol}&#47;&#47;{window.location.hostname}{window.location.port ? ":" + window.location.port : ""}&#47;viewform&#47;{domain}</div>
                    <CopyToClipboard 
                        text={`${window.location.protocol}//${window.location.hostname}${window.location.port ? ":" + window.location.port : ""}/viewform/${domain}`}
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