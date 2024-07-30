import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

export default function Showcase({ forms = [] }) {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 id="forms-heading" className="sr-only">
                Products
                </h2>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Check out forms that were built by <span className="text-primary">EasierForm</span></h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {forms.map((form) => (
                        <Link key={form.id} href={form.href} target="_blank" className="group">
                            <div className="aspect-h-5 aspect-w-6 w-full rounded-lg border border-gray-200 shadow-md overflow-hidden">
                                <img
                                    src={form.imageSrc}
                                    alt={form.imageAlt}
                                    className="h-full w-full object-contain object-center group-hover:opacity-75"
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                                <h3>{form.name}</h3>
                                {/* <Link 
                                    href={form.href}
                                    target="_blank"
                                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        View form
                                </Link> */}
                            </div>
                            <p className="mt-1 text-sm italic text-gray-500">{form.description}</p>
                        </Link>
                    ))}
                </div>
                
                {forms.length <= 6 ? <div className="mt-12 text-right">
                    <Link href="/example-forms" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        View more forms <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </Link>
                </div> : null}
            </div>
        </div>
    )
}
  