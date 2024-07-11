"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import { useSession } from "next-auth/react";
import { firebaseStorage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

import planData from "@/data/planData";
import { compressImageSize } from "@/helpers/files";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsis, faTrash, faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import Alert from "../ui/Alert";

export default function FilesManagerModal({ selectImage }) {
    const { data: session } = useSession();
    const [currentPlan, setCurrentPlan] = useState(planData[0]);
    const [userId, setUserId] = useState(null);
    const [totalSize, setTotalSize] = useState(0);
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInput = useRef(null);

    // Get user's current plan
    useEffect(() => {
        if (session?.user?.plan) {
            const plan = planData.find(plan => plan.id === session.user.plan.type);
            setCurrentPlan(plan);
        }
    }, [session]);

    // Get user's files
    useEffect(() => {
        const fetchFiles = async () => {
            const response = await fetch("/api/files/fetch");
            if (response.ok) {
                const { userId, images, size } = await response.json();
                setImages(images);
                setUserId(userId);
                setTotalSize(size);
            } else {
                console.error("Failed to fetch files");
                const { error } = await response.json();
                setError({ title: "Failed to fetch files", message: error });
            }
        }
        
        fetchFiles();
    }, []);

    // Upload a new file
    const uploadFile = async (e) => {
        setError(null);
        setLoading(true);

        // Upload file to Firebase Storage
        let file = e.target.files[0];
        file = await compressImageSize(file, 1);

        // Check if user still have enough file storage left
        if (parseFloat((file.size + totalSize) / 1000000) > currentPlan.fileStorage) {
            setError({ title: `File size is larger than the avaiable storage left. You only have ${parseFloat((currentPlan.fileStorage - totalSize / 1000000) / 1000)}GB left`, message: "Please choose a smaller file"})
            setLoading(false);
            return;
        }

        const storageRef = ref(firebaseStorage, `users/${userId}/files/${file.name}`);
        
        // Check if file already exists
        try {
            const existingFile = await getDownloadURL(storageRef);
            console.log("existingFile: ", existingFile);
            if (existingFile) {
                setError({ title: "File already exists", message: "Please choose a different file"})
                setLoading(false);
                return;
            }
        } catch (error) {
            console.log("File does not exist. Good to upload!");
        }

        const snapshot = await uploadBytes(storageRef, file);
        console.log("Uploaded a blob or file!", snapshot);

        // Get file URL
        const fileUrl = await getDownloadURL(storageRef);
        console.log("File available at", fileUrl);

        // Add file to files registry metadata in the backend
        const response = await fetch("/api/files/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: file.name,
                url: fileUrl,
                size: file.size,
            }),
        });

        // Upload successfully
        if (response.ok) {
            const { images, size } = await response.json();
            setImages(images);
            setTotalSize(size);
        
        // Failed to upload file
        } else {
            console.error("Failed to update file registry metadata");
            const data = await response.json();
            setError({ title: "Failed to upload file", message: data.error ? data.error : "Please try again"})
        }

        setLoading(false);
    }

    const deleteImages = async (deleteImages) => {
        setError(null);
        setLoading(true);

        // Delete files from Firebase Storage
        deleteImages.forEach(async (image) => {
            try {
                const storageRef = ref(firebaseStorage, `${userId}/files/${image.name}`);
                await deleteObject(storageRef);
            } catch (error) {
                console.log("Failed to delete file from storage", error);
            }
        });

        // Remove files from files registry metadata in the backend
        const response = await fetch("/api/files/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                deleteImages
            }),
        });

        // Delete successfully
        if (response.ok) {
            const { images, size } = await response.json();
            setImages(images);
            setTotalSize(size);

        // Failed to delete files
        } else {
            console.error("Failed to delete files");
            setError({ title: "Failed to delete files", message: "Please try again"})
        }

        setLoading(false);
    }

    return (
        <dialog id="filesManager" className="modal">
            <div className="modal-box max-w-5xl relative">
                {loading ? <div className="absolute w-full h-full bg-gray-700 top-0 left-0 opacity-50 text-center flex flex-col justify-center z-30">
                    <span className="loading loading-spinner loading-lg mx-auto"></span>
                </div> : null}
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Your files</h3>

                {/* Error message */}
                {error ? <div className="my-4"><Alert title={error.title} message={error.message} type="danger" /></div> : null}
                
                {/* Display total file size */}
                <div className="text-gray-300 mt-2">
                    <p className="text-sm">Total size: {parseFloat(totalSize / 1000000)} MB / { parseFloat(currentPlan.fileStorage / 1000) } GB</p>
                </div>

                {/* No image display */}
                {images.length === 0 ? (
                    <div className="text-center">
                        <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                        >
                            <path
                                vectorEffect="non-scaling-stroke"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-semibold text-white">No files</h3>
                        <p className="mt-1 text-sm text-gray-300">Click &quot;Upload&quot; to start uploading files. You have { parseFloat(currentPlan.fileStorage / 1000) }GB of storage available.</p>
                        <div className="mt-6">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => fileInput.current.click()}
                            >
                                <FontAwesomeIcon icon={faPlus} className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                Upload
                            </button>
                        </div>
                    </div>
                ) : null}

                {/* Images display */}
                {images.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {images.map((image) => (
                        <div key={image.name} className="relative w-full aspect-[4/3] group">
                            <input
                                type="checkbox"
                                className={`${selectedImages.includes(image) ? "block" : "hidden"} group-hover:block absolute top-1 left-1 z-10 h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600`}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedImages([...selectedImages, image]);
                                    } else {
                                        setSelectedImages(selectedImages.filter(deleteImage => deleteImage.name !== image.name));
                                    }
                                }}
                            />
                            <Image src={image.url} alt={image.name} fill className="z-0 group-hover:opacity-70" onClick={() => selectImage(image.url)}/>
                            <div className="dropdown dropdown-end hidden group-hover:block absolute top-1 right-1 z-10 text-black">
                                <div tabIndex={0} role="button" className="btn bg-white hover:bg-gray-200 text-black btn-sm h-6 w-8">
                                    <FontAwesomeIcon icon={faEllipsis} className="h-4 w-4" aria-hidden="true" />
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow">
                                    <li><a className="hover:bg-gray-200" onClick={() => selectImage(image.url)}><FontAwesomeIcon icon={faArrowPointer} className="mr-2"/> Select image</a></li>
                                    <li><a className="hover:bg-gray-200" onClick={() => deleteImages([image])}><FontAwesomeIcon icon={faTrash} className="mr-2"/> Delete image</a></li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div> : null}

                {images.length > 0 ? 
                <div className="modal-action">
                    {selectedImages.length > 0 ? 
                        <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        onClick={() => deleteImages(selectedImages)}
                    >
                        <FontAwesomeIcon icon={faTrash} className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                        Delete ({selectedImages.length})
                    </button> : null}

                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => fileInput.current.click()}
                    >
                        <FontAwesomeIcon icon={faPlus} className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                        Upload
                    </button>
                </div> : null}

                <input type="file" className="hidden" accept="image/*" ref={fileInput} onChange={uploadFile}></input>

            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}