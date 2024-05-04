import Link from "next/link"

export default function Sidebar() {
    return (
        <div className="drawer-side">
            <div className="py-3 px-6 bg-base-300 flex flex-row justify-between">
                <h1 className="text-xl font-semibold w-fit text-white">Add elements</h1>
                <i className="fa-solid fa-xmark my-auto text-xl hover:text-white"></i>
            </div>
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
            <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
                {/* Basic fields */}
                <li className="menu-title text-gray-300">Basic fields</li>
                <li><Link href="#"><i class="fa-solid fa-pencil"></i> Short text</Link></li>
                <li><Link href="#"><i class="fa-solid fa-align-left"></i> Long text</Link></li>
                <li><Link href="#"><i class="fa-solid fa-hashtag"></i> Number</Link></li>
                <li><Link href="#"><i class="fa-solid fa-lock"></i> Password</Link></li>

                {/* Choice fields */}
                <li className="menu-title text-gray-300">Choice fields</li>
                <li><Link href="#"><i class="fa-solid fa-check"></i> Checkbox</Link></li>
                <li><Link href="#"><i class="fa-solid fa-dot-circle"></i> Radio</Link></li>
                <li><Link href="#"><i class="fa-solid fa-list"></i> Dropdown</Link></li>
                <li><Link href="#"><i class="fa-solid fa-toggle-on"></i> Toggle</Link></li>

                {/* File fields */}
            </ul>
        </div>
    )
  }
  