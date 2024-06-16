"use client";

import { useState, useEffect } from "react";

import LayoutItemsContext from "@/app/form/[formId]/edit/contexts/LayoutItemsContext";
import FormActiveItemContext from "@/app/form/[formId]/edit/contexts/FormActiveItem";
import ModeContext from "./contexts/ModeContext";
import SidebarOpenContext from "./contexts/SidebarOpenContext";
import Sidebar from "@/app/form/[formId]/edit/components/sidebars/Sidebar";
import FormEditorBoard from "./components/FormEditorBoard";
import EditBar from "./components/sidebars/Editbar";
import EditorNavbar from "./components/EditorNavBar";
import FormJSONModal from "./components/modals/FormJSONModal";

export default function PrivatePage({ formId }) {
    const [form, setForm] = useState(null);
    const [loadFormError, setLoadFormError] = useState("");

    const [layoutItems, setLayoutItems] = useState({
        lg: []
    });
    const [formActiveItem, setFormActiveItem] = useState(null);
    const [mode, setMode] = useState("edit");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [savingState, setSavingState] = useState("saved");

    // Fetch form data
    useEffect(() => {
        const fetchForm = async () => {
            const response = await fetch(`/api/form/${formId}/get?privilege=edit`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setForm(data.form);
                setLayoutItems(data.form.layout);
            } else {
                setLoadFormError(`${response.status} ${response.error ? response.error : response.statusText}`);
            }
        }
        fetchForm();
    }, []);

    // If there is a change in form, wait for 1 second
    // If there is no new change, save the form
    useEffect(() => {
        if (form && mode === "edit") {
            setSavingState("saving");
            const saveForm = async () => {
                console.log("Saving form...");
                const response = await fetch(`/api/form/${formId}/save`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                })

                if (response.ok) {
                    console.log("Form saved successfully");
                    setSavingState("saved");
                } else {
                    console.error("Error saving form");
                    setSavingState("error");
                }
            }
                
            const timeout = setTimeout(saveForm, 1000);
            return () => clearTimeout(timeout);
        }
    }, [form]);

    // Update form for saving when layout items change
    useEffect(() => {
        setForm(oldForm => {
            return {
                ...oldForm,
                layout: layoutItems
            }
        });
    }, [layoutItems]);

    // Changes to the current active item result in changes to the layout items
    useEffect(() => {
        if (formActiveItem) {
            setLayoutItems(oldLayoutItems => {
                return {
                    lg: oldLayoutItems.lg.map(item => {
                        if (item.i === formActiveItem.i) {
                            return formActiveItem;
                        }
                        return item;
                    })
                }
            });
        }
    }, [formActiveItem]);

    // Delete currently active item
    const deleteActiveItem = () => {
        setLayoutItems(oldLayoutItems => {
            return {
                lg: oldLayoutItems.lg.filter(item => item.i !== formActiveItem.i)
            }
        });
        setFormActiveItem(null);
    }

    if (!form) {
        if (loadFormError) {
            return (
                <div className="flex justify-center items-center h-[90vh]">
                    <h2 className="text-xl">Error loading form: {loadFormError}</h2>
                </div>
            );
        }
        return (
            <div className="flex justify-center items-center h-[90vh]">
                <h2 className="text-xl">Loading...</h2>
            </div>
        );
    }

    return (
        <div className="relative pt-14">
            <LayoutItemsContext.Provider value={{layoutItems, setLayoutItems}}>
                <FormActiveItemContext.Provider value={{formActiveItem, setFormActiveItem, deleteActiveItem }}>
                    <ModeContext.Provider value={{mode, setMode}}>
                        <SidebarOpenContext.Provider value={{sidebarOpen, setSidebarOpen}}>
                            <EditorNavbar form={form} setForm={setForm} savingState={savingState}/>
                            <main className="relative w-full">
                                <div className="relative z-0 overflow-scroll bg-slate-100 lg:px-60">
                                    <FormEditorBoard/>
                                    <FormJSONModal json={layoutItems}/>
                                </div>
                                <EditBar open={formActiveItem !== null}/>
                                <Sidebar open={sidebarOpen}/>
                            </main>
                        </SidebarOpenContext.Provider>
                    </ModeContext.Provider>
                </FormActiveItemContext.Provider>
            </LayoutItemsContext.Provider>
        </div>
    );
}
