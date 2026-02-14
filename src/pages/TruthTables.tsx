import { Binary, Check, X } from 'lucide-react';

const gates = [
    { name: 'AND', desc: 'Output is 1 only if both inputs are 1.', table: [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]] },
    { name: 'OR', desc: 'Output is 1 if at least one input is 1.', table: [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 1]] },
    { name: 'XOR', desc: 'Output is 1 if inputs are different.', table: [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0]] },
    { name: 'NAND', desc: 'Opposite of AND. Output is 0 only if both inputs are 1.', table: [[0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 0]] },
    { name: 'NOR', desc: 'Opposite of OR. Output is 1 only if both inputs are 0.', table: [[0, 0, 1], [0, 1, 0], [1, 0, 0], [1, 1, 0]] },
    { name: 'NOT', desc: 'Inverts the input. Only takes one input.', table: [[0, '-', 1], [1, '-', 0]] },
];

const TruthTables = () => {
    return (
        <div className="flex flex-col gap-10 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="border-b border-white/10 pb-6">
                <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
                    <Binary className="text-white" />
                    Binary Truth Tables
                </h1>
                <p className="text-slate-400 mt-1">Complete reference for fundamental logic operations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gates.map((gate) => (
                    <div key={gate.name} className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden flex flex-col hover:border-white/20 transition-all group backdrop-blur-sm">
                        <div className="p-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white group-hover:scale-110 transition-transform">{gate.name}</h3>
                            <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 bg-black/20 rounded">REF:LOGIC_{gate.name}</span>
                        </div>
                        <div className="p-5">
                            <p className="text-slate-400 text-sm mb-6 h-auto md:h-10">{gate.desc}</p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-center border-collapse min-w-[200px]">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="py-2 text-xs font-bold text-slate-500">A</th>
                                            <th className="py-2 text-xs font-bold text-slate-500">B</th>
                                            <th className="py-2 text-xs font-bold text-white">RES</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-mono text-sm">
                                        {gate.table.map((row, i) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                                <td className="py-3 text-slate-300">{row[0]}</td>
                                                <td className="py-3 text-slate-300">{row[1]}</td>
                                                <td className="py-3 font-bold">
                                                    <span className={`flex items-center justify-center ${row[2] === 1 ? 'text-white' : 'text-slate-700'}`}>
                                                        {row[2] === 1 ? <Check size={16} /> : <X size={16} />}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TruthTables;
