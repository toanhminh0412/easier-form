"use client";

import { useState, useEffect } from "react";

import LayoutItemsContext from "@/contexts/LayoutItemsContext";
import FormActiveItemContext from "@/contexts/FormActiveItem";
import Navbar from "@/components/navbars/Navbar";
import Sidebar from "@/app/form/components/sidebars/Sidebar";
import FormEditorBoard from "./components/FormEditorBoard";
import EditBar from "./components/sidebars/Editbar";

export default function Page() {
    const [layoutItems, setLayoutItems] = useState({
        lg: []
    });
    const [formActiveItem, setFormActiveItem] = useState(null);

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

    return (
        <>
            <Navbar/>
            <LayoutItemsContext.Provider value={{layoutItems, setLayoutItems}}>
                <FormActiveItemContext.Provider value={{formActiveItem, setFormActiveItem}}>
                    <main className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            

                            <div className={`drawer drawer-end ${ formActiveItem ? "drawer-open" : "" } relative w-full`}>
                                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content absolute w-full z-0">
                                    {/* Page content here */}
                                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button fixed bottom-4 left-4 z-40">Open drawer</label>
                                    <FormEditorBoard/>
                                </div> 
                                <EditBar/>
                            </div>
                        </div>
                        <Sidebar/>
                    </main>
                </FormActiveItemContext.Provider>
            </LayoutItemsContext.Provider>
        </>
    );
}
