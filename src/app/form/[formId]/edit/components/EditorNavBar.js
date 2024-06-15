"use client";

import { useContext, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import useOutsideClick from "@/hooks/useOutsideClick";
import LayoutItemsContext from "@/app/form/[formId]/edit/contexts/LayoutItemsContext"
import ModeContext from "../contexts/ModeContext";
import SidebarOpenContext from "../contexts/SidebarOpenContext";
import { faEye, faCode, faPen, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"

export default function EditorNavbar({ form, setForm, savingState }) {
    const { setLayoutItems } = useContext(LayoutItemsContext);
    const { mode, setMode } = useContext(ModeContext);
    const { setSidebarOpen } = useContext(SidebarOpenContext);

    // Preview form by making all layout items static 
    // and hide resize handles
    const previewForm = () => {
        setLayoutItems(oldLayoutItems => {
            return {
                lg: oldLayoutItems.lg.map(item => {
                    return {
                        ...item,
                        static: true,
                        resizeHandles: []
                    }
                })
            }
        });
        setMode("preview");
        setSidebarOpen(false);
    }

    // Edit form by making all layout items draggable
    // and resizable
    const editForm = () => {
        setLayoutItems(oldLayoutItems => {
            return {
                lg: oldLayoutItems.lg.map(item => {
                    return {
                        ...item,
                        static: false,
                        resizeHandles: item.type !== "separator" ? ['sw', 'nw', 'se', 'ne'] : ['e', 'w']
                    }
                })
            }
        });
        setMode("edit");
        setSidebarOpen(true);
    }

    return (
        <div className="sticky top-0 left-0 w-full h-14 bg-neutral px-3 flex flex-row justify-between">

            <div className="flex flex-row gap-10">
                {/* Form title */}
                <FormTitle form={form} setForm={setForm} />

                {/* Display saving state */}
                <div className="flex flex-col justify-center">
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
                </div>
            </div>
            
            
            <div className="flex flex-row gap-2 my-auto">
                <button 
                    className="btn btn-sm btn-primary text-white"
                    onClick={() => {
                        if (mode === "edit") {
                            previewForm();
                        } else {
                            editForm();
                        }
                    }}>
                    {mode === "edit" ?
                        <>
                            <FontAwesomeIcon icon={faEye} />
                            Preview
                        </> :
                        <>
                            <FontAwesomeIcon icon={faPen} />
                            Edit
                        </>
                    }
                </button>
                <button 
                    className="btn btn-sm btn-warning"
                    onClick={()=>document.getElementById('form-json-modal').showModal()}>
                    <FontAwesomeIcon icon={faCode} />
                    View JSON
                </button>
            </div>
        </div>
    )
}

const FormTitle = ({ form, setForm }) => {
    const [mode, setMode] = useState("view");

    const formTitleRef = useRef(null);

    // Close form title input when clicking outside
    useOutsideClick(formTitleRef, () => {
        setMode("view");
    });

    // Save form title when submitting title form
    const saveFormTitle = (e) => {
        e.preventDefault();
        setForm(oldForm => {
            return {
                ...oldForm,
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
                    className="input input-bordered w-full max-w-xs" 
                    defaultValue={form.title}/>
            </form>
        )
    }

    return (
        <div className="flex flex-col justify-center h-full" onClick={() => setMode("edit")}>
            <h1 className="text-lg font-medium my-auto px-3 py-2 w-fit h-fit rounded-lg hover:bg-gray-900 cursor-pointer text-white">{form.title}</h1>
        </div>
    )
}