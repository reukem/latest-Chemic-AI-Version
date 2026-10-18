import React, { useState } from 'react';
import { useSimulationStore } from '../engine/store';
import { audioManager } from '../engine/AudioManager';

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const rawLanguage = useSimulationStore(state => state.language);
  const isVi = rawLanguage === 'VN' || rawLanguage === 'vi';

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-auto select-none font-sans">
      {/* The Holographic Pop-up Panel */}
      {isOpen && (
        <div className="mb-3.5 p-5 rounded-3xl bg-gradient-to-b from-[#061426]/95 via-[#030914]/95 to-[#01040a]/95 border-2 border-cyan-500/40 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl w-80 transition-all duration-300 overflow-hidden relative animate-in fade-in zoom-in-95">
          {/* Ambient Background Glows */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-cyan-900/40 relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
              <div>
                <h3 className="text-cyan-300 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                  DEV_COMMS <span className="text-slate-500">// v2.0</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  {isVi ? 'Kênh hỗ trợ dự án Chemic-AI' : 'Chemic-AI Support Matrix'}
                </span>
              </div>
            </div>

            <button
              onClick={() => { audioManager.playClick(); setIsOpen(false); }}
              onMouseEnter={() => audioManager.playHover()}
              className="w-6 h-6 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white flex items-center justify-center text-xs font-mono transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col space-y-2.5 relative z-10">
            {/* Email Link */}
            <a 
              href="mailto:support@chemic-ai.org" 
              onClick={() => audioManager.playClick()}
              onMouseEnter={() => audioManager.playHover()}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#071628]/80 hover:bg-[#0a2340] border border-cyan-950 hover:border-cyan-400/80 transition-all group shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 group-hover:border-cyan-400 flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] transition-all">
                  <svg className="w-4 h-4 text-cyan-400 group-hover:text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] text-slate-400 font-mono uppercase tracking-widest">
                    {isVi ? 'HÒM THƯ DỰ ÁN' : 'PROJECT MAIL'}
                  </span>
                  <span className="text-xs font-bold text-slate-200 font-mono group-hover:text-cyan-300 transition-colors truncate">
                    support@chemic-ai.org
                  </span>
                </div>
              </div>
              <span className="text-cyan-500 group-hover:translate-x-0.5 transition-transform text-xs font-mono">➔</span>
            </a>

            {/* YouTube Link */}
            <a 
              href="https://www.youtube.com/@ChemicAI_Official" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => audioManager.playClick()}
              onMouseEnter={() => audioManager.playHover()}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#071628]/80 hover:bg-[#1f0914] border border-cyan-950 hover:border-rose-500/80 transition-all group shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500/20 to-red-600/20 border border-rose-500/40 group-hover:border-rose-400 flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-[0_0_12px_rgba(244,63,94,0.3)] transition-all">
                  <svg className="w-4 h-4 text-rose-400 group-hover:text-rose-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] text-slate-400 font-mono uppercase tracking-widest">
                    {isVi ? 'KÊNH HỌC TẬP' : 'ACADEMY CHANNEL'}
                  </span>
                  <span className="text-xs font-bold text-slate-200 font-mono group-hover:text-rose-300 transition-colors truncate">
                    @ChemicAI_Official
                  </span>
                </div>
              </div>
              <span className="text-rose-500 group-hover:translate-x-0.5 transition-transform text-xs font-mono">➔</span>
            </a>
          </div>
        </div>
      )}

      {/* Cyberpunk Toggle Button */}
      <button
        onClick={() => { audioManager.playClick(); setIsOpen(!isOpen); }}
        onMouseEnter={() => audioManager.playHover()}
        className="flex items-center gap-2.5 bg-[#050e1c]/90 hover:bg-cyan-950/70 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400 px-5 py-2.5 rounded-2xl font-mono text-xs font-bold shadow-[0_0_20px_rgba(0,0,0,0.7)] hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] transition-all duration-200 backdrop-blur-xl active:scale-95 group cursor-pointer"
      >
        {isOpen ? (
          <>
            <span className="text-sm text-cyan-400 group-hover:rotate-90 transition-transform">✕</span>
            <span className="tracking-widest uppercase">{isVi ? 'ĐÓNG LIÊN LẠC' : 'CLOSE COMMS'}</span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
            <span className="tracking-widest uppercase">{isVi ? 'LIÊN HỆ DỰ ÁN' : 'PROJECT CONTACT'}</span>
          </>
        )}
      </button>
    </div>
  );
}
