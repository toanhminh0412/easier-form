import Navbar from "../navbars/Navbar";

export default function LoggedInLayout({ children }) {
    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}