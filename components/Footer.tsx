export default function Footer() {
    return (       
        <footer className="max-w-4xl mx-auto flex flex-col items-center text-center py-6 space-y-6">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center py-6 space-y-6">  

                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
                    <a href="https://github.com/masaki-y-devops/masaki-y-devops" className="hover:text-white transition-colors">About</a>
                    <a href="https://github.com/masaki-y-devops?tab=repositories" className="hover:text-white transition-colors">Repositories</a>
                    <a href="https://github.com/masaki-y-devops" className="hover:text-white transition-colors">Contact</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                </nav>
                
                <div className="w-full max-w-xs border-t border-gray-800"></div>
                
                <p className="text-xs text-gray-500">
                    &copy; 2026 masaki-y-playground
                </p>
            </div>
        </footer>
    );
}