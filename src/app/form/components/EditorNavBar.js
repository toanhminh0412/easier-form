"use client";

import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import LayoutItemsContext from "@/app/form/contexts/LayoutItemsContext"
import ModeContext from "../contexts/ModeContext";
import SidebarOpenContext from "../contexts/SidebarOpenContext";
import { faEye, faCode, faPen } from "@fortawesome/free-solid-svg-icons"

export default function EditorNavbar() {
    const { layoutItems, setLayoutItems } = useContext(LayoutItemsContext);
    const { mode, setMode } = useContext(ModeContext);
    const { sidebarOpen, setSidebarOpen } = useContext(SidebarOpenContext);

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
            <div className="flex flex-col justify-center h-full">
                <h1 className="text-lg font-medium my-auto px-3 py-2 w-fit h-fit rounded-lg hover:bg-gray-900 cursor-pointer text-white">Form name</h1>
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