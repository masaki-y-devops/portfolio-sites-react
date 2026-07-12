export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-black border-b border-gray-200 backdrop-blur-md">
        <div className="container mx-config max-w-7xl mx-auto h-16 flex items-center justify-between px-4">
            <div className="font-bold text-xl">masaki-y-playgrounds</div>
            <nav className="flex gap-4">
            <a href="#" className="hover:text-blue-500">Home</a>
            <a href="#" className="hover:text-blue-500">About</a>
            </nav>
        </div>
        </header>
    );
}