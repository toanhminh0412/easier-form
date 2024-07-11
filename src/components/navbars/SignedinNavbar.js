"use client";

import Link from "next/link"
import Image from "next/image";
import { useState, useEffect } from "react";
import { signOut as NextAuthSignOut, useSession } from "next-auth/react";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import { deleteCookie } from "@/serverActions/cookies";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function SignedinNavbar({ navigation }) {
    const { data: session } = useSession();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (session) {
            setUser(session.user);
        }
    }, [session]);

    const signOut = async () => {
        deleteCookie("signedIn");
        await NextAuthSignOut({ redirect: true, callbackUrl: "/signin" });
    }

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
                                <Link href="/" className="btn btn-ghost btn-sm text-2xl text-indigo-300 font-semibold">EasierForm</Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
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
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-base-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <Image
                                                width={20}
                                                height={20}
                                                className="h-8 w-8 rounded-full"
                                                src={user?.image ? user.image : "/img/blank-user.png"}
                                                alt="Avatar"
                                            />
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                    transition
                                    className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                    <MenuItem>
                                        {({ focus }) => (
                                        <Link
                                            href="/manage-account"
                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Manage account
                                        </Link>
                                        )}
                                    </MenuItem>
                                    {/* <MenuItem>
                                        {({ focus }) => (
                                        <Link
                                            href="#"
                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Settings
                                        </Link>
                                        )}
                                    </MenuItem> */}
                                    <MenuItem>
                                        {({ focus }) => (
                                        <Link
                                            href="#"
                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                            onClick={signOut}
                                        >
                                            Sign out
                                        </Link>
                                        )}
                                    </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
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
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
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