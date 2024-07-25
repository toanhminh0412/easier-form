import Link from "next/link"

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
    {
        id: 1,
        name: 'Get a quote',
        href: 'https://easierform.com/viewform/getaquotedemo',
        description: 'For lawn mowing, window cleaning, hauling and moving services',
        imageSrc: 'https://firebasestorage.googleapis.com/v0/b/easier-form.appspot.com/o/public%2FGet%20a%20quote.png?alt=media&token=82cbeea5-9809-4bea-949e-53ebef4becf7',
        imageAlt: 'Get a quote form demo',
    },
    {
        id: 2,
        name: 'General Admission Registration',
        href: 'https://www.easierform.com/viewform/admissionregistrationdemo',
        description: 'Admission registration form for an event that includes food and multiple activities',
        imageSrc: 'https://firebasestorage.googleapis.com/v0/b/easier-form.appspot.com/o/public%2Fgeneral_admission_registration.png?alt=media&token=d4c90d70-3c9d-4f83-9864-6f9e853008e4',
        imageAlt: 'Demo form for general admission registration',
    },
    {
        id: 3,
        name: 'Hotel booking',
        href: 'https://www.easierform.com/viewform/hotelbookingdemo',
        description: 'Room booking form for a hotel with multiple room types and add-ons',
        imageSrc: 'https://firebasestorage.googleapis.com/v0/b/easier-form.appspot.com/o/public%2Fhotel_booking.png?alt=media&token=bf0770a4-e4ef-4382-ae58-450554c6adbe',
        imageAlt: 'Demo form for hotel booking',
    },
    {
        id: 4,
        name: 'Tattoo request form',
        href: 'https://www.easierform.com/viewform/tattoorequestdemo',
        description: 'A detailed form for customers to provider necessary information for a tattoo appointment',
        imageSrc: 'https://firebasestorage.googleapis.com/v0/b/easier-form.appspot.com/o/public%2Ftattoo_request_form.png?alt=media&token=977cf01e-bb84-4b0d-8027-5187536c968f',
        imageAlt: 'Demo form for tattoo request',
    },
]
  
export default function Showcase() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 id="products-heading" className="sr-only">
                Products
                </h2>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Check out forms that were built by <span className="text-primary">EasierForm</span></h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {products.map((product) => (
                        <Link key={product.id} href={product.href} target="_blank" className="group">
                            <div className="aspect-h-5 aspect-w-6 w-full rounded-lg border border-gray-200 shadow-md overflow-hidden">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-contain object-center group-hover:opacity-75"
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                                <h3>{product.name}</h3>
                                {/* <Link 
                                    href={product.href}
                                    target="_blank"
                                    className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        View form
                                </Link> */}
                            </div>
                            <p className="mt-1 text-sm italic text-gray-500">{product.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
  