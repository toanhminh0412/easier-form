import { useState, useEffect, useContext } from "react"

import { useSession } from "next-auth/react";

import planData from "@/data/planData";
import FormInfoContext from "../../contexts/FormInfoContext";
import Alert from "@/components/ui/Alert"

export default function SettingsModal() {
    const { formInfo, setFormInfo } = useContext(FormInfoContext);
    const { data: session } = useSession();
    const [currentPlan, setCurrentPlan] = useState(null);

    const [domain, setDomain] = useState(formInfo.domain || formInfo._id);
    const [responsesEmails, setResponsesEmails] = useState(formInfo.responsesEmails && formInfo.responsesEmails.length > 0 ? 
                                                            formInfo.responsesEmails.map(email => ({ email, removable: true }))
                                                            : [{ email: session?.user?.email, removable: false }]);
    const [loading, setLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Get current plan
    useEffect(() => {
        if (session) {
            const plan = planData.find(plan => plan.id === session.user?.plan?.type);
            setCurrentPlan(plan);
        }
    }, [session]);

    // Update current form settings on load
    useEffect(() => {
        setDomain(formInfo.domain || formInfo._id);
        setResponsesEmails(formInfo.responsesEmails && formInfo.responsesEmails.length > 0 ?
                            formInfo.responsesEmails.map(email => ({ email, removable: email !== session?.user?.email }))
                            : [{ email: session?.user?.email, removable: false }]);
    }, [formInfo, session]);

    // Publish form
    const publishForm = async () => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        // Send an AJAX request to set the form domain
        const response = await fetch(`/api/form/${formInfo._id}/save_settings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                domain,
                responsesEmails : responsesEmails.map(email => email.email)
            })
        });

        if (response.ok) {
            console.log("Form settings saved successfully");
            setFormInfo(oldFormInfo => {
                return {
                    ...oldFormInfo,
                    domain,
                    responsesEmails: responsesEmails.map(email => email.email)
                }
            });
            setSuccess(true);
        } else {
            const data = await response.json();
            console.error("Error publishing form");
            setError({ title: "Settings saving error", message: data.error ? data.error : response.statusText });
        }

        setLoading(false);
    }

    const copyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/viewform/${domain}`);
        setCopySuccess(true);
        setTimeout(() => {
            setCopySuccess(false);
        }, 4000);
    }

    return (
        <dialog id="shareModal" className="modal">
            <div className="modal-box max-w-5xl">

                {/* Close button */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h2 className="font-bold text-lg">Settings</h2>

                {/* <div className="mt-4">
                    <Alert type="info" title="Empty domain" message="If domain is left empty, form's id will be used"/>
                </div> */}

                {/* Success message */}
                {success && <div className="mt-4">
                    <Alert type="success" title="Settings saved" message="Settings saves successfully! Your form is now live at the domain that you've entered!"/>
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
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Domain name:</span>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Enter a domain" 
                        className="input input-bordered w-full max-w-xs"
                        value={domain}
                        readOnly={!currentPlan?.customUrl}
                        onChange={e => setDomain(e.target.value)}/>
                    <div className="text-sm text-slate-400 mt-2">Domains must contain only letters (lowercase or uppercase) and numbers. Domains must have between 3-30 characters.</div>
                </label>

                {/* Display the form URL */}
                <div className="mt-4 text-sm">
                    <p>Your form is hosted at:</p>
                    {/* Copy success message */}
                    {copySuccess && <div className="mt-2">
                        <Alert type="success" title="Link copied" message="You can now paste the link anywhere"/>
                    </div>}
                    <div className="bg-base-300 p-4 rounded-lg cursor-pointer mt-2" onClick={copyLink}>{window.location.protocol}&#47;&#47;{window.location.hostname}{window.location.port ? ":" + window.location.port : ""}&#47;viewform&#47;{domain}</div>
                </div>

                {/* Iframe block */}
                <div className="mt-4">
                    <FormIframe domain={domain} />
                </div>

                {/* Responses email block */}
                <div className="mt-4">
                    <ResponsesEmail emails={responsesEmails} setEmails={setResponsesEmails}/>
                </div>

                <div className="modal-action">
                    <button disabled={domain==="" || loading} className="btn btn-primary" onClick={publishForm}>{loading ? "Saving..." : "Save"}</button>
                </div>
            </div>
            
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

const FormIframe = ({ domain }) => {
    const [iframeCode, setIframeCode] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        if (domain) {
            setIframeCode(`<iframe src="${window.location.origin}/viewform/${domain}" width="100%" height="1000px" frameBorder="0"></iframe>`);
        }
    }, [domain]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(iframeCode);
        setCopySuccess(true);
        setTimeout(() => {
            setCopySuccess(false);
        }, 4000);
    }

    return (
        <div>
            <p className="text-sm">Copy and paste the code below to embed the form in your website:</p>
            {copySuccess && <div className="my-2"><Alert type="success" title="Copied to clipboard" message="You can now paste the code in your website" /></div>}
            <div className="bg-base-300 p-4 rounded-lg mt-2 cursor-pointer" onClick={copyToClipboard}>
                <code className="text-xs block whitespace-nowrap overflow-x-auto">{iframeCode}</code>
            </div>
        </div>
    )
}

const ResponsesEmail = ({ emails, setEmails }) => {
    const [email, setEmail] = useState("");

    const addEmail = (e) => {
        e.preventDefault();
        setEmail("");
        setEmails(oldEmails => {
            return [
                ...oldEmails,
                { email, removable: true }
            ]
        });
    }

    const removeEmail = (email) => {
        setEmails(oldEmails => {
            return oldEmails.filter(e => e.email !== email);
        });
    }

    const validateEmail = (email) => {
        // Email cannot be empty
        if (email === "") return false;

        // Email must contain @
        if (!email.includes("@")) return false;

        // Email must contain .
        if (!email.includes(".")) return false;

        // Email shouldn't exist in the emails array
        if (emails.find(e => e.email === email)) return false;

        return true;
    }

    return (
        <div>
            <p className="text-sm">Emails that get notified when a new response is submitted</p>
            <form className="join mt-2 w-full" onSubmit={addEmail}>
                <input 
                    type="email" 
                    placeholder="Enter an email" 
                    className="input input-bordered join-item w-full max-w-xs"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
                <button type="submit" className="btn btn-primary join-item" disabled={!validateEmail(email)}>Add</button>
            </form>
            <div className="text-sm text-slate-400 mt-2">Type out an email and click "Add" or hit Enter to add the email</div>
            <div className="mt-2 flex flex-row gap-2">
                {emails.map(email => email.removable ? (
                    <div key={email.email} className="inline-flex items-center gap-x-0.5 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {email.email}
                        <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-blue-600/20" onClick={() => removeEmail(email.email)}>
                            <span className="sr-only">Remove</span>
                            <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-blue-700/50 group-hover:stroke-blue-700/75">
                                <path d="M4 4l6 6m0-6l-6 6" />
                            </svg>
                            <span className="absolute -inset-1" />
                        </button>
                    </div>
                ) : (
                    <span key={email.email} className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                        {email.email}
                    </span>
                ))}
            </div>
        </div>
    )
}