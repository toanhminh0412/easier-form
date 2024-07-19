'use client'

import { useState, useEffect, useContext } from 'react'
import { Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import LayoutItemsContext from '../../contexts/LayoutItemsContext'

export default function CopyScreenNotification({ currentBreakpoint='lg' }) {
    const { layoutItems, setLayoutItems } = useContext(LayoutItemsContext);
    const [show, setShow] = useState(false);
    const [btn1Text, setBtn1Text] = useState('Desktop');
    const [btn2Text, setBtn2Text] = useState('Phone');

    // Display this notification when user changes the current breakpoint
    useEffect(() => {
        // Reset the button text
        if (currentBreakpoint === 'lg') {
            setBtn1Text('Tablet');
            setBtn2Text('Phone');
        } else if (currentBreakpoint === 'md') {
            setBtn1Text('Desktop');
            setBtn2Text('Phone');
        } else {
            setBtn1Text('Desktop');
            setBtn2Text('Tablet');
        }

        if (layoutItems[currentBreakpoint].length > 0) {
            setShow(true);
        }
    }, [currentBreakpoint]);

    // Copy layout from other screens
    const copyLayout = (btnText) => {
        if (btnText === 'Desktop') {
            setLayoutItems({
                ...layoutItems,
                [currentBreakpoint]: layoutItems['lg']
            });
        } else if (btnText === 'Tablet') {
            setLayoutItems({
                ...layoutItems,
                [currentBreakpoint]: layoutItems['md']
            });
        } else {
            setLayoutItems({
                ...layoutItems,
                [currentBreakpoint]: layoutItems['sm']
            });
        }
    }

    return (
        <>
        {/* Global notification live region, render this permanently at the end of the document */}
        <div
            aria-live="assertive"
            className="pointer-events-none fixed bottom-0 inset-x-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition show={show}>
                <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
                    <div className="p-4">
                        <div className="flex items-start">
                            {/* <div className="flex-shrink-0 pt-0.5">
                                <img
                                alt=""
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                className="h-10 w-10 rounded-full"
                                />
                            </div> */}
                            <div className="ml-3 w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900">Copy layout</p>
                                <p className="mt-1 text-sm text-gray-500">Copy layout from other screens. Save time on redesigning!</p>
                                <div className="mt-4 flex">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={() => copyLayout(btn1Text)}
                                    >
                                        {btn1Text}
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-3 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        onClick={() => copyLayout(btn2Text)}
                                    >
                                        {btn2Text}
                                    </button>
                                </div>
                            </div>
                            <div className="ml-4 flex flex-shrink-0">
                                <button
                                type="button"
                                onClick={() => {
                                    setShow(false)
                                }}
                                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                <span className="sr-only">Close</span>
                                <FontAwesomeIcon icon={faXmark} aria-hidden="true" className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
            </div>
        </div>
        </>
    )
}
