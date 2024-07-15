import Image from "next/image";
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import FilesManagerModal from "@/components/modals/FilesManagerModal";

export default function Profile() {
    const { data: session, update } = useSession();
    const [state, setState] = useState("view");
    const [previewImageSrc, setPreviewImageSrc] = useState(session?.user?.image);

    useEffect(() => {
        setPreviewImageSrc(session?.user?.image);
    }, [session]);

    const previewImage = (src) => {
        setPreviewImageSrc(src);
        document.getElementById('filesManager').close();
    }

    const updateProfile = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const image = e.target.image.value;
        const response = await fetch("/api/user/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, image })
        });

        if (response.ok) {
            const data = await response.json();
            update();
            setState("view");
        } else {
            console.error("Error updating profile");
        }
    }

    if (!session) {
        return <h1>Loading...</h1>
    }

    if (state === "edit") {
        return (
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div>
                    <div className="flex justify-between">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Profile</h2>
                    </div>
                    <form className="mt-6 space-y-6 divide-y divide-gray-200" onSubmit={updateProfile}>
                        <div className="pt-6 sm:flex">
                            <div className="sm:w-64 sm:flex-none sm:pr-6">
                                <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-900 sm:mt-px">Full name</label>
                            </div>
                            <div className="mt-1 sm:mt-0 sm:flex-auto sm:min-w-0">
                                <input 
                                    id="name" 
                                    name="name" 
                                    type="text"
                                    required
                                    defaultValue={session?.user?.name} 
                                    className="block w-full shadow-sm text-black sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"/>
                            </div>
                        </div>
                        <div className="pt-6 sm:flex">
                            <div className="sm:w-64 sm:flex-none sm:pr-6">
                                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-900 sm:mt-px">Email address</label>
                            </div>
                            <div className="mt-1 sm:mt-0 sm:flex-auto sm:min-w-0">
                                {/* <input id="email" name="email" type="email" required className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"/> */}
                                <div className="text-gray-900">{session?.user?.email}</div>
                            </div>
                        </div>
                        <div className="pt-6 sm:flex">
                            <div className="sm:w-64 sm:flex-none sm:pr-6">
                                <label htmlFor="image" className="block text-sm font-medium leading-5 text-gray-900 sm:mt-px">Image</label>
                            </div>
                            <div className="mt-1 sm:mt-0 sm:flex-auto sm:min-w-0">
                                {/* <input id="image" name="image" type="file" required className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"/> */}
                                <Image src={previewImageSrc} alt="Profile image" width={80} height={80} className="w-[80px] h-[80px] rounded-full"/>
                                <input type="hidden" name="image" value={previewImageSrc}/>
                                <button type="button" className="btn btn-primary btn-sm mt-2" onClick={()=>document.getElementById('filesManager').showModal()}>Select a different image</button>
                                <FilesManagerModal selectImage={previewImage}/>
                            </div>
                        </div>
                        <div className="pt-6">
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="button" className="btn btn-error text-white ml-2" onClick={() => setState("view")}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
                <div className="flex justify-between">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <button className="btn btn-primary btn-sm" onClick={() => setState("edit")}>
                        <FontAwesomeIcon icon={faPen} className="mr-1 w-3 h-3"/>
                        Edit
                    </button>
                </div>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                    This information will be displayed publicly so be careful what you share.
                </p>

                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900">{session?.user?.name}</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900">{session?.user?.email}</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Image</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <Image src={session?.user?.image} alt="Profile image" width={80} height={80} className="w-[80px] h-[80px] rounded-full"/>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}