"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react'


import { useSession } from 'next-auth/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCreditCard, faChartLine } from '@fortawesome/free-solid-svg-icons';

import Profile from './components/Profile';
import Pricing from '@/components/landing/Pricing';

const navigation = [
    { id: "profile", name: 'Profile', icon: faUserCircle },
    { id: "subscription", name: 'Subscription', icon: faCreditCard },
    { id: "usage", name: 'Usage', icon: faChartLine },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Page() {
    const { data: session, update } = useSession();
    const tabSearchParam = useSearchParams().get('tab');
    const tab = tabSearchParam ? tabSearchParam : 'profile';

    useEffect(() => {
        const updateSession = async () => {
            update();
        }

        // Make sure user's plan is up to date
        if (tab === 'subscription') {
            updateSession();
        }
    }, [tab]);

    useEffect(() => {
        console.log(session);
    }, [session]);

    return (
        <>
            <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
                <h1 className="sr-only">General Settings</h1>

                <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
                    <nav className="flex-none px-4 sm:px-6 lg:px-0">
                        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                        {navigation.map((item) => (
                            <li key={item.id}>
                            <Link
                                href={`?tab=${item.id}`}
                                className={classNames(
                                tab === item.id
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6',
                                )}
                            >
                                <FontAwesomeIcon
                                icon={item.icon}
                                className={classNames(
                                    tab === item.id ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                    'h-6 w-6 shrink-0',
                                )}
                                aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                            </li>
                        ))}
                        </ul>
                    </nav>
                </aside>

                <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
                    {!tab || tab === 'profile' && <Profile />}
                    {tab === 'subscription' && <Pricing user={session?.user} />}
                    {tab === 'usage' && <div>Usage</div>}
                </main>
            </div>
        </>
    )
}
