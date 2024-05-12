export default function Image({ item }) {
    return (
        <div className="bg-cover bg-center w-full h-full" style={{ backgroundImage: `url("${item.src ? item.src : "/img/login.png"}")` }}></div>
    )
}