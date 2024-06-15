import Link from "next/link";
import { useContext } from "react";

import FormToDeleteContext from "../contexts/FormToDeleteContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { timeAgo } from "@/helpers/datetime";

export default function Form({ form }) {
    const { setFormToDelete } = useContext(FormToDeleteContext);

    return (
        <li className="flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                    <Link href={`/form/${form._id}/edit`} className="text-sm font-semibold leading-6 text-gray-900">{form.title}</Link>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="whitespace-nowrap">
                        Last updated: {timeAgo(form.lastUpdated)}
                    </p>
                    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                        <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p className="truncate">Created by {form.createdBy}</p>
                </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
                <Link href={`/form/${form._id}/edit`}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                View form<span className="sr-only">, {form.name}</span>
                </Link>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white text-black text-xs rounded-md border border-slate-100 w-52">
                        <li><Link href={`/form/${form._id}/edit`}>
                            <FontAwesomeIcon icon={faPen} />
                            Edit form
                        </Link></li>
                        <li><Link href="#" onClick={() => {
                            setFormToDelete(form);
                            document.getElementById('deleteFormModal').showModal();
                        }}>
                            <FontAwesomeIcon icon={faTrashCan} />
                            Delete form
                        </Link></li>
                    </ul>
                </div>
            </div>
        </li>
    )
}