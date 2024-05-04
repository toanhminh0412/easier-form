import Navbar from "@/components/navbars/Navbar";
import Sidebar from "@/components/navbars/Sidebar";
import FormEditorBoard from "./components/FormEditorBoard";

export default function Page() {
    return (
        <>
            <Navbar/>
            
            <main className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button">Open drawer</label> */}
                    <FormEditorBoard/>
                </div>
                <Sidebar/>
            </main>
        </>
    );
}
