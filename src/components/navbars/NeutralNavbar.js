"use client";

import Link from "next/link"
import Image from "next/image";

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function NeutralNavbar({ navigation }) {
    return (
        <Disclosure as="nav" className="bg-base-100">
            {({ open }) => (
            <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                            <FontAwesomeIcon icon={faXmark} className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                            <FontAwesomeIcon icon={faBars} className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                {/* <Link href="/" className="btn btn-ghost btn-sm text-2xl text-indigo-300 font-semibold">EasierForm</Link> */}
                                <Link href="/" className="btn-ghost">
                                    <Image src="/img/logo.png" alt="EasierForm" width={80} height={50} />
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4 h-full items-center">
                                {navigation.map((item) => (
                                    <Link
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'rounded-md px-3 py-2 text-sm font-medium',
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                    >
                                    {item.name}
                                    </Link>
                                ))}
                                </div>
                            </div>
                            </div>
                            <Link href="/signin" className="btn btn-primary text-white">Sign in</Link>
                        </div>
                    </div>
        
                    <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={classNames(
                            item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </DisclosureButton>
                        ))}
                    </div>
                </DisclosurePanel>
            </>
            )}
        </Disclosure>
    )
}