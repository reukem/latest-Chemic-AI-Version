import React, { useState, useEffect, useRef } from 'react';
import { audioManager } from '../engine/AudioManager';

interface GalvanicCellModalProps {
  isOpen: boolean;
  onClose: () => void;
  isVi?: boolean;
}

export const GalvanicCellModal: React.FC<GalvanicCellModalProps> = ({ isOpen, onClose, isVi = false }) => {
  const [subMode, setSubMode] = useState<'DANIELL' | 'ELECTROLYSIS'>('DANIELL');

  // Daniell Cell Parameters
  const [isSwitchClosed, setIsSwitchClosed] = useState<boolean>(true);
  const [znConc, setZnConc] = useState<number>(0.1); // Molar (0.01 to 2.0)
  const [cuConc, setCuConc] = useState<number>(1.0); // Molar (0.01 to 2.0)
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Electrolysis Parameters
  const [voltage, setVoltage] = useState<number>(4.5); // Volts
  const [currentAmps, setCurrentAmps] = useState<number>(2.0); // Amperes
  const [electrolyteType, setElectrolyteType] = useState<'CuSO4' | 'NaCl'>('CuSO4');
  const [electrolysisTimeSec, setElectrolysisTimeSec] = useState<number>(60);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Calculate live Nernst Potential for Daniell Cell: E = E0 - (0.0592/2) * log10([Zn2+]/[Cu2+])
  const standardCellPotential = 1.10; // Volts
  const currentCellPotential = Number(
    (standardCellPotential - (0.0592 / 2) * Math.log10(znConc / cuConc)).toFixed(3)
  );

  // Faraday Law for Electrolysis: m = (A * I * t) / (n * F)
  // Cu: A = 63.55, n = 2, F = 96485
  const cuPlatedGrams = Number(
    ((63.55 * currentAmps * electrolysisTimeSec) / (2 * 96485)).toFixed(4)
  );
  // Cl2 gas volume (liters at 25°C, 1 atm): V = (I * t / (2 * 96485)) * 24.79
  const cl2Liters = Number(
    (((currentAmps * electrolysisTimeSec) / (2 * 96485)) * 24.79).toFixed(4)
  );

  // Canvas animation loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      if (subMode === 'DANIELL') {
        // --- 1. RENDER DANIELL GALVANIC CELL ---
        const b1X = w * 0.18;
        const b2X = w * 0.58;
        const beakerW = w * 0.24;
        const beakerH = h * 0.48;
        const beakerY = h * 0.42;

        // Beaker 1: ZnSO4 (Clear fluid)
        ctx.fillStyle = 'rgba(224, 242, 254, 0.4)';
        ctx.fillRect(b1X, beakerY + 30, beakerW, beakerH - 30);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(b1X, beakerY, beakerW, beakerH);

        // Beaker 2: CuSO4 (Deep Azure Sapphire Blue fluid)
        ctx.fillStyle = 'rgba(2, 132, 199, 0.55)';
        ctx.fillRect(b2X, beakerY + 30, beakerW, beakerH - 30);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(b2X, beakerY, beakerW, beakerH);

        // Anode: Zinc Electrode (Zn, Silvery grey plate)
        const znX = b1X + beakerW * 0.35;
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(znX, beakerY - 35, 24, beakerH + 15);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(znX, beakerY - 35, 24, beakerH + 15);
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('Zn (-)', znX - 2, beakerY - 42);

        // Cathode: Copper Electrode (Cu, Reddish-brown plate)
        const cuX = b2X + beakerW * 0.45;
        ctx.fillStyle = '#b45309';
        ctx.fillRect(cuX, beakerY - 35, 26, beakerH + 15);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cuX, beakerY - 35, 26, beakerH + 15);
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('Cu (+)', cuX - 2, beakerY - 42);

        // Salt Bridge (Cầu Muối KNO3 U-tube)
        const sbLeft = b1X + beakerW * 0.65;
        const sbRight = b2X + beakerW * 0.15;
        const sbTop = beakerY + 15;
        const sbH = beakerH * 0.65;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(sbLeft, sbTop + sbH);
        ctx.lineTo(sbLeft, sbTop);
        ctx.lineTo(sbRight, sbTop);
        ctx.lineTo(sbRight, sbTop + sbH);
        ctx.stroke();

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('CẦU MUỐI (KNO₃)', (sbLeft + sbRight) / 2 - 42, sbTop - 6);

        // External Wire & Circuit
        const wireTop = h * 0.15;
        ctx.strokeStyle = isSwitchClosed ? '#22c55e' : '#94a3b8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(znX + 12, beakerY - 35);
        ctx.lineTo(znX + 12, wireTop);
        ctx.lineTo(cuX + 13, wireTop);
        ctx.lineTo(cuX + 13, beakerY - 35);
        ctx.stroke();

        // Digital Voltmeter Box (Centered on wire)
        const vmX = (znX + cuX) / 2 - 45;
        const vmY = wireTop - 25;
        ctx.fillStyle = '#020617';
        ctx.fillRect(vmX, vmY, 90, 48);
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.strokeRect(vmX, vmY, 90, 48);

        // Voltmeter Readout
        ctx.fillStyle = '#22d3ee';
        ctx.font = 'bold 15px monospace';
        const displayV = isSwitchClosed ? `${currentCellPotential.toFixed(3)} V` : '0.000 V';
        ctx.fillText(displayV, vmX + 12, vmY + 30);

        // Animated Electron Flow Dots (Moving Zn -> Cu along the wire)
        if (isSwitchClosed) {
          const wireLen = cuX - znX;
          const eOffset = (tick * 2) % wireLen;
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(znX + 12 + eOffset, wireTop, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#fde047';
          ctx.font = '10px monospace';
          ctx.fillText('e⁻ →', znX + 12 + eOffset - 6, wireTop - 8);
        }

      } else {
        // --- 2. RENDER ELECTROLYSIS APPARATUS ---
        const bX = w * 0.28;
        const bW = w * 0.44;
        const bH = h * 0.52;
        const bY = h * 0.38;

        // Electrolytic Solution
        ctx.fillStyle = electrolyteType === 'CuSO4' ? 'rgba(2, 132, 199, 0.65)' : 'rgba(224, 242, 254, 0.45)';
        ctx.fillRect(bX, bY + 30, bW, bH - 30);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.strokeRect(bX, bY, bW, bH);

        // Graphite Anode (+)
        const anX = bX + bW * 0.25;
        ctx.fillStyle = '#334155';
        ctx.fillRect(anX, bY - 40, 28, bH + 20);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(anX, bY - 40, 28, bH + 20);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('Anot (+)', anX - 8, bY - 46);

        // Graphite Cathode (-)
        const catX = bX + bW * 0.65;
        ctx.fillStyle = electrolyteType === 'CuSO4' ? '#b45309' : '#334155';
        ctx.fillRect(catX, bY - 40, 28, bH + 20);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.strokeRect(catX, bY - 40, 28, bH + 20);
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('Catot (-)', catX - 8, bY - 46);

        // DC Power Supply Unit
        const psuX = w * 0.42;
        const psuY = h * 0.08;
        ctx.fillStyle = '#020617';
        ctx.fillRect(psuX, psuY, 120, 56);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.strokeRect(psuX, psuY, 120, 56);

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(`DC: ${voltage}V / ${currentAmps}A`, psuX + 10, psuY + 32);

        // Wire connecting Anode to PSU (+) and Cathode to PSU (-)
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(anX + 14, bY - 40);
        ctx.lineTo(anX + 14, psuY + 28);
        ctx.lineTo(psuX, psuY + 28);
        ctx.stroke();

        ctx.strokeStyle = '#3b82f6';
        ctx.beginPath();
        ctx.moveTo(catX + 14, bY - 40);
        ctx.lineTo(catX + 14, psuY + 28);
        ctx.lineTo(psuX + 120, psuY + 28);
        ctx.stroke();

        // Animated Gas Bubbles at Anode
        for (let b = 0; b < 6; b++) {
          const bubY = (bY + bH * 0.8) - ((tick * 1.8 + b * 25) % (bH * 0.7));
          ctx.fillStyle = electrolyteType === 'NaCl' ? 'rgba(163, 230, 53, 0.75)' : 'rgba(255, 255, 255, 0.75)';
          ctx.beginPath();
          ctx.arc(anX + 14 + Math.sin(tick * 0.1 + b) * 8, bubY, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Bubbles at Cathode (if NaCl)
        if (electrolyteType === 'NaCl') {
          for (let b = 0; b < 6; b++) {
            const bubY = (bY + bH * 0.8) - ((tick * 2.0 + b * 22) % (bH * 0.7));
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(catX + 14 + Math.sin(tick * 0.1 + b) * 8, bubY, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isOpen, subMode, isSwitchClosed, znConc, cuConc, voltage, currentAmps, electrolyteType, currentCellPotential]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-[#020712]/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 font-sans select-none animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-gradient-to-b from-[#061528] via-[#040e1c] to-[#020814] border-2 border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(34,211,238,0.25)] flex flex-col overflow-hidden max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-cyan-900/60 bg-[#040f20]/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              ⚡
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase font-mono">
                  {isVi ? 'XƯỞNG PIN ĐIỆN HÓA & ĐIỆN PHÂN NĂNG LƯỢNG' : 'GALVANIC CELL & ELECTROLYSIS WORKBENCH'}
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-700/60 text-emerald-300 font-mono text-[10px] font-bold">
                  GDPT 2018 LỚP 12
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isVi ? 'Mô phỏng Pin Daniell, thế điện cực Nernst & định luật điện phân Faraday' : 'Daniell cell potential, Nernst equation & Faraday electrolysis'}
              </p>
            </div>
          </div>

          {/* Submode Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex bg-[#020712] p-1 rounded-2xl border border-cyan-900/80">
              <button
                onClick={() => { audioManager.playClick(); setSubMode('DANIELL'); }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  subMode === 'DANIELL' 
                    ? 'bg-cyan-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isVi ? 'PIN DANIELL (GALVANIC)' : 'DANIELL CELL'}
              </button>
              <button
                onClick={() => { audioManager.playClick(); setSubMode('ELECTROLYSIS'); }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  subMode === 'ELECTROLYSIS' 
                    ? 'bg-amber-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isVi ? 'BÌNH ĐIỆN PHÂN' : 'ELECTROLYSIS'}
              </button>
            </div>

            <button
              onClick={() => { audioManager.playClick(); onClose(); }}
              className="w-10 h-10 rounded-2xl bg-slate-900/80 hover:bg-rose-950/80 border border-slate-700 hover:border-rose-500/80 text-slate-300 hover:text-rose-200 transition-all flex items-center justify-center font-mono font-bold cursor-pointer active:scale-95 ml-2"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-auto custom-scrollbar flex-grow">
          
          {/* Left Canvas Display (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-[#020611] border border-cyan-900/60 shadow-inner flex items-center justify-center overflow-hidden">
              <canvas
                ref={canvasRef}
                width={520}
                height={320}
                className="w-full h-full object-contain"
              />

              {/* Submode Watermark */}
              <div className="absolute top-3 left-3 bg-[#030914]/80 px-3 py-1.5 rounded-xl border border-cyan-950 font-mono text-[10px] text-cyan-300">
                {subMode === 'DANIELL' 
                  ? '⚡ Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s)' 
                  : `⚗️ ĐIỆN PHÂN: ${electrolyteType}`}
              </div>

              {subMode === 'DANIELL' && (
                <button
                  onClick={() => { audioManager.playClick(); setIsSwitchClosed(!isSwitchClosed); }}
                  className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer active:scale-95 shadow-lg ${
                    isSwitchClosed 
                      ? 'bg-rose-950/80 border-rose-500 text-rose-300' 
                      : 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  }`}
                >
                  {isSwitchClosed ? (isVi ? 'NGẮT KHÓA K' : 'OPEN SWITCH') : (isVi ? 'ĐÓNG KHÓA K' : 'CLOSE SWITCH')}
                </button>
              )}
            </div>

            {/* Dynamic Equation Banner */}
            <div className="p-3.5 rounded-2xl bg-[#040e1e] border border-cyan-900/40 flex flex-col gap-1.5 font-mono text-xs">
              <span className="text-cyan-400 font-bold uppercase text-[11px]">
                {subMode === 'DANIELL' ? '⚖️ PHẢN ỨNG TỔNG QUÁT TRONG PIN:' : '⚖️ PHẢN ỨNG ĐIỆN PHÂN:'}
              </span>
              <div className="text-white text-sm">
                {subMode === 'DANIELL' ? (
                  <span>Zn(s) + Cu²⁺(aq) ➔ Zn²⁺(aq) + Cu(s) &nbsp; (ΔE° = +1.10 V)</span>
                ) : electrolyteType === 'CuSO4' ? (
                  <span>2CuSO₄ + 2H₂O ➔ 2Cu↓ (Catot) + O₂↑ (Anot) + 2H₂SO₄</span>
                ) : (
                  <span>2NaCl + 2H₂O ➔ 2NaOH + H₂↑ (Catot) + Cl₂↑ (Anot)</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Parameters & Nernst / Faraday Lab (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {subMode === 'DANIELL' ? (
              <>
                <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  🧪 {isVi ? 'ĐIỀU KHIỂN NỒNG ĐỘ & PHƯƠNG TRÌNH NERNST' : 'NERNST CONCENTRATION MATRIX'}
                </h3>

                {/* Zn2+ slider */}
                <div className="p-3 rounded-2xl bg-[#040e1c] border border-cyan-950 flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Nồng độ [Zn²⁺] (Anot Zn):</span>
                    <span className="text-cyan-300 font-bold">{znConc.toFixed(2)} M</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="2.0"
                    step="0.05"
                    value={znConc}
                    onChange={(e) => setZnConc(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* Cu2+ slider */}
                <div className="p-3 rounded-2xl bg-[#040e1c] border border-cyan-950 flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Nồng độ [Cu²⁺] (Catot Cu):</span>
                    <span className="text-cyan-300 font-bold">{cuConc.toFixed(2)} M</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="2.0"
                    step="0.05"
                    value={cuConc}
                    onChange={(e) => setCuConc(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* Nernst Formula Insight */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#06152b] to-[#030914] border border-cyan-800/60 flex flex-col gap-2">
                  <div className="text-xs font-mono text-cyan-300 font-bold border-b border-cyan-950 pb-1.5">
                    📐 {isVi ? 'CÔNG THỨC NERNST Ở 25°C:' : 'NERNST EQUATION AT 298K:'}
                  </div>
                  <div className="text-xs font-mono text-white bg-[#020611] p-2 rounded-xl text-center border border-slate-800">
                    E = E° - (0.0592 / 2) · log₁₀([Zn²⁺] / [Cu²⁺])
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono text-slate-300 pt-1">
                    <span>{isVi ? 'Suất điện động thực tế:' : 'Cell Potential:'}</span>
                    <span className="text-emerald-400 font-black text-sm">{currentCellPotential} V</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans leading-normal pt-1">
                    {isVi 
                      ? 'Tăng nồng độ chất phản ứng [Cu²⁺] làm tăng suất điện động; ngược lại, sản phẩm [Zn²⁺] tích tụ làm giảm điện áp của pin.'
                      : 'Increasing reactant [Cu²⁺] boosts cell voltage, while accumulator products [Zn²⁺] deplete the electric drive.'}
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  ⚡ {isVi ? 'THÔNG SỐ ĐIỆN PHÂN & ĐỊNH LUẬT FARADAY' : 'FARADAY ELECTROLYSIS CALCULATOR'}
                </h3>

                {/* Electrolyte Selector */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { audioManager.playClick(); setElectrolyteType('CuSO4'); }}
                    className={`p-2.5 rounded-xl border font-mono text-xs font-bold transition-all ${
                      electrolyteType === 'CuSO4' 
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-200' 
                        : 'bg-[#030914] border-slate-800 text-slate-400'
                    }`}
                  >
                    Dung dịch CuSO₄
                  </button>
                  <button
                    onClick={() => { audioManager.playClick(); setElectrolyteType('NaCl'); }}
                    className={`p-2.5 rounded-xl border font-mono text-xs font-bold transition-all ${
                      electrolyteType === 'NaCl' 
                        ? 'bg-amber-950 border-amber-400 text-amber-200' 
                        : 'bg-[#030914] border-slate-800 text-slate-400'
                    }`}
                  >
                    Dung dịch NaCl
                  </button>
                </div>

                {/* Current & Time sliders */}
                <div className="p-3 rounded-2xl bg-[#040e1c] border border-cyan-950 flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Cường độ dòng điện (I):</span>
                    <span className="text-amber-300 font-bold">{currentAmps.toFixed(1)} A</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.5"
                    value={currentAmps}
                    onChange={(e) => setCurrentAmps(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-[#040e1c] border border-cyan-950 flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Thời gian điện phân (t):</span>
                    <span className="text-amber-300 font-bold">{electrolysisTimeSec} giây ({Math.round(electrolysisTimeSec / 60)} phút)</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="600"
                    step="10"
                    value={electrolysisTimeSec}
                    onChange={(e) => setElectrolysisTimeSec(parseInt(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* Faraday Calculation Output */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#091b26] to-[#030914] border border-amber-800/60 flex flex-col gap-2">
                  <span className="text-xs font-mono font-bold text-amber-300">
                    🔬 {isVi ? 'KẾT QUẢ ĐỊNH LUẬT FARADAY (m = A·I·t / n·F):' : 'FARADAY ELECTRODE OUTPUT:'}
                  </span>
                  {electrolyteType === 'CuSO4' ? (
                    <div className="flex justify-between items-center text-xs font-mono text-slate-200">
                      <span>Đồng kim loại bám Catot:</span>
                      <span className="text-emerald-400 font-bold text-sm">+{cuPlatedGrams} gam Cu</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-xs font-mono text-slate-200">
                      <span>Thể tích khí Cl₂ tại Anot:</span>
                      <span className="text-lime-400 font-bold text-sm">{cl2Liters} Lít khí</span>
                    </div>
                  )}
                </div>
              </>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
