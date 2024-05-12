export default function Separator({ item }) {
    return (
        <div className="border-t border-gray-900 w-full" style={{ borderWidth: `${item.lineWidth}px` }}></div>
    )
}