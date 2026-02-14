import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Settings2, Cpu, Activity, Lightbulb, Binary, Info, ArrowRight } from 'lucide-react';

type GateType = 'AND' | 'OR' | 'XOR' | 'NAND' | 'NOR' | 'NOT';

const Simulator = () => {
    const [inputA, setInputA] = useState(false);
    const [inputB, setInputB] = useState(false);
    const [gate, setGate] = useState<GateType>('AND');

    const [history, setHistory] = useState<{ gate: string; a: boolean; b: boolean; res: boolean; time: string }[]>([]);

    const result = useMemo(() => {
        let res = false;
        switch (gate) {
            case 'AND': res = inputA && inputB; break;
            case 'OR': res = inputA || inputB; break;
            case 'XOR': res = inputA !== inputB; break;
            case 'NAND': res = !(inputA && inputB); break;
            case 'NOR': res = !(inputA || inputB); break;
            case 'NOT': res = !inputA; break;
        }
        return res;
    }, [inputA, inputB, gate]);

    const addToHistory = () => {
        const entry = {
            gate,
            a: inputA,
            b: inputB,
            res: result,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        setHistory(prev => [entry, ...prev].slice(0, 5));
    };

    useMemo(() => {
        // Debounced history addition would be better but simple useMemo/useEffect for now
    }, [result]);

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
                        <Cpu className="text-white" />
                        Logic Lab <span className="text-slate-400 font-mono text-sm border border-white/10 px-2 py-0.5 rounded bg-white/5">v2.0</span>
                    </h1>
                    <p className="text-slate-400 mt-1">Design and test your digital circuits with real-time feedback.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Control Panel */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-6 text-white font-bold uppercase text-xs tracking-wider">
                            <Settings2 size={16} />
                            Input Configuration
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className={`p-4 rounded-xl border transition-all ${inputA ? 'bg-white/10 border-white/30' : 'bg-black/20 border-white/5'}`}>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="font-bold flex items-center gap-2 text-slate-200">
                                        <Activity size={18} className={inputA ? 'text-white' : 'text-slate-600'} />
                                        Input Signal A
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={inputA}
                                        onChange={(e) => setInputA(e.target.checked)}
                                        className="w-5 h-5 accent-white"
                                    />
                                </label>
                            </div>

                            <div className={`p-4 rounded-xl border transition-all ${inputB ? 'bg-white/10 border-white/30' : 'bg-black/20 border-white/5'} ${gate === 'NOT' ? 'opacity-30 pointer-events-none' : ''}`}>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="font-bold flex items-center gap-2 text-slate-200">
                                        <Activity size={18} className={inputB ? 'text-white' : 'text-slate-600'} />
                                        Input Signal B
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={inputB}
                                        onChange={(e) => setInputB(e.target.checked)}
                                        className="w-5 h-5 accent-white"
                                        disabled={gate === 'NOT'}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-6 text-white font-bold uppercase text-xs tracking-wider">
                            <Cpu size={16} />
                            Select Logic Gate
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {(['AND', 'OR', 'XOR', 'NAND', 'NOR', 'NOT'] as GateType[]).map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setGate(g)}
                                    className={`py-3 rounded-xl font-bold transition-all border ${gate === g
                                        ? 'bg-white text-black border-white scale-[1.02] shadow-lg shadow-white/20'
                                        : 'bg-black/20 text-slate-400 border-white/5 hover:border-white/20 hover:text-slate-200'
                                        }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Visualization Engine */}
                <div className="lg:col-span-8 bg-black/40 rounded-3xl border border-white/10 p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px] backdrop-blur-md">
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                    <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 py-8 md:py-0">
                        {/* Inputs */}
                        <div className="flex flex-row md:flex-col gap-4 md:gap-12">
                            <div className="flex flex-col md:flex-row items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${inputA ? 'bg-white shadow-[0_0_15px_white]' : 'bg-slate-800'}`}></div>
                                <div className={`w-1 h-8 md:h-1 md:w-20 rounded-full ${inputA ? 'bg-white' : 'bg-slate-800'}`}></div>
                            </div>
                            <div className={`flex flex-col md:flex-row items-center gap-2 ${gate === 'NOT' ? 'invisible' : ''}`}>
                                <div className={`w-3 h-3 rounded-full ${inputB ? 'bg-white shadow-[0_0_15px_white]' : 'bg-slate-800'}`}></div>
                                <div className={`w-1 h-8 md:h-1 md:w-20 rounded-full ${inputB ? 'bg-white' : 'bg-slate-800'}`}></div>
                            </div>
                        </div>

                        {/* Gate Display */}
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-black/60 border-4 border-white/20 flex items-center justify-center relative group backdrop-blur-xl shrink-0">
                            <div className={`absolute inset-0 rounded-full transition-all duration-500 ${result ? 'bg-white/10 blur-2xl' : ''}`}></div>
                            <span className="text-4xl md:text-6xl font-black text-white tracking-tighter transition-all group-hover:scale-110">
                                {gate}
                            </span>

                            {/* Decorative Wires inside - Horizontal (Desktop) */}
                            <div className={`hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 w-16 h-1 rounded-full transition-all duration-300 ${result ? 'bg-white shadow-[0_0_10px_white]' : 'bg-slate-800'}`}></div>

                            {/* Decorative Wires inside - Vertical (Mobile) */}
                            <div className={`md:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 w-1 h-16 rounded-full transition-all duration-300 ${result ? 'bg-white shadow-[0_0_10px_white]' : 'bg-slate-800'}`}></div>
                        </div>

                        {/* Output */}
                        <div className="flex flex-col items-center gap-4">
                            <div className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center border-4 transition-all duration-500 ${result
                                ? 'bg-white/10 border-white shadow-[0_0_30px_rgba(255,255,255,0.3)]'
                                : 'bg-black/40 border-slate-800'
                                }`}>
                                <Lightbulb size={32} className={`md:w-10 md:h-10 transition-all duration-500 ${result ? 'text-white fill-white/50 scale-125' : 'text-slate-700'}`} />
                            </div>
                            <span className={`font-mono text-xs md:text-sm font-bold tracking-widest ${result ? 'text-white' : 'text-slate-600'}`}>
                                {result ? 'SIGNAL_HIGH' : 'SIGNAL_LOW'}
                            </span>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] font-mono text-slate-500 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${result ? 'bg-white' : 'bg-slate-600'}`}></span>
                        CORE_ENGINE_ACTIVE
                    </div>

                    <button
                        onClick={addToHistory}
                        className="absolute bottom-6 right-6 px-3 py-1 bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] font-mono rounded-full border border-white/10 transition-colors"
                    >
                        LOG_SNAPSHOT
                    </button>
                </div>

                {/* Advanced Info Section */}
                <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Binary size={14} className="text-white" />
                            Simulation History
                        </h3>
                        <div className="space-y-2">
                            {history.length === 0 ? (
                                <p className="text-slate-600 text-sm italic py-4">No snapshots recorded yet...</p>
                            ) : (
                                history.map((entry, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/5 animate-in slide-in-from-left-4 duration-300">
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] text-slate-600 font-mono">{entry.time}</span>
                                            <span className="px-2 py-0.5 bg-white/10 text-white text-[10px] font-bold rounded">{entry.gate}</span>
                                        </div>
                                        <div className="flex items-center gap-3 font-mono text-xs">
                                            <span className="text-slate-500">A:{entry.a ? '1' : '0'} B:{entry.gate === 'NOT' ? '-' : (entry.b ? '1' : '0')}</span>
                                            <span className="text-slate-400">→</span>
                                            <span className={entry.res ? 'text-white font-bold' : 'text-slate-600'}>{entry.res ? '1' : '0'}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Info size={14} className="text-white" />
                            Gate Specifications
                        </h3>
                        <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                            <h4 className="text-white font-bold text-lg mb-2">{gate} Operations</h4>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                {gate === 'AND' && 'The output is HIGH (1) only if both the first and second inputs are HIGH (1).'}
                                {gate === 'OR' && 'The output is HIGH (1) if either the first input or the second input is HIGH (1).'}
                                {gate === 'XOR' && 'The output is HIGH (1) if the inputs are different, and LOW (0) if they are the same.'}
                                {gate === 'NAND' && 'A NOT-AND operation. The output is LOW (0) only if both inputs are HIGH (1).'}
                                {gate === 'NOR' && 'A NOT-OR operation. The output is HIGH (1) only if both inputs are LOW (0).'}
                                {gate === 'NOT' && 'The output is the opposite of the input. Also known as an Inverter.'}
                            </p>
                            <div className="flex gap-2">
                                <Link to="/truth-tables" className="text-xs text-white hover:text-slate-200 flex items-center gap-1 transition-colors">
                                    View Truth Table Reference <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Simulator;
