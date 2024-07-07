"use client";

import Link from 'next/link';
import { useState } from 'react'

import { Radio, RadioGroup } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const frequencies = [
    { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
    { value: 'annually', label: 'Annually', priceSuffix: '/year' },
    ]
const plans = [
    {
        name: 'Individual',
        id: 'individual',
        price: { monthly: 'Free', annually: 'Free' },
        description: 'The essentials to build beautiful forms and collect responses for a limited usage.',
        features: ['10 forms', '500 monthly responses', '5000 monthly form views', '500MB of file storage', 'EasierForm branding'],
        mostPopular: false,
    },
    {
        name: 'Small Business',
        id: 'small-business',
        price: { monthly: '$9.99', annually: '$99.99' },
        description: 'A plan that grows with your business and offers more neccessary usage.',
        features: [
        '50 forms',
        '5000 monthly responses',
        '20000 monthly form views',
        '5GB of file storage',
        'Custom URL',
        'No EasierForm branding',
        ],
        mostPopular: true,
    },
    {
        name: 'Enterprise',
        id: 'enterprise',
        price: { monthly: '$19.99', annually: '$199.99' },
        description: 'The best plan for businesses that need more advanced features and usage.',
        features: [
        '100 forms',
        '10000 monthly responses',
        '50000 monthly form views',
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

export default function Pricing({ user=null }) {
    const [frequency, setFrequency] = useState(frequencies[0]);

    const userHasPlan = (plan) => {
        if (user) {
            if (user.plan.type === plan.id) {
                if (user.plan.type === 'individual') return true;
                if (user.plan.frequency === frequency.value) return true;
            }
        }
        return false;
    }

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
                <div className={`isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none ${user ? "xl:grid-cols-2" : "lg:grid-cols-2 xl:grid-cols-3"} `}>
                {plans.map((plan) => (
                    <div
                    key={plan.id}
                    className={classNames(
                        (plan.mostPopular && ! user) || userHasPlan(plan) ? 'bg-white/5 ring-2 ring-indigo-500' : 'ring-1 ring-white/10',
                        'rounded-3xl p-8 xl:p-10',
                    )}
                    >
                    <div className="flex items-center justify-between gap-x-4">
                        <h3 id={plan.id} className="text-lg font-semibold leading-8 text-white">
                        {plan.name}
                        </h3>
                        {(plan.mostPopular && !user) || userHasPlan(plan) ? (
                        <p className="rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                            {user ? "Current plan" : "Most popular"}
                        </p>
                        ) : null}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-gray-300">{plan.description}</p>
                    <p className="mt-6 flex items-baseline gap-x-1">
                        <span className="text-4xl font-bold tracking-tight text-white">{plan.price[frequency.value]}</span>
                        <span className="text-sm font-semibold leading-6 text-gray-300">{frequency.priceSuffix}</span>
                    </p>
                    {!user ? <Link
                        href={plan.id === "plan-individual" ? "/signin" : "/signin?redirect=manage-account"}
                        aria-describedby={plan.id}
                        className={classNames(
                        plan.mostPopular
                            ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                            : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
                        'mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                        )}
                    >
                        Get started
                    </Link>  : <PlanButton plan={plan} user={user} frequency={frequency.value} />}
                    <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10">
                        {plan.features.map((feature) => (
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

const PlanButton = ({ plan, user, frequency }) => {
    const [loading, setLoading] = useState(false);
    const userHasPlan = () => {
        if (user) {
            if (user.plan.type === plan.id) {
                if (user.plan.type === 'individual') return true;
                if (user.plan.frequency === frequency) return true;
            }
        }
        return false;
    }

    const openStripeCheckoutSession = async () => {
        setLoading(true);
        const response = await fetch('/api/stripe/create_checkout_session',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    plan: plan.id,
                    frequency: frequency,
                }),
            }
        );
        
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            window.location.href = data.sessionUrl;
        } else {
            console.log('Failed to create Stripe checkout session');
            setLoading(false);
        }
    }

    const openStripePortalSession = async () => {
        setLoading(true);
        const response = await fetch('/api/stripe/create_portal_session',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            window.location.href = data.sessionUrl;
        } else {
            console.log('Failed to create Stripe portal session');
            setLoading(false);
        }
    }

    const handleClick = async () => {
        // if (userHasPlan()) {
        if (user.plan && user.plan.type !== 'individual') {
            await openStripePortalSession();
        } else {
            await openStripeCheckoutSession();
        }
    }

    return (
        <label
            aria-describedby={plan.id}
            className={classNames(
                userHasPlan()
                    ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                    : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
                'mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                )}
            onClick={handleClick}
        >
            {loading ? "Loading..." : userHasPlan() ? "Manage plan" : "Get started"}
        </label>
    )
}
