import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, LayoutDashboard, Binary, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const toolsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-8 pointer-events-none animate-nav-entry">
                <nav className={`container mx-auto max-w-5xl pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${scrolled ? 'translate-y-[-8px]' : 'translate-y-0'}`}>
                    <div className={`relative px-6 h-20 flex items-center justify-between transition-all duration-700 rounded-[2rem] border ${scrolled
                        ? 'bg-black/60 backdrop-blur-3xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                        : 'bg-white/5 backdrop-blur-2xl border-white/10 shadow-none'
                        }`}>

                        {/* Inner Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

                        {/* Brand */}
                        <Link to="/" className="flex items-center gap-4 group relative z-10" onClick={() => setIsMenuOpen(false)}>
                            <div className="relative">
                                <div className="absolute inset-[-4px] bg-white/20 blur-xl rounded-full group-hover:bg-white/40 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                                <div className="relative bg-gradient-to-br from-white/20 to-white/5 p-3 rounded-2xl group-hover:rotate-[-8deg] group-hover:scale-110 transition-all duration-500 shadow-2xl border border-white/20">
                                    <img src="/logo.svg" alt="LogicGate Logo" className="w-5 h-5 brightness-110" />
                                </div>
                            </div>
                            <div className="flex flex-col -gap-1">
                                <span className="text-xl font-black tracking-tight text-white/95">
                                    Logic<span className="text-indigo-400">GATE</span>
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase leading-none">Sim-Lab</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md relative z-10">
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
                                                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-[1.25rem] transition-all duration-500 text-sm font-bold cursor-pointer group ${isToolsOpen
                                                    ? 'bg-white/10 text-white shadow-xl'
                                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                <Icon size={18} className={`${isToolsOpen ? 'scale-110 rotate-12 text-indigo-400' : 'group-hover:scale-110'} transition-all`} />
                                                <span>{item.label}</span>
                                                <ChevronDown size={14} className={`transition-transform duration-500 ${isToolsOpen ? 'rotate-180 text-indigo-400' : ''}`} />
                                            </button>

                                            {/* Desktop Dropdown */}
                                            <div className={`absolute top-[calc(100%+1rem)] right-0 md:left-0 w-80 bg-[#020617]/90 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6)] p-2.5 transition-all duration-500 origin-top-left ${isToolsOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}>
                                                <div className="grid gap-2">
                                                    {item.subItems.map((subItem) => {
                                                        const SubIcon = subItem.icon;
                                                        const isSubActive = location.pathname === subItem.path;
                                                        return (
                                                            <Link
                                                                key={subItem.path}
                                                                to={subItem.path}
                                                                className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 relative group/item overflow-hidden ${isSubActive
                                                                    ? 'bg-white/10 text-white ring-1 ring-white/10'
                                                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                                                    }`}
                                                            >
                                                                {isSubActive && (
                                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 shadow-[0_0_15px_indigo]" />
                                                                )}
                                                                <div className={`p-3 rounded-xl shrink-0 transition-all duration-500 ${isSubActive ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/5 group-hover/item:bg-white/10 group-hover/item:scale-110'}`}>
                                                                    <SubIcon size={20} />
                                                                </div>
                                                                <div className="flex flex-col gap-0.5">
                                                                    <div className="text-sm font-bold tracking-tight">{subItem.label}</div>
                                                                    <div className="text-[11px] text-slate-500 leading-snug font-semibold">{subItem.description}</div>
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
                                        className={`flex items-center gap-2.5 px-6 py-2.5 rounded-[1.25rem] transition-all duration-500 text-sm font-bold relative group ${isActive
                                            ? 'bg-white/10 text-white shadow-xl border border-white/10'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <Icon size={18} className={`${isActive ? 'scale-110 text-indigo-400' : ''} transition-all group-hover:scale-110`} />
                                        <span>{item.label}</span>
                                        {isActive && (
                                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_12px_rgba(129,140,248,0.8)]" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="md:hidden p-3.5 text-white hover:bg-white/10 rounded-2xl transition-all active:scale-90 relative shrink-0 group z-10"
                        >
                            <div className="absolute inset-0 bg-white/5 rounded-2xl animate-pulse opacity-20 group-hover:opacity-40 transition-opacity" />
                            <Menu size={24} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Navigation Drawer - MOVED OUTSIDE HEADER TO PREVENT CONTAINING BLOCK CLIPPING */}
            <div
                className={`fixed inset-0 z-[99999] md:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}
            >
                {/* Backdrop with extreme blur */}
                <div
                    className={`absolute inset-0 bg-black/80 backdrop-blur-2xl transition-opacity duration-700 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Drawer Content Container - Floating Style */}
                <div
                    className={`absolute top-4 bottom-4 right-4 w-[calc(100%-2rem)] max-w-[320px] bg-[#020617]/95 backdrop-blur-3xl border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'} flex flex-col pointer-events-auto overflow-hidden`}
                >
                    {/* Header inside drawer */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tighter text-white">MENU</span>
                            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest leading-none mt-1">LogicGate Lab</span>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-3 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all active:rotate-90 shadow-lg border border-white/5"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Items container */}
                    <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
                        <div className="flex flex-col gap-6">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = item.path ? location.pathname === item.path : false;

                                if (item.subItems) {
                                    return (
                                        <div key={item.label} className="flex flex-col gap-4">
                                            <div className="flex items-center gap-2 px-2">
                                                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                                                    <Icon size={14} />
                                                </div>
                                                <span className="text-indigo-400 font-black text-[9px] uppercase tracking-[0.2em]">{item.label}</span>
                                            </div>

                                            <div className="grid gap-2.5">
                                                {item.subItems.map((subItem) => {
                                                    const SubIcon = subItem.icon;
                                                    const isSubActive = location.pathname === subItem.path;
                                                    return (
                                                        <Link
                                                            key={subItem.path}
                                                            to={subItem.path}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 relative group overflow-hidden ${isSubActive
                                                                ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/30'
                                                                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                                                                }`}
                                                        >
                                                            <div className={`p-3 rounded-xl transition-all duration-500 ${isSubActive ? 'bg-white/20 text-white shadow-inner' : 'bg-white/5'}`}>
                                                                <SubIcon size={20} />
                                                            </div>
                                                            <div className="flex flex-col gap-0">
                                                                <span className="text-base font-black tracking-tight">{subItem.label}</span>
                                                                <span className={`text-[10px] font-bold ${isSubActive ? 'text-indigo-100/70' : 'text-slate-500'}`}>{subItem.description}</span>
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
                                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 relative group overflow-hidden ${isActive
                                            ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/30'
                                            : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <div className={`p-3.5 rounded-xl transition-all duration-500 ${isActive ? 'bg-white/20 text-white scale-110 shadow-inner' : 'bg-white/10'}`}>
                                            <Icon size={22} />
                                        </div>
                                        <span className="text-lg font-black tracking-tight">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer inside drawer */}
                    <div className="p-6 border-t border-white/5">
                        <div className="relative group overflow-hidden rounded-[1.5rem] p-4 border border-white/5 bg-white/5 text-center">
                            <div className="absolute inset-0 bg-indigo-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                            <p className="relative text-[9px] text-indigo-400 font-black tracking-[0.2em] uppercase mb-0.5">LogicGATE v2.0</p>
                            <p className="relative text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Premium Simulation Lab</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
