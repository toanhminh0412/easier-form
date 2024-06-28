import Link from "next/link";
import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import FormContext from "../contexts/FormContext"

export default function ResponsesNavbar() {
    const { form } = useContext(FormContext);

    return (
        <div className="absolute top-0 left-0 w-full h-14 bg-neutral px-3 flex flex-row justify-between">
            <Link href={`/form/${form._id}/edit`} className="flex flex-col justify-center h-full">
                <h1 className="text-base md:text-lg font-medium my-auto px-1 md:px-3 py-2 w-fit h-fit rounded-lg hover:bg-gray-900 cursor-pointer text-white">{form.title}</h1>
            </Link>

            {/* Edit form button */}
            <Link href={`/form/${form._id}/edit`} className="w-fit h-fit my-auto text-sm mr-3 text-slate-200 hover:text-white">
                <FontAwesomeIcon icon={faPen} className="duration-75 mr-2"/>
                Edit form
            </Link>
        </div>
    )
}