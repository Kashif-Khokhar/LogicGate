import { Link } from 'react-router-dom';
import { Cpu, Zap, Binary, BookOpen, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col gap-16 md:gap-24 py-8 md:py-16">
            <section className="text-center max-w-5xl mx-auto flex flex-col items-center gap-6 md:gap-8 relative z-10 px-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs md:text-sm font-medium uppercase tracking-widest animate-pulse backdrop-blur-md">
                    <Zap size={14} className="text-white" />
                    Digital Simulation Reimagined
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 leading-tight tracking-tight drop-shadow-2xl">
                    Master Digital Logic with <span className="text-white">Precision</span>
                </h1>
                <p className="text-slate-400 text-lg md:text-xl md:text-2xl max-w-3xl leading-relaxed drop-shadow-lg">
                    An advanced, professional-grade logic gate simulator designed for engineers, students, and hobbyists. Build, test, and visualize circuits in real-time.
                </p>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-4 md:gap-6 mt-8">
                    <Link
                        to="/simulator"
                        className="px-8 py-4 bg-white text-black hover:bg-slate-200 font-bold rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10 ring-1 ring-white/50"
                    >
                        Launch Simulator <ArrowRight size={20} />
                    </Link>
                    <Link
                        to="/truth-tables"
                        className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all transform hover:scale-105 active:scale-95 backdrop-blur-sm text-center"
                    >
                        Explore Library
                    </Link>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Cpu, title: 'Real-time Simulation', desc: 'Instant feedback with visual signal propagation across wires and gates.' },
                    { icon: Binary, title: 'Complete Logic Set', desc: 'Full support for AND, OR, XOR, NAND, NOR, and NOT gates with truth tables.' },
                    { icon: BookOpen, title: 'Educational Focus', desc: 'Detailed explanations and interactive learning tools for digital electronics.' }
                ].map((feature, i) => (
                    <div key={i} className="bg-white/5 p-10 rounded-3xl border border-white/5 hover:border-white/20 transition-all group backdrop-blur-md hover:bg-white/10">
                        <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/20">
                            <feature.icon className="text-slate-300 group-hover:text-white" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                        <p className="text-slate-400 leading-relaxed text-lg">{feature.desc}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Home;
