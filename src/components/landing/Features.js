import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faSmile, faEye, faLink, faFilePdf, faRecycle } from "@fortawesome/free-solid-svg-icons";

import SafeHtml from '../SafeHtml';

const features = [
    {
        name: 'Form customization',
        description:
        'Customize your form by dragging and dropping to look exactly how you want it to.',
        icon: faPencilAlt,
    },
    {
        name: 'Form usage',
        description:
        'You can do whatever you want with your form. Share a link, embed it in your website, or download it as a file.',
        icon: faFilePdf,
    },
    {
        name: 'Easy-to-use interface',
        description:
        'EasierForm is not filled with navigation bars, buttons, options that you don&apos;t need. It is simple and easy to use. It does <strong>EXACTLY ONE THING</strong> - help you build forms.',
        icon: faSmile,
    },
    {
        name: 'Multiple responses viewing options',
        description:
        'View your responses however your want. With tables, forms, CSV, Excel, etc.',
        icon: faEye,
    },
    {
        name: 'Custom URL',
        description:
        'Publish your form with an URL of your choice. It will be avaible at <strong>https://easierform.com/viewform/your-url</strong>',
        icon: faLink,
    },
    {
        name: 'Reusable forms',
        description:
        'See a form that you like? You can clone it and use it as your own.',
        icon: faRecycle,
    },
]

export default function Features() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Customize your form</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Build a form that looks exactly like how you want it
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        EasierForm allows you to do things that other form builders can&apos;t.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                        <div key={feature.name} className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                <FontAwesomeIcon icon={feature.icon} className="h-4 w-4 text-white" aria-hidden="true" />
                            </div>
                            {feature.name}
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                <SafeHtml htmlContent={feature.description} />
                            </dd>
                        </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
