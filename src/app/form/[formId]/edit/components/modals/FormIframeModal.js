"use client";

import { useState, useContext, useEffect } from "react";

import FormInfoContext from "../../contexts/FormInfoContext";
import Alert from "@/components/ui/Alert";

export default function FormIframeModal() {
    const { formInfo } = useContext(FormInfoContext);
    const [iframeCode, setIframeCode] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        if (formInfo.domain) {
            setIframeCode(`<iframe src="${window.location.origin}/viewform/${formInfo.domain}" width="100%" height="1000px" frameBorder="0"></iframe>`);
        }
    }, [formInfo]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(iframeCode);
        setCopySuccess(true);
        setTimeout(() => {
            setCopySuccess(false);
        }, 4000);
    }

    return (
        <dialog id="iframeModal" className="modal">
            <div className="modal-box">

                {/* Close button */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <h2 className="text-lg font-bold">Embed form</h2>
                <p className="text-sm text-slate-400 mt-3">Copy and paste the code below to embed the form in your website</p>
                {copySuccess && <div className="my-2"><Alert type="success" title="Copied to clipboard" message="You can now paste the code in your website" /></div>}
                <div className="bg-base-300 p-4 rounded-lg mt-4">
                    <code className="text-xs block whitespace-nowrap overflow-x-auto">{iframeCode}</code>
                </div>
                <div className="modal-action">
                    <button onClick={copyToClipboard} className="btn btn-primary mt-4">Copy to clipboard</button>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}