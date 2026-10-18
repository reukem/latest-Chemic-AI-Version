import React, { useState, useEffect, useRef } from 'react';
import { audioManager } from '../engine/AudioManager';

interface ReactionKineticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isVi?: boolean;
}

interface EquilibriumSystem {
  id: string;
  name: { EN: string; VN: string };
  equation: string;
  deltaH: number; // kJ/mol (positive = endothermic, negative = exothermic)
  gasMolesReactants: number;
  gasMolesProducts: number;
  r1Name: string;
  r2Name?: string;
  p1Name: string;
  p2Name?: string;
  initR1: number;
  initR2?: number;
  initP1: number;
  kForward0: number;
  kReverse0: number;
  eaForward: number; // kJ/mol
  eaReverse: number; // kJ/mol
}

const SYSTEMS: EquilibriumSystem[] = [
  {
    id: 'n2o4_no2',
    name: {
      EN: 'Nitrogen Dioxide Dimerization (Colorless N₂O₄ ⇌ Brown NO₂)',
      VN: 'Chuyển hóa Khí Nâu đỏ NO₂ và N₂O₄ không màu'
    },
    equation: 'N₂O₄(k, không màu) ⇌ 2NO₂(k, nâu đỏ)  [ΔH = +57.2 kJ/mol]',
    deltaH: 57.2,
    gasMolesReactants: 1,
    gasMolesProducts: 2,
    r1Name: '[N₂O₄]',
    p1Name: '[NO₂]',
    initR1: 1.0,
    initP1: 0.1,
    kForward0: 0.08,
    kReverse0: 0.12,
    eaForward: 58.0,
    eaReverse: 0.8
  },
  {
    id: 'haber_ammonia',
    name: {
      EN: 'Haber-Bosch Ammonia Synthesis (N₂ + 3H₂ ⇌ 2NH₃)',
      VN: 'Tổng hợp Amoniac Haber-Bosch (N₂ + 3H₂ ⇌ 2NH₃)'
    },
    equation: 'N₂(k) + 3H₂(k) ⇌ 2NH₃(k)  [ΔH = -92.4 kJ/mol]',
    deltaH: -92.4,
    gasMolesReactants: 4,
    gasMolesProducts: 2,
    r1Name: '[N₂]',
    r2Name: '[H₂]',
    p1Name: '[NH₃]',
    initR1: 0.8,
    initR2: 2.4,
    initP1: 0.2,
    kForward0: 0.04,
    kReverse0: 0.06,
    eaForward: 35.0,
    eaReverse: 127.4
  },
  {
    id: 'esterification',
    name: {
      EN: 'Acetic Acid & Ethanol Esterification (Equilibrium Kc ≈ 4.0)',
      VN: 'Cân bằng Este hóa Axit Axetic & Ethanol'
    },
    equation: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O  [Kc ≈ 4.0]',
    deltaH: 0.0,
    gasMolesReactants: 0,
    gasMolesProducts: 0,
    r1Name: '[CH₃COOH]',
    r2Name: '[C₂H₅OH]',
    p1Name: '[Este]',
    p2Name: '[H₂O]',
    initR1: 1.0,
    initR2: 1.0,
    initP1: 0.0,
    kForward0: 0.05,
    kReverse0: 0.0125,
    eaForward: 60.0,
    eaReverse: 60.0
  }
];

export const ReactionKineticsModal: React.FC<ReactionKineticsModalProps> = ({ isOpen, onClose, isVi = false }) => {
  const [selectedSystem, setSelectedSystem] = useState<EquilibriumSystem>(SYSTEMS[0]);
  const [tempCelsius, setTempCelsius] = useState<number>(25); // 0 to 200°C
  const [pressureAtm, setPressureAtm] = useState<number>(1.0); // 0.5 to 5.0 atm
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Live simulation states (concentrations)
  const [concR1, setConcR1] = useState<number>(SYSTEMS[0].initR1);
  const [concR2, setConcR2] = useState<number>(SYSTEMS[0].initR2 || 0);
  const [concP1, setConcP1] = useState<number>(SYSTEMS[0].initP1);

  // History buffer for drawing graph
  const historyRef = useRef<{ r1: number; r2: number; p1: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Reset state on system change
  useEffect(() => {
    setConcR1(selectedSystem.initR1);
    setConcR2(selectedSystem.initR2 || 0);
    setConcP1(selectedSystem.initP1);
    historyRef.current = [];
  }, [selectedSystem]);

  // Real-time ODE Differential Kinematics Stepper (Euler ODE integrator at 60 FPS)
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const R = 8.314e-3; // kJ/(mol*K)
    const T = tempCelsius + 273.15; // Kelvin
    const T0 = 298.15;

    // Arrhenius temperature rate acceleration
    const eaCatBonus = hasCatalyst ? 20.0 : 0.0;
    const kF = selectedSystem.kForward0 * Math.exp((- (selectedSystem.eaForward - eaCatBonus) / R) * (1 / T - 1 / T0));
    const kR = selectedSystem.kReverse0 * Math.exp((- (selectedSystem.eaReverse - eaCatBonus) / R) * (1 / T - 1 / T0));

    // Pressure multiplier for gas reactions
    const pEffect = selectedSystem.gasMolesProducts > selectedSystem.gasMolesReactants 
      ? Math.pow(pressureAtm, selectedSystem.gasMolesProducts - selectedSystem.gasMolesReactants)
      : 1.0;

    let r1 = concR1;
    let r2 = concR2;
    let p1 = concP1;

    const interval = setInterval(() => {
      const dt = 0.04;

      if (selectedSystem.id === 'n2o4_no2') {
        // N2O4 ⇌ 2NO2: vF = kF * [N2O4], vR = kR * [NO2]^2 * P
        const vF = kF * r1;
        const vR = kR * (p1 * p1) * pEffect;
        const delta = (vF - vR) * dt;
        r1 = Math.max(0.01, r1 - delta);
        p1 = Math.max(0.01, p1 + 2 * delta);
      } else if (selectedSystem.id === 'haber_ammonia') {
        // N2 + 3H2 ⇌ 2NH3
        const vF = kF * r1 * Math.pow(r2, 1.2) * (pressureAtm * 0.8);
        const vR = kR * Math.pow(p1, 1.5);
        const delta = (vF - vR) * dt * 0.3;
        r1 = Math.max(0.02, r1 - delta);
        r2 = Math.max(0.05, r2 - 3 * delta);
        p1 = Math.max(0.01, p1 + 2 * delta);
      } else {
        // Esterification
        const vF = kF * r1 * r2;
        const vR = kR * (p1 * p1);
        const delta = (vF - vR) * dt;
        r1 = Math.max(0.02, r1 - delta);
        r2 = Math.max(0.02, r2 - delta);
        p1 = Math.max(0.0, p1 + delta);
      }

      setConcR1(r1);
      setConcR2(r2);
      setConcP1(p1);

      historyRef.current.push({ r1, r2, p1 });
      if (historyRef.current.length > 180) {
        historyRef.current.shift();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, tempCelsius, pressureAtm, hasCatalyst, selectedSystem]);

  // Graph rendering loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const padding = 40;

      // 1. Draw Grid lines
      ctx.strokeStyle = '#0f2942';
      ctx.lineWidth = 1;
      for (let y = padding; y <= h - padding; y += 45) {
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(w - padding, y);
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, h - padding);
      ctx.lineTo(w - padding, h - padding);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(isVi ? 'Nồng độ [C] (mol/L)' : 'Concentration [C] (M)', padding - 5, padding - 12);
      ctx.fillText(isVi ? 'Thời gian t ➔' : 'Time t ➔', w - padding - 60, h - padding + 25);

      // 2. Draw History Curves
      const hist = historyRef.current;
      if (hist.length > 1) {
        const stepX = (w - padding * 2) / 180;
        const maxVal = selectedSystem.id === 'haber_ammonia' ? 3.0 : 2.0;

        const getY = (val: number) => {
          return (h - padding) - (val / maxVal) * (h - padding * 2);
        };

        // Curve R1 (Cyan)
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        hist.forEach((pt, idx) => {
          const x = padding + idx * stepX;
          const y = getY(pt.r1);
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Curve P1 (Amber)
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        hist.forEach((pt, idx) => {
          const x = padding + idx * stepX;
          const y = getY(pt.p1);
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Curve R2 (if exists, Purple)
        if (selectedSystem.r2Name) {
          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 2;
          ctx.beginPath();
          hist.forEach((pt, idx) => {
            const x = padding + idx * stepX;
            const y = getY(pt.r2);
            if (idx === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isOpen, selectedSystem, isVi]);

  const handleInjectReactant = () => {
    audioManager.playBubble();
    setConcR1(prev => prev + 0.6);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-[#020712]/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 font-sans select-none animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-gradient-to-b from-[#061528] via-[#040e1c] to-[#020814] border-2 border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(34,211,238,0.25)] flex flex-col overflow-hidden max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-cyan-900/60 bg-[#040f20]/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              📈
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase font-mono">
                  {isVi ? 'ĐỒ THỊ CÂN BẰNG ĐỘNG & NGUYÊN LÝ LE CHATELIER' : 'LIVE ODE KINETICS & LE CHATELIER SIMULATOR'}
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-amber-950 border border-amber-700/60 text-amber-300 font-mono text-[10px] font-bold">
                  GDPT 2018 LỚP 11
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isVi ? 'Giải phương trình vi phân tốc độ phản ứng Runge-Kutta & chuyển dịch cân bằng nhiệt động' : 'Continuous ODE kinetics, Arrhenius activation barrier & dynamic equilibrium shift'}
              </p>
            </div>
          </div>

          <button
            onClick={() => { audioManager.playClick(); onClose(); }}
            className="w-10 h-10 rounded-2xl bg-slate-900/80 hover:bg-rose-950/80 border border-slate-700 hover:border-rose-500/80 text-slate-300 hover:text-rose-200 transition-all flex items-center justify-center font-mono font-bold cursor-pointer active:scale-95"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-auto custom-scrollbar flex-grow">
          
          {/* Left: Continuous Real-Time Graph (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-[#020611] border border-cyan-900/60 shadow-inner flex items-center justify-center overflow-hidden">
              <canvas
                ref={canvasRef}
                width={520}
                height={320}
                className="w-full h-full object-contain"
              />

              {/* Live Legend */}
              <div className="absolute top-3 right-3 flex items-center gap-3 bg-[#030914]/85 px-3 py-1.5 rounded-xl border border-cyan-950 font-mono text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="text-cyan-300">{selectedSystem.r1Name}: {concR1.toFixed(2)}M</span>
                </div>
                {selectedSystem.r2Name && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                    <span className="text-purple-300">{selectedSystem.r2Name}: {concR2.toFixed(2)}M</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-amber-300">{selectedSystem.p1Name}: {concP1.toFixed(2)}M</span>
                </div>
              </div>
            </div>

            {/* Quick Disturbance Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={handleInjectReactant}
                className="py-2.5 px-4 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 hover:border-cyan-400 text-cyan-200 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md"
              >
                <span>➕</span>
                <span>{isVi ? 'BƠM THÊM CHẤT THAM GIA' : 'INJECT REACTANT SPIKE'}</span>
              </button>

              <button
                onClick={() => { audioManager.playClick(); setHasCatalyst(!hasCatalyst); }}
                className={`py-2.5 px-4 rounded-xl border font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md ${
                  hasCatalyst 
                    ? 'bg-emerald-950/90 border-emerald-400 text-emerald-300' 
                    : 'bg-[#030914] border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>⚡</span>
                <span>{hasCatalyst ? (isVi ? 'ĐANG CÓ XÚC TÁC (Ea GIẢM)' : 'CATALYST ACTIVE (LOW Ea)') : (isVi ? 'THÊM CHẤT XÚC TÁC' : 'ADD CATALYST')}</span>
              </button>
            </div>

            {/* Reaction Equation Box */}
            <div className="p-3.5 rounded-2xl bg-[#040e1e] border border-cyan-900/40 text-xs font-mono">
              <span className="text-cyan-400 font-bold block mb-1">
                ⚖️ {isVi ? 'PHƯƠNG TRÌNH PHẢN ỨNG THUẬN NGHỊCH:' : 'REVERSIBLE SYSTEM EQUILIBRIUM:'}
              </span>
              <span className="text-white text-sm font-bold">{selectedSystem.equation}</span>
            </div>

          </div>

          {/* Right: Le Chatelier Perturbation Sliders (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* System Switcher */}
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              🧪 {isVi ? 'CHỌN HỆ CÂN BẰNG HÓA HỌC' : 'SELECT EQUILIBRIUM SYSTEM'}
            </h3>

            <div className="flex flex-col gap-2">
              {SYSTEMS.map(sys => {
                const isSelected = selectedSystem.id === sys.id;
                return (
                  <button
                    key={sys.id}
                    onClick={() => { audioManager.playClick(); setSelectedSystem(sys); }}
                    className={`p-2.5 rounded-xl border text-left font-mono text-xs font-bold transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#09233f] border-cyan-400 text-cyan-200 shadow-md' 
                        : 'bg-[#040e1c] border-cyan-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {isVi ? sys.name.VN : sys.name.EN}
                  </button>
                );
              })}
            </div>

            {/* Temperature Slider */}
            <div className="p-3.5 rounded-2xl bg-[#040e1c] border border-cyan-950 flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">🌡️ {isVi ? 'Nhiệt độ hệ thống (T):' : 'System Temperature (T):'}</span>
                <span className="text-rose-400 font-bold">{tempCelsius}°C ({tempCelsius + 273} K)</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={tempCelsius}
                onChange={(e) => setTempCelsius(parseInt(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <span className="text-[10px] font-mono text-slate-400">
                {selectedSystem.deltaH > 0 
                  ? (isVi ? 'Phản ứng thu nhiệt (ΔH > 0): Tăng nhiệt độ chuyển dịch sang chiều thuận!' : 'Endothermic: Heating shifts right!')
                  : selectedSystem.deltaH < 0
                  ? (isVi ? 'Phản ứng tỏa nhiệt (ΔH < 0): Tăng nhiệt độ chuyển dịch sang chiều nghịch!' : 'Exothermic: Heating shifts left!')
                  : (isVi ? 'ΔH ≈ 0: Nhiệt độ ít ảnh hưởng đến Kc' : 'Thermally neutral')}
              </span>
            </div>

            {/* Pressure Slider (for gas systems) */}
            <div className="p-3.5 rounded-2xl bg-[#040e1c] border border-cyan-950 flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">💨 {isVi ? 'Áp suất bình chứa (P):' : 'Pressure (P):'}</span>
                <span className="text-cyan-400 font-bold">{pressureAtm.toFixed(1)} atm</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={pressureAtm}
                onChange={(e) => setPressureAtm(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <span className="text-[10px] font-mono text-slate-400">
                {selectedSystem.gasMolesProducts > selectedSystem.gasMolesReactants
                  ? (isVi ? 'Tăng áp suất chuyển dịch sang chiều làm giảm số mol khí (N₂O₄)!' : 'Compacting shifts towards fewer moles!')
                  : (isVi ? 'Tăng áp suất nén các phân tử lại gần nhau' : 'Compressing forces molecular collision')}
              </span>
            </div>

            {/* Le Chatelier Rule Dossier */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#06152b] to-[#030914] border border-cyan-800/60 flex flex-col gap-1.5 text-xs font-sans text-slate-300">
              <span className="font-mono text-amber-300 font-bold text-[11px]">
                💡 {isVi ? 'NGUYÊN LÝ CHUYỂN DỊCH CÂN BẰNG LE CHATELIER:' : 'LE CHATELIER SCIENTIFIC PRINCIPLE:'}
              </span>
              <p className="text-[11px] leading-relaxed">
                {isVi
                  ? 'Khi một hệ đang ở trạng thái cân bằng chịu một tác động từ bên ngoài (như thay đổi nồng độ, nhiệt độ, hoặc áp suất), hệ sẽ tự động chuyển dịch theo chiều chống lại tác động đó để thiết lập một trạng thái cân bằng mới!'
                  : 'A system at dynamic equilibrium disturbed by a change in temperature, pressure, or concentration responds by shifting in the direction that counteracts the imposition.'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
