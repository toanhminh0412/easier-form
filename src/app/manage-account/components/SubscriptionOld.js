import planData from "@/data/planData"
import { useSession } from "next-auth/react";

const plans = planData;
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
  
export default function Subscription() {
    const { data: session } = useSession();
    const currentPlan = session?.user?.plan;
    const currentPlanInfo = plans.find(plan => plan.id === currentPlan.type);


    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Plans</h1>
                    <p className="mt-2 text-sm text-gray-700">
                    You are on the <strong className="font-semibold text-gray-900">{currentPlanInfo.name}</strong> plan. The next payment
                    of {currentPlanInfo.price[currentPlan.frequency]} will be due on {new Date(currentPlan.expiredDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
                    </p>
                </div>
            </div>
            <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Plan
                            </th>
                            <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                                Forms
                            </th>
                            <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                                Monthly responses
                            </th>
                            <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                                Monthly form views
                            </th>
                            <th 
                            scope="col" 
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                File Storage
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Price
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Select</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {plans.map((plan, planIdx) => (
                        <tr key={plan.id}>
                            <td
                                className={classNames(
                                planIdx === 0 ? '' : 'border-t border-transparent',
                                'relative py-4 pl-4 pr-3 text-sm sm:pl-6',
                                )}
                            >
                                <div className="font-medium text-gray-900">
                                    {plan.name}
                                    {currentPlan?.type === plan.id ? <span className="ml-1 text-indigo-600">(Current Plan)</span> : null}
                                </div>
                                <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                                    <span>
                                        {plan.forms} forms / {plan.monthlyResponses} monthly responses
                                    </span>
                                    <span className="hidden sm:inline">·</span>
                                    <span>{plan.monthlyFormViews} monthly form views</span>
                                    <span>{plan.fileStorage / 1000} GB storage</span>
                                </div>
                                {planIdx !== 0 ? <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" /> : null}
                            </td>
                            <td
                                className={classNames(
                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell',
                                )}
                            >
                                {plan.forms} forms
                            </td>
                            <td
                                className={classNames(
                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell',
                                )}
                            >
                                {plan.monthlyResponses} responses
                            </td>
                            <td
                                className={classNames(
                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell',
                                )}
                            >
                                {plan.monthlyFormViews} views
                            </td>
                            <td
                                className={classNames(
                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell',
                                )}
                            >
                                {plan.fileStorage / 1000} GB
                            </td>
                            <td
                                className={classNames(
                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                'px-3 py-3.5 text-sm text-gray-500',
                                )}
                            >
                                <div className="sm:hidden">{plan.price.monthly}/mo</div>
                                <div className="hidden sm:block">{plan.price.monthly}/month</div>
                            </td>
                            <td
                                className={classNames(
                                planIdx === 0 ? '' : 'border-t border-transparent',
                                'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6',
                                )}
                            >
                                <button
                                type="button"
                                className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                                disabled={currentPlan?.type === plan.id}
                                >
                                Select<span className="sr-only">, {plan.name}</span>
                                </button>
                                {planIdx !== 0 ? <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" /> : null}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
  