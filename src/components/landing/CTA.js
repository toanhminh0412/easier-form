import Link from "next/link"

export default function CTA() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                    <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Start building your form today
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                        Use your creativity to build forms that are unique to your client&apos;s needs. Save the hassle of building forms from scratch.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href="/signin"
                        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        Get started
                    </Link>
                    <Link href="#demo" className="text-sm font-semibold leading-6 text-white">
                        Demo <span aria-hidden="true">→</span>
                    </Link>
                    </div>
                    <svg
                    viewBox="0 0 1024 1024"
                    className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                    aria-hidden="true"
                    >
                    <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
                    <defs>
                        <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                        <stop stopColor="#7775D6" />
                        <stop offset={1} stopColor="#E935C1" />
                        </radialGradient>
                    </defs>
                    </svg>
                </div>
            </div>
        </div>
    )
}
  