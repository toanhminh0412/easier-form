"use client";

import { useState, useEffect, useRef } from "react";

import FormInfoContext from "./contexts/FormInfoContext";
import LayoutItemsContext from "@/app/form/[formId]/edit/contexts/LayoutItemsContext";
import CurrentBreakpointContext from "./contexts/CurrentBreakpointContext";
import FormActiveItemContext from "@/app/form/[formId]/edit/contexts/FormActiveItem";
import Sidebar from "@/app/form/[formId]/edit/components/sidebars/Sidebar";
import FormEditorBoard from "./components/FormEditorBoard";
import EditBar from "./components/sidebars/Editbar";
import EditorNavbar from "./components/EditorNavBar";
import SettingsModal from "./components/modals/SettingsModal";
import FormJSONModal from "./components/modals/FormJSONModal";
import FormIframeModal from "./components/modals/FormIframeModal";
import TransferFormModal from "./components/modals/TransferFormModal";
import CopyScreenNotification from "./components/notifications/CopyScreenNotification";

export default function PrivatePage({ formId }) {
    const [form, setForm] = useState(null);
    const [loadFormError, setLoadFormError] = useState("");
    const [formInfo, setFormInfo] = useState(null);
    const [layoutItems, setLayoutItems] = useState({
        lg: [], md: [], sm: []
    });
    const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
    const [formActiveItem, setFormActiveItem] = useState(null);
    const [savingState, setSavingState] = useState("saved");

    const formRef = useRef(null);

    
    // Set current breakpoint by checking the window width
    useEffect(() => {
        // Resizing window
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCurrentBreakpoint("sm");
            } else if (window.innerWidth < 1200) {
                setCurrentBreakpoint("md");
            } else {
                setCurrentBreakpoint("lg");
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    // Fetch form data
    useEffect(() => {
        const fetchForm = async () => {
            const response = await fetch(`/api/form/${formId}/get?privilege=edit`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setForm(data.form);
                const { layout, ...dataFormInfo } = data.form;
                console.log(dataFormInfo);
                setFormInfo(dataFormInfo);
                setLayoutItems({
                    lg: data.form.layout.lg,
                    md: data.form.layout.md ? data.form.layout.md : data.form.layout.lg,
                    sm: data.form.layout.sm ? data.form.layout.sm : data.form.layout.lg
                });
            } else {
                setLoadFormError(`${response.status} ${response.error ? response.error : response.statusText}`);
            }
        }
        fetchForm();
    }, []);

    // If there is a change in form, wait for 3 seconds
    // If there is no new change, save the form
    useEffect(() => {
        if (form) {
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
                
            const timeout = setTimeout(saveForm, 3000);
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

    // Update form when form info changes
    useEffect(() => {
        setForm(oldForm => {
            return {
                ...oldForm,
                ...formInfo
            }
        });
    }, [formInfo]);

    // Changes to the current active item result in changes to the layout items
    useEffect(() => {
        if (formActiveItem) {
            setLayoutItems(oldLayoutItems => {
                return {
                    lg: oldLayoutItems.lg.map(item => {
                        if (item.i === formActiveItem.i) {
                            return {
                                ...formActiveItem,
                                x: item.x,
                                y: item.y,
                                w: item.w,
                                h: item.h
                            }   
                        }
                        return item;
                    }),
                    md: oldLayoutItems.md.map(item => {
                        if (item.i === formActiveItem.i) {
                            return {
                                ...formActiveItem,
                                x: item.x,
                                y: item.y,
                                w: item.w,
                                h: item.h
                            }
                        }
                        return item;
                    }),
                    sm: oldLayoutItems.sm.map(item => {
                        if (item.i === formActiveItem.i) {
                            return {
                                ...formActiveItem,
                                x: item.x,
                                y: item.y,
                                w: item.w,
                                h: item.h
                            }
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
                lg: oldLayoutItems.lg.filter(item => item.i !== formActiveItem.i),
                md: oldLayoutItems.md.filter(item => item.i !== formActiveItem.i),
                sm: oldLayoutItems.sm.filter(item => item.i !== formActiveItem.i)
            }
        });
        setFormActiveItem(null);
    }

    if (!form || !formInfo) {
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
            <FormInfoContext.Provider value={{formInfo, setFormInfo}}>
                <LayoutItemsContext.Provider value={{layoutItems, setLayoutItems}}>
                    <CurrentBreakpointContext.Provider value={{currentBreakpoint, setCurrentBreakpoint}}>
                        <FormActiveItemContext.Provider value={{formActiveItem, setFormActiveItem, deleteActiveItem }}>
                            <EditorNavbar savingState={savingState} formRef={formRef}/>
                            <main className="relative w-full">
                                <div className="relative z-0 max-h-screen overflow-scroll bg-slate-100 lg:px-60">
                                    <FormEditorBoard ref={formRef}/>
                                    <SettingsModal currentDomain={form.domain} formId={formId}/>
                                    <FormJSONModal json={layoutItems}/>
                                    <FormIframeModal/>
                                    <TransferFormModal/>
                                    <CopyScreenNotification currentBreakpoint={currentBreakpoint}/>
                                </div>
                                <EditBar open={formActiveItem !== null}/>
                                <Sidebar/>
                            </main>
                        </FormActiveItemContext.Provider>
                    </CurrentBreakpointContext.Provider>
                </LayoutItemsContext.Provider>
            </FormInfoContext.Provider>
        </div>
    );
}
