export default function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-slate-950 py-8">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
                <p className="text-slate-500 text-sm">
                    © 2026 Piyush Thawale. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="text-slate-500 hover:text-white text-sm">Privacy</a>
                    <a href="#" className="text-slate-500 hover:text-white text-sm">Terms</a>
                    <a href="#" className="text-slate-500 hover:text-white text-sm">Twitter</a>
                </div>
            </div>
        </footer>
    );
}
