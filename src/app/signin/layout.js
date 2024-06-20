import Navbar from "@/components/navbars/Navbar"

export default function FormLayout({ children }) {
    return (
        <div>
            <Navbar signedIn={false}/>
            {children}
        </div>
    )
}