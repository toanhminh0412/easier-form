import { JSONTree } from "react-json-tree";

export default function FormJSONModal({ json="" }) {
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
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}