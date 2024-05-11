"use client";

import { useState } from "react";

import LayoutItemsContext from "@/contexts/LayoutItemsContext";
import FormActiveItemContext from "@/contexts/FormActiveItem";
import Navbar from "@/components/navbars/Navbar";
import Sidebar from "@/components/navbars/Sidebar";
import FormEditorBoard from "./components/FormEditorBoard";

export default function Page() {
    const [layoutItems, setLayoutItems] = useState({
        lg: []
    });
    const [formActiveItem, setFormActiveItem] = useState(null);

    return (
        <>
            <Navbar/>
            <LayoutItemsContext.Provider value={{layoutItems, setLayoutItems}}>
                <FormActiveItemContext.Provider value={{formActiveItem, setFormActiveItem}}>
                    <main className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            

                            <div className={`drawer drawer-end relative ${ formActiveItem ? "drawer-open" : "" }`}>
                                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content">
                                    {/* Page content here */}
                                    {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button">Open drawer</label> */}
                                    <FormEditorBoard/>
                                </div> 
                                <div className="drawer-side absolute top-0 right-0">
                                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                        {/* Sidebar content here */}
                                        <li><a>Sidebar Item 1</a></li>
                                        <li><a>Sidebar Item 2</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <Sidebar/>
                    </main>
                </FormActiveItemContext.Provider>
            </LayoutItemsContext.Provider>
        </>
    );
}
