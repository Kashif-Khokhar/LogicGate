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
            <div className="min-h-screen text-slate-200 selection:bg-white/20 selection:text-white">
                <Navbar />
                <main className="container mx-auto px-4 py-8 max-w-6xl">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/simulator" element={<Simulator />} />
                        <Route path="/truth-tables" element={<TruthTables />} />
                    </Routes>
                </main>
                <footer className="border-t border-white/5 py-8 mt-12 backdrop-blur-sm bg-black/20">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-slate-500 text-sm">
                            &copy; {new Date().getFullYear()} LogicGate | Advanced Digital Simulation Lab
                        </div>

                        <div className="flex items-center gap-6">
                            <a
                                href="https://github.com/Kashif-Khokhar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                            >
                                <Github size={20} className="group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-medium uppercase tracking-wider hidden md:block">GitHub</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/kashif-ali-khokhar/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                            >
                                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-medium uppercase tracking-wider hidden md:block">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
