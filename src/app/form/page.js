"use client";

import { useState } from "react";

import LayoutItemsContext from "@/contexts/LayoutItemsContext";
import Navbar from "@/components/navbars/Navbar";
import Sidebar from "@/components/navbars/Sidebar";
import FormEditorBoard from "./components/FormEditorBoard";

export default function Page() {
    const [layoutItems, setLayoutItems] = useState({
        lg: []
    });

    return (
        <>
            <Navbar/>
            <LayoutItemsContext.Provider value={{layoutItems, setLayoutItems}}>
                <main className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button">Open drawer</label> */}
                        <FormEditorBoard/>
                    </div>
                    <Sidebar/>
                </main>
            </LayoutItemsContext.Provider>
        </>
    );
}
