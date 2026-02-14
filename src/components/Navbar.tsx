import { useState } from 'react';
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

    return (
        <nav className="border-b border-white/5 sticky top-0 z-50 backdrop-blur-md bg-transparent">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group z-50 relative" onClick={() => setIsMenuOpen(false)}>
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
                    className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-50 relative"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-[#020617] bg-opacity-100 z-[100] flex flex-col items-center justify-center gap-8 md:hidden backdrop-blur-xl">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-200 text-xl font-bold ${isActive
                                        ? 'bg-white/10 text-white border border-white/10'
                                        : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    <Icon size={24} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
