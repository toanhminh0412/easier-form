import Link from "next/link"

export default function Hero() {
    return (
        <div className="bg-[url('/img/header-bg.jpg')] bg-cover bg-center">
            <div className="relative isolate pt-14">
                <div className="py-24 sm:py-32 lg:pb-40">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                Form builder for web developers
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Build a form, embed on your client&apos;s website, have responses sent to their email, display responses on tables, form view, CSV and Excel. You can even print the form on paper. Everything that your client needs.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                href="/signin"
                                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                >
                                Get started
                                </Link>
                                <Link href="/example-forms" className="text-sm font-semibold leading-6 text-white">
                                See examples <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                        <video id="demo" className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24" autoPlay loop muted playsInline>
                            {/* <source src="https://firebasestorage.googleapis.com/v0/b/easier-form.appspot.com/o/videos%2Fdemo.mp4?alt=media&token=ffe7533a-c37e-4e9e-82ff-6155464ab4f3" type="video/mp4" />                            Your browser does not support the video tag. */}
                            <source src="https://firebasestorage.googleapis.com/v0/b/easier-form.appspot.com/o/videos%2FMaking%20Form%20-%20EasierForm.mp4?alt=media&token=5cdca4d3-c66d-45b6-8ebf-2b1f6643c027" type="video/mp4" /> Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
                >
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                    clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
                </div>
            </div>
        </div>
    )
}
