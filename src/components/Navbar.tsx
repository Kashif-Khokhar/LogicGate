import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, LayoutDashboard, Binary, Menu, X } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { path: '/', label: 'Home', icon: LayoutDashboard },
        { path: '/simulator', label: 'Simulator', icon: Cpu },
        { path: '/truth-tables', label: 'Truth Tables', icon: Binary },
    ];

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <nav className="border-b border-white/5 sticky top-0 z-[100] backdrop-blur-md bg-[#020617]/80">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between relative z-[110]">
                <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
                    <div className="bg-white/10 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-white/5 border border-white/10">
                        <img src="/logo.svg" alt="LogicGate Logo" className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white/90">
                        Logic<span className="text-white font-extrabold tracking-tighter">GATE</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5 backdrop-blur-sm">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${isActive
                                    ? 'bg-white/10 text-white shadow-inner border border-white/5'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors relative"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown - Sits below the header */}
            {isMenuOpen && (
                <div className="fixed top-16 left-0 right-0 bottom-0 bg-zinc-950 z-[90] md:hidden flex flex-col p-6 border-t border-white/10 overflow-y-auto">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-200 text-lg font-medium ${isActive
                                        ? 'bg-white/10 text-white border border-white/10'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
