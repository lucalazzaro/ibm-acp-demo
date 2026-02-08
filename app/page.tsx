"use client";
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Receipt, 
  BrainCircuit, 
  CheckCircle2, 
  Info, 
  ChevronRight, 
  Activity // <--- Aggiungi questa
} from 'lucide-react';

type AgentMessage = {
  from: string;
  to: string;
  payload: string;
  timestamp: string;
  status: 'info' | 'success' | 'warning';
};

const AGENTS_DATA = [
  { 
    id: 0, 
    name: "Extractor Agent", 
    icon: BrainCircuit, 
    label: "Sintesi dei Sistemi",
    title: "Step 1: Ingestione e Decomposizione",
    desc: "L'input non strutturato viene inviato all'Agente Estrattore. Qui applichiamo principi di System Engineering per trasformare dati grezzi in metadati strutturati tramite IBM Granite.",
    log: { from: "User_Interface", to: "Extractor_Agent", msg: "Invio ricevuta (Cena Business - 85€)", type: "info" as const }
  },
  { 
    id: 1, 
    name: "Policy Agent", 
    icon: ShieldCheck, 
    label: "Governance & Compliance",
    title: "Step 2: Business Logic & Rules",
    desc: "L'ACP passa il JSON al Policy Agent. L'architettura è modulare: possiamo aggiornare le policy aziendali centralmente senza modificare i singoli agenti.",
    log: { from: "Extractor_Agent", to: "Policy_Agent", msg: "Dati estratti: { importo: 85, cat: 'Food' }", type: "success" as const }
  },
  { 
    id: 2, 
    name: "Budget Agent", 
    icon: Database, 
    label: "ERP Integration",
    title: "Step 3: Sistemi Stocastici",
    desc: "Il Policy Agent interroga il Budget Agent via ACP. Qui gestiamo la probabilità: se il budget è quasi esaurito, il sistema solleva un alert preventivo.",
    log: { from: "Policy_Agent", to: "Budget_Agent", msg: "Verifica limite 'Food' (Cap: 50€). Risultato: Over-budget.", type: "warning" as const }
  },
  { 
    id: 3, 
    name: "Governance Layer", 
    icon: CheckCircle2, 
    label: "Human-in-the-Loop",
    title: "Step 4: Audit & Decisione Finale",
    desc: "L'ACP attiva il layer di Governance per creare un Audit Trail immutabile. Il processo richiede ora un'approvazione umana per risolvere la violazione di policy.",
    log: { from: "Governance_Layer", to: "User_Interface", msg: "Task creato: Revisione manuale richiesta per spesa 85€.", type: "warning" as const }
  }
];

export default function ACPDemo() {
  const [logs, setLogs] = useState<AgentMessage[]>([]);
  const [activeStep, setActiveStep] = useState(-1);

  const handleStepClick = (stepIndex: number) => {
    // Se lo step è già stato attivato, non aggiungiamo log duplicati ma cambiamo solo la descrizione
    setActiveStep(stepIndex);
    
    const step = AGENTS_DATA[stepIndex];
    const newLog: AgentMessage = {
      from: step.log.from,
      to: step.log.to,
      payload: step.log.msg,
      status: step.log.type,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    // Aggiungiamo il log in coda (Bottom)
    setLogs(prev => [...prev, newLog]);
  };

  const resetFlow = () => {
    setLogs([]);
    setActiveStep(-1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      <header className="max-w-6xl mx-auto mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-blue-800 tracking-tighter uppercase">IBM ACP Explorer</h1>
          <p className="text-slate-500 font-medium">Interactive Multi-Agent Architecture PoC</p>
        </div>
        <button onClick={resetFlow} className="text-xs font-mono text-blue-600 hover:underline">RESET_SYSTEM</button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Box Istruzioni */}
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex items-center gap-4">
            <div className="bg-blue-600 text-white p-2 rounded-full animate-pulse">
              <ChevronRight size={20} />
            </div>
            <p className="text-sm font-medium text-slate-600">
              {activeStep === -1 ? "Clicca sul primo agente (Extractor) per iniziare la simulazione del protocollo." : "Clicca sul prossimo agente per avanzare nel workflow."}
            </p>
          </div>

          {/* Grid Agenti Cliccabili */}
          <div className="grid grid-cols-2 gap-4">
            {AGENTS_DATA.map((agent, i) => (
              <button 
                key={i} 
                onClick={() => handleStepClick(i)}
                disabled={i > activeStep + 1} // Opzionale: costringe l'ordine sequenziale
                className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 bg-white shadow-sm
                  ${activeStep === i ? 'border-blue-500 ring-4 ring-blue-50 shadow-xl scale-[1.02] z-10' : 'border-slate-100'}
                  ${i > activeStep + 1 ? 'opacity-30 grayscale cursor-not-allowed' : 'hover:border-blue-300 opacity-100'}
                `}
              >
                <agent.icon className={`${activeStep === i ? 'text-blue-600' : 'text-slate-400'} mb-3`} size={32} />
                <h3 className="font-bold text-slate-800">{agent.name}</h3>
                <p className="text-xs text-slate-500 uppercase mt-1">{agent.label}</p>
              </button>
            ))}
          </div>

          {/* Box Descrittivo Dinamico */}
          <div className="min-h-35 bg-slate-900 text-white p-6 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 italic font-serif text-4xl">Architect Insight</div>
             {activeStep === -1 ? (
                <div className="flex items-center gap-3 h-full justify-center">
                  <Info className="text-blue-400" />
                  <p className="text-slate-400 uppercase tracking-widest text-xs">In attesa di attivazione protocollo ACP...</p>
                </div>
             ) : (
                <div className="animate-in fade-in zoom-in duration-300">
                  <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400" /> {AGENTS_DATA[activeStep].title}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{AGENTS_DATA[activeStep].desc}</p>
                </div>
             )}
          </div>
        </div>

        {/* Protocol Stream (Logs TOP TO BOTTOM) */}
        <div className="bg-white rounded-2xl shadow-xl flex flex-col h-96 border border-slate-200 overflow-hidden font-mono">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
               <Activity size={12} className="text-blue-500" /> ACP Message Log
            </span>
          </div>
          <div className="p-4 overflow-y-auto flex-1 text-[11px] space-y-4 flex flex-col">
            {logs.length === 0 && <p className="text-slate-400 italic text-center mt-10">Protocollo inattivo</p>}
            {logs.map((log, i) => (
              <div key={i} className="animate-in slide-in-from-top duration-500 border-l-2 border-blue-500 pl-3 py-1 bg-slate-50 rounded-r">
                <div className="flex justify-between text-[9px] text-slate-400 mb-1">
                  <span className="font-bold">{log.from} &gt; {log.to}</span>
                  <span>{log.timestamp}</span>
                </div>
                <div className={`font-bold ${log.status === 'warning' ? 'text-amber-600' : 'text-blue-700'}`}>
                   {log.payload}
                </div>
              </div>
            ))}
            {/* Scroll anchor per forzare la vista in fondo se i log superano l'altezza */}
            <div className="h-4" />
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto mt-10 pt-4 border-t border-slate-200 text-[10px] text-slate-400 flex justify-between uppercase tracking-widest">
        <span>IBM GenAI Engineering Framework</span>
        <span>Confidential - Architect Interview Tool</span>
      </footer>
    </div>
  );
}