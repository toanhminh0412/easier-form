import { useContext } from "react";

import { JSONTree } from "react-json-tree";

import FormInfoContext from "../../contexts/FormInfoContext";

export default function FormJSONModal({ json="" }) {
    const {formInfo} = useContext(FormInfoContext);

    // Download json into <form_name>.json file
    // This json fill can be used to create the exact form in another project
    const downloadJSON = () => {
        // Strip spaces and replace with underscore and convert to lowercase
        // for the file name
        const formattedFormTitle = formInfo.title.replace(/ /g, "_").toLowerCase();

        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(json)], {type: 'application/json'});
        element.href = URL.createObjectURL(file);
        element.download = `${formattedFormTitle}.json`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
    }

    return (
        <dialog id="form-json-modal" className="modal">
            <div className="modal-box">
                {/* Modal close btn */}
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Form name</h3>
                <p className="py-4">Press ESC key or click outside to close</p>
                <JSONTree data={json} />
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={downloadJSON}>Download JSON</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}