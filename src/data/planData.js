const planData = [
    {
        name: 'Individual',
        id: 'individual',
        price: { monthly: '$0', annually: '$0' },
        forms: 10,
        monthlyResponses: 500,
        monthlyFormViews: 5000,
        fileStorage: 500,
        customUrl: false,
        branding: true,
    },
    {
        name: 'Small Business',
        id: 'small-business',
        price: { monthly: '$9.99', annually: '$99.99' },
        forms: 50,
        monthlyResponses: 5000,
        monthlyFormViews: 20000,
        fileStorage: 5000,
        customUrl: true,
        branding: false,
    },
    {
        name: 'Enterprise',
        id: 'enterprise',
        price: { monthly: '$19.99', annually: '$199.99' },
        forms: 100,
        monthlyResponses: 10000,
        monthlyFormViews: 50000,
        fileStorage: 10000,
        customUrl: true,
        branding: false,
    },
]

export default planData;