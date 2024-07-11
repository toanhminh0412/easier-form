"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"

import planData from "@/data/planData";
  
export default function Usage() {
    const { data: session } = useSession();
    const [stats, setStats] = useState([
        { name: 'Forms', stat: 'Loading...' },
        { name: 'Received responses', stat: 'Loading...' },
        { name: 'Form views', stat: 'Loading...' },
        { name: 'File storage', stat: 'Loading...' },
    ]);

    // Plan usage stats
    useEffect(() => {
        if (session?.user?.plan) {
            const plan = session.user.plan;
            const planTotalUsage = planData.find((item) => item.id === plan.type);
            setStats([
                { name: 'Forms', stat: `${plan.usage.forms} / ${planTotalUsage.forms}` },
                { name: 'Received responses', stat: `${plan.usage.monthlyResponses} / ${planTotalUsage.monthlyResponses}` },
                { name: 'Form views', stat: `${plan.usage.monthlyFormViews} / ${planTotalUsage.monthlyFormViews}` },
                { name: 'File storage (in GB)', stat: `${parseFloat(plan.usage.fileStorage / 1000).toFixed(2)} / ${parseFloat(planTotalUsage.fileStorage / 1000)}` },
            ]);
        }
    }, [session]);

    return (
        <div>
            <h3 className="text-sm leading-6 text-gray-700">Amount that you have left until <strong className="text-gray-900">{session?.user?.plan?.expiredDate}</strong></h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((item) => (
                <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 border border-gray-100 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                    <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
                </div>
            ))}
            </dl>
        </div>
    )
}
  