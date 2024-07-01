"use client";

import { useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const frequencies = [
    { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
    { value: 'annually', label: 'Annually', priceSuffix: '/year' },
    ]
const tiers = [
    {
        name: 'Individual',
        id: 'tier-individual',
        href: '#',
        price: { monthly: 'Free', annually: 'Free' },
        description: 'The essentials to build beautiful forms and collect responses for a limited usage.',
        features: ['10 forms', '200 responses/form', '1000 views/form', '500MB of file storage', 'EasierForm branding'],
        mostPopular: false,
    },
    {
        name: 'Small Business',
        id: 'tier-small-business',
        href: '#',
        price: { monthly: '$9.99', annually: '$99.99' },
        description: 'A plan that grows with your business and offers more neccessary usage.',
        features: [
        '50 forms',
        '3000 responses/form',
        '5000 views/form',
        '5GB of file storage',
        'Custom URL',
        'No EasierForm branding',
        ],
        mostPopular: true,
    },
    {
        name: 'Enterprise',
        id: 'tier-enterprise',
        href: '#',
        price: { monthly: '$19.99', annually: '$199.99' },
        description: 'The best plan for businesses that need more advanced features and usage.',
        features: [
        '100 forms',
        '10000 responses/form',
        '20000 views/form',
        '10GB of file storage',
        'Custom URL',
        'No EasierForm branding',
        ],
        mostPopular: false,
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Pricing() {
    const [frequency, setFrequency] = useState(frequencies[0])

    return (
        <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Pricing plans for all users
            </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
            Choose an affordable plan that&apos;s packed with the best features for your needs.
            </p>
            <div className="mt-16 flex justify-center">
            <fieldset aria-label="Payment frequency">
                <RadioGroup
                value={frequency}
                onChange={setFrequency}
                className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-white"
                >
                {frequencies.map((option) => (
                    <Radio
                    key={option.value}
                    value={option}
                    className={({ checked }) =>
                        classNames(checked ? 'bg-indigo-500' : '', 'cursor-pointer rounded-full px-2.5 py-1')
                    }
                    >
                    {option.label}
                    </Radio>
                ))}
                </RadioGroup>
            </fieldset>
            </div>
            <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier) => (
                <div
                key={tier.id}
                className={classNames(
                    tier.mostPopular ? 'bg-white/5 ring-2 ring-indigo-500' : 'ring-1 ring-white/10',
                    'rounded-3xl p-8 xl:p-10',
                )}
                >
                <div className="flex items-center justify-between gap-x-4">
                    <h3 id={tier.id} className="text-lg font-semibold leading-8 text-white">
                    {tier.name}
                    </h3>
                    {tier.mostPopular ? (
                    <p className="rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                        Most popular
                    </p>
                    ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-300">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-white">{tier.price[frequency.value]}</span>
                    <span className="text-sm font-semibold leading-6 text-gray-300">{frequency.priceSuffix}</span>
                </p>
                <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className={classNames(
                    tier.mostPopular
                        ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                        : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
                    'mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    )}
                >
                    Buy plan
                </a>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10">
                    {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                        <FontAwesomeIcon icon={faCheck} className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                        {feature}
                    </li>
                    ))}
                </ul>
                </div>
            ))}
            </div>
        </div>
        </div>
    )
}
