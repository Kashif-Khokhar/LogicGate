import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, LayoutDashboard, Binary, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const toolsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const navItems = [
        { path: '/', label: 'Home', icon: LayoutDashboard },
        {
            label: 'Tools',
            icon: Sparkles,
            subItems: [
                { path: '/simulator', label: 'Simulator', icon: Cpu, description: 'Design & test logic circuits' },
                { path: '/truth-tables', label: 'Truth Tables', icon: Binary, description: 'Analyze boolean expressions' },
            ]
        },
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

    const handleMouseEnter = () => {
        if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
        setIsToolsOpen(true);
    };

    const handleMouseLeave = () => {
        toolsTimeoutRef.current = setTimeout(() => {
            setIsToolsOpen(false);
        }, 150);
    };

    return (
        <>
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

                            if (item.subItems) {
                                return (
                                    <div
                                        key={item.label}
                                        className="relative"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <button
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium cursor-pointer ${isToolsOpen
                                                ? 'bg-white/10 text-white'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            <Icon size={18} />
                                            <span>{item.label}</span>
                                            <ChevronDown size={14} className={`transition-transform duration-300 ${isToolsOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Desktop Dropdown */}
                                        <div className={`absolute top-full left-0 mt-2 w-64 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl p-2 transition-all duration-300 origin-top-left ${isToolsOpen ? 'opacity-100 scale-100 translate-y-0 visible-none' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                                            <div className="grid gap-1">
                                                {item.subItems.map((subItem) => {
                                                    const SubIcon = subItem.icon;
                                                    const isSubActive = location.pathname === subItem.path;
                                                    return (
                                                        <Link
                                                            key={subItem.path}
                                                            to={subItem.path}
                                                            className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 ${isSubActive
                                                                ? 'bg-white/10 text-white'
                                                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                                                }`}
                                                        >
                                                            <div className={`p-2 rounded-lg ${isSubActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5'}`}>
                                                                <SubIcon size={18} />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-semibold">{subItem.label}</div>
                                                                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{subItem.description}</div>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.label}
                                    to={item.path!}
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
                        onClick={() => setIsMenuOpen(true)}
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors relative z-[120]"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            <div
                className={`fixed inset-0 z-[9999] md:hidden transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Drawer Content Container */}
                <div
                    className={`absolute top-0 right-0 w-80 h-full bg-[#020617] border-l border-white/10 shadow-2xl transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col pointer-events-auto`}
                >
                    {/* Header inside drawer */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#020617]">
                        <span className="text-xl font-bold text-white">Menu</span>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Items container */}
                    <div className="flex-1 overflow-y-auto p-6 bg-[#020617]">
                        <div className="flex flex-col gap-8">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = item.path ? location.pathname === item.path : false;

                                if (item.subItems) {
                                    return (
                                        <div key={item.label} className="flex flex-col gap-4">
                                            <div className="flex items-center gap-3 px-2 text-indigo-400 font-bold text-xs uppercase tracking-[0.2em] opacity-80">
                                                <Icon size={14} />
                                                <span>{item.label}</span>
                                            </div>

                                            <div className="grid gap-3">
                                                {item.subItems.map((subItem) => {
                                                    const SubIcon = subItem.icon;
                                                    const isSubActive = location.pathname === subItem.path;
                                                    return (
                                                        <Link
                                                            key={subItem.path}
                                                            to={subItem.path}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${isSubActive
                                                                ? 'bg-indigo-500/10 text-white ring-1 ring-indigo-500/30'
                                                                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                                                                }`}
                                                        >
                                                            <div className={`p-2 rounded-lg ${isSubActive ? 'bg-indigo-500 text-white' : 'bg-white/10'}`}>
                                                                <SubIcon size={18} />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-white">{subItem.label}</span>
                                                                <span className="text-[10px] text-slate-500 font-medium">{subItem.description}</span>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.label}
                                        to={item.path!}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${isActive
                                            ? 'bg-indigo-500/10 text-white ring-1 ring-indigo-500/30'
                                            : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg ${isActive ? 'bg-indigo-500 text-white' : 'bg-white/10'}`}>
                                            <Icon size={20} />
                                        </div>
                                        <span className="text-base font-bold text-white">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer inside drawer */}
                    <div className="p-6 border-t border-white/5 bg-[#020617]">
                        <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                            <p className="text-xs text-indigo-400 font-medium text-center">LogicGATE v2.0</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
