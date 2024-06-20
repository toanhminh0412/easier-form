import LoggedInLayout from "@/components/layouts/LoggedInLayout"

export default function FormLayout({ children }) {
    return (
        <LoggedInLayout>
            {children}
        </LoggedInLayout>
    )
}