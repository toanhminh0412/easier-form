import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href="#">Item 1</Link></li>
                        <li>
                        <Link href="#">Parent</Link>
                        <ul className="p-2">
                            <li><Link href="#">Submenu 1</Link></li>
                            <li><Link href="#">Submenu 2</Link></li>
                        </ul>
                        </li>
                        <li><Link href="#">Item 3</Link></li>
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost text-2xl text-indigo-300 font-semibold">EasierForm</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-x-4">
                    <li><Link href="#">Item 1</Link></li>
                    <li>
                        <details>
                        <summary>Parent</summary>
                        <ul className="p-2">
                            <li><Link href="#">Submenu 1</Link></li>
                            <li><Link href="#">Submenu 2</Link></li>
                        </ul>
                        </details>
                    </li>
                    <li><Link href="#">Item 3</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <Link href="/signin" className="btn btn-primary text-white">Sign in</Link>
            </div>
        </nav>
    )
}