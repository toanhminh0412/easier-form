"use client";

import Link from "next/link";
import { useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import FormInfoContext from "../contexts/FormInfoContext";
import CurrentBreakpointContext from "../contexts/CurrentBreakpointContext";
import useOutsideClick from "@/hooks/useOutsideClick";
import { faLaptop, faTabletScreenButton, faMobileScreenButton, faEye, faCode, faCheck, faXmark, faEllipsis, faShareFromSquare, faComment } from "@fortawesome/free-solid-svg-icons"


export default function EditorNavbar({ savingState }) {
    const { currentBreakpoint, setCurrentBreakpoint } = useContext(CurrentBreakpointContext);
    const { formInfo } = useContext(FormInfoContext);

    return (
        <div className="absolute top-0 left-0 w-full h-14 bg-neutral px-3 flex flex-row justify-between">
            <div className="flex flex-row gap-10">
                {/* Form title */}
                <FormTitle />

                {/* Display saving state */}
                {savingState ? <div className="flex flex-col justify-center">
                    {savingState === "saving" ? 
                    <div className="text-slate-400 text-sm flex flex-row">
                        <span className="loading loading-spinner text-slate-400 loading-sm mr-2"></span>
                        <span>Saving</span>
                    </div> :
                    savingState === "saved" ? <div className="text-green-600 text-sm">
                        <FontAwesomeIcon icon={faCheck} className="mr-2"/>
                        Saved
                    </div> : 
                    <div className="text-red-600 text-sm">
                        <FontAwesomeIcon icon={faXmark} className="mr-2"/>
                        Error saving form
                    </div>}
                </div> : null}
            </div>

            {/* Responsive design options */}
            <div className="flex flex-row items-center">
                <div className={`btn btn-ghost ${currentBreakpoint === "lg" ? "btn-active" : ""} ${window.innerWidth < 1200 ? "btn-disabled" : ""}`} onClick={() => {if (currentBreakpoint !== "lg") { setCurrentBreakpoint("lg") }}}>
                    <FontAwesomeIcon icon={faLaptop} className="text-slate-200 hover:text-white duration-75"/>
                </div>
                <div className={`btn btn-ghost ${currentBreakpoint === "md" ? "btn-active" : ""} ${window.innerWidth < 768 ? "btn-disabled" : ""}`} onClick={() => {if (currentBreakpoint !== "md") { setCurrentBreakpoint("md") }}}>
                    <FontAwesomeIcon icon={faTabletScreenButton} className="text-slate-200 hover:text-white duration-75"/>
                </div>
                <div className={`btn btn-ghost ${currentBreakpoint === "sm" ? "btn-active" : ""}`} onClick={() => {if (currentBreakpoint !== "sm") { setCurrentBreakpoint("sm") }}}>
                    <FontAwesomeIcon icon={faMobileScreenButton} className="text-slate-200 hover:text-white duration-75"/>
                </div>
            </div>

            <div className="flex flex-row gap-3 md:gap-8 my-auto mr-2 md:mr-4">
                {/* Preview button */}
                <Link href={`/viewform/${formInfo.domain}`} target="_blank" className="w-fit h-fit my-auto">
                    <FontAwesomeIcon icon={faEye} className="text-slate-200 hover:text-white duration-75"/> 
                </Link>

                {/* View responses button */}
                <Link href={`/form/${formInfo._id}/responses`} className="w-fit h-fit my-auto">
                    <FontAwesomeIcon icon={faComment} className="text-slate-200 hover:text-white duration-75"/>
                </Link>

                {/* Share button */}
                <div 
                    className="w-fit h-fit my-auto"
                    onClick={() => document.getElementById('shareModal').showModal()}>
                    <FontAwesomeIcon icon={faShareFromSquare} className="text-slate-200 hover:text-white duration-75"/>
                </div>

                {/* More actions */}
                <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="m-1">
                        <FontAwesomeIcon icon={faEllipsis} className="text-slate-200 hover:text-white duration-75"/>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        {/* View JSON button */}
                        <li>
                            <Link href="#" onClick={()=>document.getElementById('form-json-modal').showModal()}>
                                <FontAwesomeIcon icon={faCode} />
                                View JSON
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const FormTitle = () => {
    const { formInfo, setFormInfo } = useContext(FormInfoContext);
    const [mode, setMode] = useState("view");

    const formTitleRef = useRef(null);

    // Close form title input when clicking outside
    useOutsideClick(formTitleRef, () => {
        setMode("view");
    });

    // Save form title when submitting title form
    const saveFormTitle = (e) => {
        e.preventDefault();
        setFormInfo(oldFormInfo => {
            return {
                ...oldFormInfo,
                title: e.target.title.value
            }
        });
        setMode("view");
    }


    if (mode === "edit") {
        return (
            <form 
                className="flex flex-col justify-center h-full"
                ref={formTitleRef}
                onSubmit={saveFormTitle}>
                <input 
                    type="text" 
                    placeholder="Type here"
                    name="title"
                    className="input input-sm md:input-md input-bordered w-full max-w-xs" 
                    defaultValue={formInfo.title}/>
            </form>
        )
    }

    return (
        <div className="flex flex-col justify-center h-full" onClick={() => setMode("edit")}>
            <h1 className="text-base md:text-lg font-medium my-auto px-1 md:px-3 py-2 w-fit h-fit rounded-lg hover:bg-gray-900 cursor-pointer text-white">{formInfo.title}</h1>
        </div>
    )
}