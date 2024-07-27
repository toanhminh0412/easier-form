import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useContext } from "react";
import { useSession } from "next-auth/react";

import useOutsideClick from "@/hooks/useOutsideClick";
import FormInfoContext from "../../contexts/FormInfoContext";
import Alert from "@/components/ui/Alert";

export default function TransferFormModal() {
    const router = useRouter();
    const { data: session } = useSession();
    const { formInfo } = useContext(FormInfoContext);
    const [newOwnerEmail, setNewOwnerEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const transferForm = async (e) => {
        e.preventDefault();

        if (newOwnerEmail === "") {
            setError({ title: "Transfer error", message: "Please select a new owner" });
            return;
        }

        setLoading(true);
        const response = await fetch(`/api/form/${formInfo._id}/transfer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newOwnerEmail })
        });

        if (response.ok) {
            console.log("Form transferred successfully");
            router.push("/");
        } else {
            const data = await response.json();
            console.error("Error transferring form");
            setError({ title: "Transfer error", message: data.error });
            setLoading(false);
        }
    }

    return (
        <dialog id="transferFormModal" className="modal">
            <div className="modal-box">

                {/* Close button */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h2 className="font-bold text-lg">Transfer form to another user</h2>

                {/* Error message */}
                {error && <div className="mt-4">
                    <Alert type="danger" title={error.title} message={error.message} />
                </div>}
                
                <div className="mt-4">
                    <Alert type="warning" title="Warning" message="This action will make the selected user the owner of the form. You will lose all access to the form and its corresponding responses." />
                </div>

                <NewOwnerManager user={session?.user} newOwnerEmail={newOwnerEmail} setNewOwnerEmail={setNewOwnerEmail}/>

                <div className="modal-action">
                    <button disabled={loading || !newOwnerEmail} className="btn btn-primary" onClick={transferForm}>{loading ? "Transferring..." : "Transfer"}</button>
                </div>
            </div>
            
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

const NewOwnerManager = ({ user, newOwnerEmail, setNewOwnerEmail }) => {
    const [emailQuery, setEmailQuery] = useState("");
    const [searching, setSearching] = useState(false);
    const [matchedUsers, setMatchedUsers] = useState([]);

    const ref = useRef();
    useOutsideClick(ref, () => {
        setMatchedUsers([]);
        setSearching(false);
        setEmailQuery("");
    });

    const searchUsers = () => {
        setTimeout(async () => {
            // Get all users that match the emailQuery
            if (emailQuery.length > 0) {
                const response = await fetch(`/api/user/get?emailQuery=${emailQuery}`);
                const data = await response.json();
                console.log(data.users);
                setMatchedUsers(data.users);
            } else {
                setMatchedUsers([]);
            }
            setSearching(false);
        }, 1000);
    }

    useEffect(() => {
        // Search for users when emailQuery changes
        setSearching(true);
        
        // Do nothing if emailQuery is empty
        if (emailQuery === "") {
            setMatchedUsers([]);
            setSearching(false);
            clearTimeout(searchUsers);
        }

        searchUsers();
    }, [emailQuery]);

    const searchUserOnType = async (e) => {
        setEmailQuery(e.target.value);
    }

    const selectOwner = (email) => {
        setNewOwnerEmail(email);
        setEmailQuery("");
        setMatchedUsers([]);
    }

    const removeOwner = () => {
        setNewOwnerEmail("");
    }

    return (
        <div className="mt-4" ref={ref}>
            <p className="text-sm">Select the new owner</p>
            <div className="mt-2 w-full relative">
                <input type="text" placeholder="Enter email" className="input input-bordered w-full" onChange={searchUserOnType} value={emailQuery}/>
                {/* Display all matched users */}
                {searching ?
                <div className="absolute top-full bg-base-300 text-white w-full mt-1 rounded-md shadow-md p-2">
                    Searching...
                </div>
                :
                <div className="absolute top-full bg-base-300 text-white w-full mt-1 rounded-md shadow-md cursor-pointer">
                    {matchedUsers.length > 0 ? matchedUsers.map(matchedUser => matchedUser.email !== user.email ? (
                        <div key={matchedUser.email} className="p-2 border-b border-gray-500 hover:bg-gray-500" onClick={() => selectOwner(matchedUser.email)}>{matchedUser.email}</div>
                    ) : null) : emailQuery ? <div className="p-2">No users found</div> : null}
                </div>}
            </div>
            {/* Display all current editors as badges */}
            {newOwnerEmail ? <div className="my-4 flex flex-row flex-wrap gap-2 items-center">
                <label className="text-sm font-semibold">New owner: </label>
                <span className="inline-flex items-center gap-x-0.5 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {newOwnerEmail}
                    <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-blue-600/20" onClick={removeOwner}>
                        <span className="sr-only">Remove</span>
                            <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-blue-700/50 group-hover:stroke-blue-700/75">
                                <path d="M4 4l6 6m0-6l-6 6" />
                            </svg>
                        <span className="absolute -inset-1" />
                    </button>
                </span>
            </div> : null}
            <div className="text-sm mt-2">Type in the input box above and click on an email to select the email of the form&apos;s new owner</div>
        </div>
    )
}