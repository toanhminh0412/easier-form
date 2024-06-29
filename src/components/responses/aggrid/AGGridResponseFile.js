import Link from "next/link"

export default function AGGridResponseFile({ value }) {
    if (!value) return null;

    return <Link href={value.url} target="_blank" className="text-indigo-600 hover:text-indigo-900 underline">
        {value.name}
    </Link>
}