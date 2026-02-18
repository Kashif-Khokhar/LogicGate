import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import TruthTables from './pages/TruthTables';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col text-slate-200 selection:bg-indigo-500/30 selection:text-white">
                <Navbar />
                <main className="flex-1 container mx-auto px-6 pt-32 pb-12 max-w-6xl relative z-10">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/simulator" element={<Simulator />} />
                        <Route path="/truth-tables" element={<TruthTables />} />
                    </Routes>
                </main>
                <footer className="relative z-10 border-t border-white/5 py-10 mt-20 bg-black/40 backdrop-blur-3xl">
                    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-col items-center md:items-start gap-1">
                            <div className="text-white font-black text-sm tracking-tighter">
                                Logic<span className="text-indigo-400">GATE</span>
                            </div>
                            <div className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                                &copy; {new Date().getFullYear()} Advanced Digital Simulation Lab
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <a
                                href="https://github.com/Kashif-Khokhar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-all transform hover:scale-110 flex items-center gap-2.5 group"
                            >
                                <Github size={20} className="group-hover:text-indigo-400 shadow-xl" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">GitHub</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/kashif-ali-khokhar/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-all transform hover:scale-110 flex items-center gap-2.5 group"
                            >
                                <Linkedin size={20} className="group-hover:text-indigo-400 shadow-xl" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
