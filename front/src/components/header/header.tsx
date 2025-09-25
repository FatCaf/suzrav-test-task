export default function Header({
    title = 'Explore Our Products',
    subtitle = 'Discover a wide range of high-quality items.',
}) {
    return (
        <header className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
                {title}
            </h1>
            <p className="text-lg text-gray-600">{subtitle}</p>
        </header>
    )
}
