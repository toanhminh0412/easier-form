"use client";
import Link from "next/link";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export default function Banner() {
    const [show, setShow] = useState(true);

    if (!show) {
        return null;
    }

    return (
        <div className="flex items-center gap-x-6 bg-indigo-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
            <p className="text-sm leading-6 text-white">
                <Link href="https://easierform.com/viewform/easierform">
                    <strong className="font-semibold">Need us to build a form just for you?</strong>
                    <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline h-0.5 w-0.5 fill-current">
                        <circle r={1} cx={1} cy={1} />
                    </svg>
                    Click <span className="underline font-semibold">here</span>, fill out the contact form and we&apos;ll get one started right away!&nbsp;<span aria-hidden="true">&rarr;</span>
                </Link>
            </p>
            <div className="flex flex-1 justify-end">
                <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={() => setShow(false)}>
                    <span className="sr-only">Dismiss</span>
                    <FontAwesomeIcon icon={faXmark} aria-hidden="true" className="h-5 w-5 text-white" />
                </button>
            </div>
        </div>
    )
}
