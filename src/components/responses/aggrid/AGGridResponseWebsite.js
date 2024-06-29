import Link from "next/link";

export default function AGGridResponseWebsite({ value }) {
    if (!value) return null;

    return <Link href={value} target="_blank" className="text-indigo-600 hover:text-indigo-900 underline">
        {value}
    </Link>
}