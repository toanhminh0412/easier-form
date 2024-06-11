"use client";

import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import CreateFormModal from "@/app/components/modals/CreateFormModal";

const forms = [
    {
        id: 1,
        name: 'GraphQL API',
        href: '#',
        createdBy: 'Leslie Alexander',
        lastUpdated: 'March 17, 2023 12:45 PM',
    },
    {
        id: 2,
        name: 'New benefits plan',
        href: '#',
        createdBy: 'Leslie Alexander',
        lastUpdated: 'March 17, 2023 12:45 PM',
    },
    {
        id: 3,
        name: 'Onboarding emails',
        href: '#',
        createdBy: 'Courtney Henry',
        lastUpdated: 'March 17, 2023 12:45 PM',
    },
    {
        id: 4,
        name: 'iOS app',
        href: '#',
        createdBy: 'Leonard Krasner',
        lastUpdated: 'March 17, 2023 12:45 PM',
    },
    {
        id: 5,
        name: 'Marketing site redesign',
        href: '#',
        createdBy: 'Courtney Henry',
        lastUpdated: 'March 17, 2023 12:45 PM',
    },
]

export default function Private() {
    return (
        <>
            <header className="bg-white shadow-sm border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex flex-row justify-between">
                    <h1 className="text-lg font-semibold leading-6 text-gray-900">Dashboard</h1>
                    <button
                        className='btn btn-primary btn-sm ml-auto'
                        onClick={() => document.getElementById('createFormModal').showModal()}>
                        <FontAwesomeIcon icon={faPlus} />
                        Create form
                    </button>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div>
                        <ul role="list" className="divide-y divide-gray-100">
                            {forms.map((form) => (
                                <li key={form.id} className="flex items-center justify-between gap-x-6 py-5">
                                    <div className="min-w-0">
                                        <div className="flex items-start gap-x-3">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{form.name}</p>
                                        </div>
                                        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                            <p className="whitespace-nowrap">
                                                Last updated on <time dateTime={form.lastUpdated}>{form.lastUpdated}</time>
                                            </p>
                                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                                <circle cx={1} cy={1} r={1} />
                                            </svg>
                                            <p className="truncate">Created by {form.createdBy}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-none items-center gap-x-4">
                                        <Link href="#"
                                        className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                                        >
                                        View form<span className="sr-only">, {form.name}</span>
                                        </Link>
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white text-black text-xs rounded-md border border-slate-100 w-52">
                                                <li><Link href="#">
                                                    <FontAwesomeIcon icon={faPen} />
                                                    Edit form
                                                </Link></li>
                                                <li><Link href="#">
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                    Delete form
                                                </Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
            {/* Form creation modal */}
            <CreateFormModal />
        </>
    );
}