"use client";
import React, { useState } from 'react';
import { ShieldCheck, Database, Receipt, BrainCircuit, Activity, CheckCircle2, Send, Info } from 'lucide-react';

type AgentMessage = {
  from: string;
  to: string;
  payload: string;
  timestamp: string;
  status: 'info' | 'success' | 'warning';
};

const STEPS_INFO = [
  {
    title: "Step 1: Ingestione e Decomposizione",
    desc: "L'input non strutturato (ricevuta) viene inviato all'Agente Estrattore. Qui applichiamo principi di System Engineering per trasformare dati grezzi in metadati strutturati tramite LLM (IBM Granite)."
  },
  {
    title: "Step 2: Sintesi del Sistema",
    desc: "L'ACP funge da 'bus' di comunicazione. L'estrattore passa il JSON al Policy Agent. L'architettura è modulare: potrei cambiare il modello di estrazione senza impattare la logica di business."
  },
  {
    title: "Step 3: Sistemi Stocastici e Regole",
    desc: "Il Policy Agent valuta la conformità. In caso di incertezza (modello probabilistico), il protocollo ACP instrada la richiesta verso un sistema di validazione o un budget check."
  },
  {
    title: "Step 4: Governance e Human-in-the-Loop",
    desc: "Se viene rilevata una violazione, l'ACP attiva il layer di Governance. Viene creato un Audit Trail immutabile e la decisione finale viene delegata a un supervisore umano."
  }
];

export default function ACPDemo() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<AgentMessage[]>([]);
  const [activeStep, setActiveStep] = useState(-1);

  const addLog = (from: string, to: string, payload: string, status: 'info' | 'success' | 'warning' = 'info') => {
    const newLog = {
      from, to, payload, status,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const simulateProcess = async () => {
    setIsProcessing(true);
    setLogs([]);
    setActiveStep(0);
    addLog("User_Interface", "Extractor_Agent", "Invio ricevuta (Cena Business - 85€)", "info");
    await new Promise(r => setTimeout(r, 2000));

    setActiveStep(1);
    addLog("Extractor_Agent", "Policy_Agent", "Dati: { importo: 85, cat: 'Food' }", "success");
    await new Promise(r => setTimeout(r, 2000));

    setActiveStep(2);
    addLog("Policy_Agent", "Budget_Agent", "Verifica limite 'Food' (Cap: 50€)", "warning");
    await new Promise(r => setTimeout(r, 2000));

    setActiveStep(3);
    addLog("Governance_Layer", "User_Interface", "Violazione Policy: Richiesta approvazione Manager.", "warning");
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      <header className="max-w-6xl mx-auto mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-blue-800 tracking-tighter">IBM ACP PROTOTYPE</h1>
          <p className="text-slate-500 font-medium">Cognitive Solution Architecture | Multi-Agent Orchestration</p>
        </div>
        <div className="text-right text-xs text-slate-400 font-mono">
          DOC_ID: IBM-EXP-2026<br/>STATUS: AGENTIC_FLOW_ACTIVE
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Box di Controllo */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Receipt size={20}/></div>
                <h2 className="font-bold">Expense Validation Flow</h2>
              </div>
              <button 
                onClick={simulateProcess}
                disabled={isProcessing}
                className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all ${isProcessing ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg active:scale-95'}`}
              >
                {isProcessing ? "Processing..." : "Start ACP Flow"}
              </button>
            </div>

            {/* Architectural Insight Box */}
            <div className="min-h-25 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <div className="flex gap-2 text-blue-700 mb-1">
                <Info size={16} />
                <span className="text-xs font-bold uppercase">Architectural Insight</span>
              </div>
              {activeStep === -1 ? (
                <p className="text-sm text-blue-900/70 italic">Avvia il workflow per vedere l'analisi dell'architetto in tempo reale.</p>
              ) : (
                <div>
                  <h4 className="text-sm font-bold text-blue-900">{STEPS_INFO[activeStep].title}</h4>
                  <p className="text-sm text-blue-800/80 leading-relaxed">{STEPS_INFO[activeStep].desc}</p>
                </div>
              )}
            </div>
          </div>

          {/* Grid Agenti */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "Extractor Agent", icon: BrainCircuit, color: "text-purple-500" },
              { name: "Policy Agent", icon: ShieldCheck, color: "text-emerald-500" },
              { name: "Budget Agent", icon: Database, color: "text-amber-500" },
              { name: "Governance Layer", icon: CheckCircle2, color: "text-blue-500" }
            ].map((agent, i) => (
              <div key={i} className={`p-6 rounded-2xl border-2 transition-all duration-500 bg-white ${activeStep === i ? 'border-blue-500 shadow-xl -translate-y-1' : 'border-slate-100 opacity-60'}`}>
                <agent.icon className={`${activeStep === i ? agent.color : 'text-slate-300'} mb-3`} size={32} />
                <h3 className="font-bold text-slate-800">{agent.name}</h3>
                <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full bg-blue-500 transition-all duration-1000 ${activeStep === i ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protocol Stream (Logs) */}
        <div className="bg-[#0a0a0a] rounded-2xl shadow-2xl flex flex-col h-screen border border-slate-800">
          <div className="p-4 border-b border-slate-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">ACP Protocol Real-time Stream</span>
          </div>
          <div className="p-6 overflow-y-auto flex-1 font-mono text-[11px] space-y-4">
            {logs.map((log, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-right duration-500">
                <div className="flex justify-between text-slate-500 text-[9px] mb-1">
                  <span>{log.from} &gt;&gt; {log.to}</span>
                  <span>{log.timestamp}</span>
                </div>
                <div className={`p-2 rounded ${log.status === 'warning' ? 'bg-yellow-500/10 text-yellow-200 border border-yellow-500/20' : 'bg-blue-500/5 text-blue-200 border border-blue-500/20'}`}>
                  {log.payload}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}