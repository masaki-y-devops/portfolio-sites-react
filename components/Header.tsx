export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/70 backdrop-blur-md text-white">
        <div className="container mx-config max-w-7xl mx-auto h-16 flex items-center justify-between px-8">
            <div className="text-xl">masaki-y-playground</div>
            <nav className="flex gap-4">
            <a href="https://portfolio-sites-react.vercel.app" className="hover:text-blue-500">Top</a>
            <a href="https://github.com/masaki-y-devops" className="hover:text-blue-500">GitHub</a>
            </nav>
        </div>
        </header>
    );
}