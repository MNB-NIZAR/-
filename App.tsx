
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal as TerminalIcon, Shield, Database, Lock, User, Activity, Globe, Wifi } from 'lucide-react';
import MatrixBackground from './components/MatrixBackground';
import HackerText from './components/HackerText';
import { LogMessage } from './types';
import { generateHackerIntelligence, getManifesto } from './services/geminiService';

const App: React.FC = () => {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [activeUser, setActiveUser] = useState<string | null>(null);
  const [manifesto, setManifesto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [breachLevel, setBreachLevel] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((text: string, type: LogMessage['type'] = 'info') => {
    const newLog: LogMessage = {
      id: Math.random().toString(36).substring(7),
      text,
      type,
      timestamp: new Date().toLocaleTimeString(),
    };
    setLogs(prev => [...prev.slice(-49), newLog]);
  }, []);

  useEffect(() => {
    addLog("System Initialized. Awaiting Input...", "success");
    addLog("Matrix Protocol V4.2 - Link Active", "info");
  }, [addLog]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const handleNameClick = async (name: string) => {
    setActiveUser(name);
    setLoading(true);
    setBreachLevel(0);
    addLog(`Initiating deep probe on target: ${name}`, "warning");
    
    // Simulate breach progress
    const interval = setInterval(() => {
      setBreachLevel(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 300);

    try {
      const [intel, manifestoText] = await Promise.all([
        generateHackerIntelligence(name),
        getManifesto(name)
      ]);
      
      intel.forEach((line, idx) => {
        setTimeout(() => addLog(line, "info"), idx * 800);
      });
      
      setTimeout(() => {
        setManifesto(manifestoText);
        addLog(`Intelligence Report for ${name} Complete.`, "success");
        setLoading(false);
        setBreachLevel(100);
      }, intel.length * 800 + 500);

    } catch (error) {
      addLog("External processing failed. Falling back to internal protocols.", "error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col md:flex-row bg-black text-green-500 selection:bg-green-500 selection:text-black">
      <MatrixBackground />

      {/* Sidebar Controls */}
      <div className="w-full md:w-20 bg-black/80 border-b md:border-b-0 md:border-l border-green-900 flex flex-row md:flex-col items-center py-4 px-2 z-20 gap-4 overflow-x-auto">
        <div className="p-3 border border-green-500/50 rounded hover:bg-green-500/10 cursor-pointer transition-colors" title="Home">
           <Globe size={24} />
        </div>
        <div className="p-3 border border-green-500/50 rounded hover:bg-green-500/10 cursor-pointer transition-colors" title="System Security">
           <Shield size={24} />
        </div>
        <div className="p-3 border border-green-500/50 rounded hover:bg-green-500/10 cursor-pointer transition-colors" title="Database Access">
           <Database size={24} />
        </div>
        <div className="p-3 border border-green-500/50 rounded hover:bg-green-500/10 cursor-pointer transition-colors" title="Active Nodes">
           <Wifi size={24} />
        </div>
        <div className="mt-auto p-3 border border-green-500/50 rounded hover:bg-green-500/10 cursor-pointer transition-colors" title="Lock System">
           <Lock size={24} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 md:p-8 z-20 space-y-8 overflow-y-auto">
        <header className="flex justify-between items-center border-b border-green-900 pb-4">
          <div className="flex items-center gap-3">
             <TerminalIcon className="animate-pulse" />
             <h1 className="text-2xl font-bold tracking-tighter">MNB_NIZAR_SYS</h1>
          </div>
          <div className="text-xs font-mono hidden md:block">
            IP: 192.168.1.104 | LOC: UNKNOWN | UPTIME: 34:12:05
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-center items-center gap-12 text-center py-10">
          <div className="space-y-4">
            <p className="text-sm font-mono opacity-60">SELECT TARGET TO BREACH / اختر الهدف للاختراق</p>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <HackerText 
                text="MNB" 
                className="text-7xl md:text-9xl font-black text-green-500" 
                onClick={() => handleNameClick('MNB')}
              />
              <span className="text-4xl text-green-900/50 hidden md:inline">|</span>
              <HackerText 
                text="NIZAR" 
                className="text-7xl md:text-9xl font-black text-green-500" 
                onClick={() => handleNameClick('NIZAR')}
              />
            </div>
          </div>

          {activeUser && (
            <div className="w-full max-w-2xl bg-black/60 border border-green-500/30 p-6 rounded backdrop-blur-md space-y-4 text-right animate-in fade-in zoom-in duration-500">
               <div className="flex items-center justify-between border-b border-green-900 pb-2">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/50" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                   <div className="w-3 h-3 rounded-full bg-green-500/50" />
                 </div>
                 <h2 className="text-lg font-bold flex items-center gap-2">
                   <User size={18} />
                   تقرير الاستخبارات: {activeUser}
                 </h2>
               </div>
               
               {loading ? (
                 <div className="space-y-4 py-4">
                    <div className="h-2 bg-green-900/30 w-full rounded overflow-hidden">
                      <div 
                        className="h-full bg-green-500 transition-all duration-300 shadow-[0_0_10px_#0f0]"
                        style={{ width: `${breachLevel}%` }}
                      />
                    </div>
                    <p className="animate-pulse text-sm">...جاري فك التشفير والوصول للبيانات</p>
                 </div>
               ) : (
                 <div className="space-y-6">
                   {manifesto && (
                     <p className="text-xl md:text-2xl font-serif italic text-white/90 leading-relaxed tracking-wide">
                        "{manifesto}"
                     </p>
                   )}
                   <div className="grid grid-cols-2 gap-4 text-xs font-mono opacity-80 text-left">
                     <div className="p-2 border border-green-900/50">LEVEL: OMEGA</div>
                     <div className="p-2 border border-green-900/50">CLASS: PHANTOM</div>
                     <div className="p-2 border border-green-900/50">ENCRYPTION: AES-512</div>
                     <div className="p-2 border border-green-900/50">STATUS: DOMINANT</div>
                   </div>
                 </div>
               )}
            </div>
          )}
        </main>
      </div>

      {/* Terminal View */}
      <div className="w-full md:w-96 bg-black border-r border-green-900 flex flex-col z-30 shadow-2xl">
        <div className="bg-green-900/20 p-2 flex items-center justify-between border-b border-green-900">
          <div className="flex items-center gap-2 text-xs">
            <Activity size={14} />
            <span>TERMINAL_OUTPUT</span>
          </div>
          <div className="text-[10px] opacity-50">VRS: 8.8.1</div>
        </div>
        <div 
          ref={terminalRef}
          className="flex-1 p-3 font-mono text-xs overflow-y-auto terminal-scroll bg-[#050505]"
        >
          {logs.map((log) => (
            <div key={log.id} className="mb-2 break-all">
              <span className="opacity-40">[{log.timestamp}]</span>{' '}
              <span className={`
                ${log.type === 'error' ? 'text-red-500' : ''}
                ${log.type === 'success' ? 'text-blue-400' : ''}
                ${log.type === 'warning' ? 'text-yellow-500' : ''}
                ${log.type === 'info' ? 'text-green-500' : ''}
              `}>
                {log.type.toUpperCase()}:
              </span>{' '}
              {log.text}
            </div>
          ))}
          <div className="flex gap-2">
            <span className="animate-pulse">_</span>
          </div>
        </div>
        <div className="p-2 border-t border-green-900 bg-black/50">
           <div className="flex items-center gap-2 text-[10px] text-green-700">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
             LIVE FEED: ENCRYPTED TUNNEL ACTIVE
           </div>
        </div>
      </div>
    </div>
  );
};

export default App;
