import React, { useState, useRef, useEffect } from 'react';
import { audioManager } from '../engine/AudioManager';

interface FlameSpectroscopyModalProps {
  isOpen: boolean;
  onClose: () => void;
  isVi?: boolean;
}

interface MetalCation {
  id: string;
  symbol: string;
  name: { EN: string; VN: string };
  saltFormula: string;
  saltName: { EN: string; VN: string };
  flameColor: string; // CSS color
  glowColor: string;
  flameDesc: { EN: string; VN: string };
  spectralLines: { wavelength: number; color: string; intensity: number }[]; // in nm (380 - 750)
  quantumTransition: string;
}

const CATIONS: MetalCation[] = [
  {
    id: 'na',
    symbol: 'Na⁺',
    name: { EN: 'Sodium', VN: 'Natri' },
    saltFormula: 'NaCl',
    saltName: { EN: 'Sodium Chloride (Table Salt)', VN: 'Natri Clorua (Muối ăn)' },
    flameColor: '#fbbf24', // Intense golden yellow
    glowColor: 'rgba(251, 191, 36, 0.85)',
    flameDesc: {
      EN: 'Intense, blinding Golden Yellow (Persistent 589 nm D-line)',
      VN: 'Vàng rực rỡ chói lóa (Đặc trưng vạch D kép 589 nm)'
    },
    spectralLines: [
      { wavelength: 589.0, color: '#fbbf24', intensity: 1.0 },
      { wavelength: 589.6, color: '#f59e0b', intensity: 0.95 }
    ],
    quantumTransition: '3p → 3s (589 nm doublet, ΔE = 2.10 eV)'
  },
  {
    id: 'k',
    symbol: 'K⁺',
    name: { EN: 'Potassium', VN: 'Kali' },
    saltFormula: 'KCl',
    saltName: { EN: 'Potassium Chloride', VN: 'Kali Clorua' },
    flameColor: '#c084fc', // Lilac violet
    glowColor: 'rgba(192, 132, 252, 0.8)',
    flameDesc: {
      EN: 'Pale Lilac / Violet flame (Revealed crisply through Cobalt Blue glass)',
      VN: 'Tím nhạt hoa cà (Quan sát rõ nét qua kính thủy tinh Coban)'
    },
    spectralLines: [
      { wavelength: 404.4, color: '#818cf8', intensity: 0.75 },
      { wavelength: 766.5, color: '#7e22ce', intensity: 0.95 },
      { wavelength: 769.9, color: '#6b21a8', intensity: 0.9 }
    ],
    quantumTransition: '4p → 4s (766 nm, 770 nm) & 5p → 4s (404 nm)'
  },
  {
    id: 'cu',
    symbol: 'Cu²⁺',
    name: { EN: 'Copper(II)', VN: 'Đồng(II)' },
    saltFormula: 'CuSO₄',
    saltName: { EN: 'Copper(II) Sulfate', VN: 'Đồng(II) Sunfat' },
    flameColor: '#10b981', // Emerald green
    glowColor: 'rgba(16, 185, 129, 0.85)',
    flameDesc: {
      EN: 'Vibrant Emerald Green with azure fringes (Molecular CuCl/CuOH bands)',
      VN: 'Xanh lục bảo rực rỡ pha ánh ngọc bích'
    },
    spectralLines: [
      { wavelength: 510.5, color: '#10b981', intensity: 0.95 },
      { wavelength: 515.3, color: '#34d399', intensity: 0.85 },
      { wavelength: 521.8, color: '#059669', intensity: 0.9 }
    ],
    quantumTransition: '3d⁹4p → 3d¹⁰ & 4p → 4s (510 nm - 522 nm)'
  },
  {
    id: 'ba',
    symbol: 'Ba²⁺',
    name: { EN: 'Barium', VN: 'Bari' },
    saltFormula: 'BaCl₂',
    saltName: { EN: 'Barium Chloride', VN: 'Bari Clorua' },
    flameColor: '#a3e635', // Apple pale green
    glowColor: 'rgba(163, 230, 53, 0.8)',
    flameDesc: {
      EN: 'Pale Apple Green / Chartreuse glow',
      VN: 'Xanh lục nhạt màu táo non'
    },
    spectralLines: [
      { wavelength: 513.7, color: '#a3e635', intensity: 0.7 },
      { wavelength: 524.2, color: '#84cc16', intensity: 0.85 },
      { wavelength: 553.5, color: '#65a30d', intensity: 0.9 }
    ],
    quantumTransition: '6s6p → 6s² (553.5 nm resonance line)'
  },
  {
    id: 'ca',
    symbol: 'Ca²⁺',
    name: { EN: 'Calcium', VN: 'Canxi' },
    saltFormula: 'CaCl₂',
    saltName: { EN: 'Calcium Chloride', VN: 'Canxi Clorua' },
    flameColor: '#f97316', // Brick red / orange
    glowColor: 'rgba(249, 115, 22, 0.85)',
    flameDesc: {
      EN: 'Transient Brick Red / Fiery Orange',
      VN: 'Đỏ gạch nung pha cam ấm'
    },
    spectralLines: [
      { wavelength: 422.7, color: '#60a5fa', intensity: 0.75 },
      { wavelength: 616.2, color: '#f97316', intensity: 0.85 },
      { wavelength: 622.0, color: '#ea580c', intensity: 0.9 }
    ],
    quantumTransition: '4s4p → 4s² (422.7 nm) & CaOH molecular bands (622 nm)'
  },
  {
    id: 'sr',
    symbol: 'Sr²⁺',
    name: { EN: 'Strontium', VN: 'Stronti' },
    saltFormula: 'SrCl₂',
    saltName: { EN: 'Strontium Chloride', VN: 'Stronti Clorua' },
    flameColor: '#ef4444', // Crimson scarlet
    glowColor: 'rgba(239, 68, 68, 0.9)',
    flameDesc: {
      EN: 'Brilliant Crimson Scarlet / Crimson Red (Used in emergency flares)',
      VN: 'Đỏ thẫm tươi / Đỏ huyết dụ (Ứng dụng trong pháo hiệu khẩn cấp)'
    },
    spectralLines: [
      { wavelength: 460.7, color: '#38bdf8', intensity: 0.7 },
      { wavelength: 606.0, color: '#f87171', intensity: 0.85 },
      { wavelength: 660.0, color: '#ef4444', intensity: 0.95 }
    ],
    quantumTransition: '5s5p → 5s² (460.7 nm) & SrOH molecular orange/red bands'
  },
  {
    id: 'li',
    symbol: 'Li⁺',
    name: { EN: 'Lithium', VN: 'Liti' },
    saltFormula: 'LiCl',
    saltName: { EN: 'Lithium Chloride', VN: 'Liti Clorua' },
    flameColor: '#f43f5e', // Carmine rose
    glowColor: 'rgba(244, 63, 94, 0.9)',
    flameDesc: {
      EN: 'Intense Carmine / Magenta Rose red',
      VN: 'Đỏ carmine / Hồng cánh sen đậm đặc trưng'
    },
    spectralLines: [
      { wavelength: 610.3, color: '#fb923c', intensity: 0.65 },
      { wavelength: 670.8, color: '#f43f5e', intensity: 1.0 }
    ],
    quantumTransition: '2p → 2s (670.8 nm doublet, ΔE = 1.85 eV)'
  }
];

export const FlameSpectroscopyModal: React.FC<FlameSpectroscopyModalProps> = ({ isOpen, onClose, isVi = false }) => {
  const [selectedCation, setSelectedCation] = useState<MetalCation>(CATIONS[0]);
  const [burnerAirAirflow, setBurnerAirflow] = useState<number>(0.85); // 0 = luminous yellow, 1 = roaring blue
  const [isLoopInFlame, setIsLoopInFlame] = useState<boolean>(true);
  const [useCobaltGlass, setUseCobaltGlass] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated flame canvas loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = [];

    const render = () => {
      t += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const baseY = canvas.height - 40;

      // 1. Draw Bunsen Burner Barrel
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(centerX - 16, baseY - 60, 32, 60);
      ctx.fillStyle = '#334155';
      ctx.fillRect(centerX - 20, baseY - 64, 40, 6); // Barrel lip

      // Collar ring with air hole
      ctx.fillStyle = '#475569';
      ctx.fillRect(centerX - 17, baseY - 35, 34, 15);
      ctx.fillStyle = burnerAirAirflow > 0.5 ? '#0f172a' : '#64748b';
      ctx.beginPath();
      ctx.arc(centerX, baseY - 28, 4.5 * burnerAirAirflow, 0, Math.PI * 2);
      ctx.fill();

      // Base stand
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.ellipse(centerX, baseY, 65, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. Spawn Flame Particles
      const activeColor = (isLoopInFlame && selectedCation) ? selectedCation.flameColor : '#38bdf8';
      const isYellowFlame = burnerAirAirflow < 0.35;

      for (let i = 0; i < 4; i++) {
        particles.push({
          x: centerX + (Math.random() - 0.5) * 14,
          y: baseY - 66,
          vx: (Math.random() - 0.5) * 1.6,
          vy: - (3.5 + Math.random() * 3.8 + burnerAirAirflow * 2),
          life: 0,
          maxLife: 25 + Math.random() * 20,
          size: 16 + Math.random() * 12
        });
      }

      // 3. Render Particles with Additive Blending
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx + Math.sin(t * 3 + p.y * 0.05) * 0.6;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = Math.max(0, 1 - progress);
        const currentSize = p.size * (1 - progress * 0.4);

        if (progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        // Color gradient from core to tip
        let fillStyle = activeColor;
        if (isYellowFlame && (!isLoopInFlame || selectedCation.id === 'na')) {
          fillStyle = progress < 0.2 ? '#60a5fa' : '#facc15';
        } else if (!isLoopInFlame) {
          fillStyle = progress < 0.4 ? '#38bdf8' : '#1d4ed8';
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize);
        grad.addColorStop(0, fillStyle);
        grad.addColorStop(0.5, fillStyle);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Draw Inner Core Cone (Hot Blue oxidizing zone)
      if (burnerAirAirflow > 0.3) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.beginPath();
        ctx.moveTo(centerX - 9, baseY - 65);
        ctx.quadraticCurveTo(centerX, baseY - 125 - burnerAirAirflow * 20, centerX + 9, baseY - 65);
        ctx.closePath();
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';

      // 5. Draw Nichrome Inoculating Wire Loop
      if (isLoopInFlame) {
        const loopX = centerX + 18;
        const loopY = baseY - 110;

        // Wire handle & needle
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(canvas.width - 25, loopY - 30);
        ctx.lineTo(loopX + 10, loopY);
        ctx.stroke();

        // Platinum Loop circle in the hot flame zone
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(loopX, loopY, 7, 0, Math.PI * 2);
        ctx.stroke();

        // Incandescent Salt bead
        ctx.fillStyle = activeColor;
        ctx.beginPath();
        ctx.arc(loopX, loopY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Emitting glow halo
        ctx.fillStyle = selectedCation.glowColor;
        ctx.beginPath();
        ctx.arc(loopX, loopY, 18, 0, Math.PI * 2);
        ctx.fill();
      }

      // 6. Draw Cobalt Blue Glass Overlay Filter (if toggled)
      if (useCobaltGlass) {
        ctx.fillStyle = 'rgba(29, 78, 216, 0.55)';
        ctx.fillRect(centerX - 70, baseY - 220, 140, 180);
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 3;
        ctx.strokeRect(centerX - 70, baseY - 220, 140, 180);

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.fillText(isVi ? 'KÍNH COBAN (COBALT GLASS)' : 'COBALT BLUE GLASS', centerX - 62, baseY - 205);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isOpen, selectedCation, burnerAirAirflow, isLoopInFlame, useCobaltGlass, isVi]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-[#020712]/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 font-sans select-none animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-gradient-to-b from-[#061528] via-[#040e1c] to-[#020814] border-2 border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(34,211,238,0.25)] flex flex-col overflow-hidden max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-cyan-900/60 bg-[#040f20]/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/50 text-amber-300 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              🔥
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase font-mono">
                  {isVi ? 'TRẠM ĐỐT NGỌN LỬA & QUANG PHỔ CATION' : 'BUNSEN FLAME & EMISSION SPECTROSCOPY'}
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-700/60 text-cyan-300 font-mono text-[10px] font-bold">
                  GDPT 2018 LỚP 10 & 12
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isVi ? 'Phân tích định tính nguyên tố qua màu ngọn lửa và vạch quang phổ lượng tử' : 'Qualitative cation flame test & discrete quantum emission lines'}
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

        {/* Content Body Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-auto custom-scrollbar flex-grow">
          
          {/* Left Column: Interactive Burner Canvas & Tools (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Visual Stage Container */}
            <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-[#020611] border border-cyan-900/60 shadow-inner flex items-center justify-center overflow-hidden">
              <canvas
                ref={canvasRef}
                width={500}
                height={320}
                className="w-full h-full object-contain"
              />

              {/* In-Canvas Telemetry Overlay */}
              <div className="absolute top-3 left-3 flex flex-col gap-1 font-mono text-[10px] bg-[#030a16]/85 border border-cyan-950 px-3 py-1.5 rounded-xl pointer-events-none">
                <span className="text-cyan-400 font-bold">
                  🔥 {isVi ? 'NGỌN LỬA' : 'FLAME'}: {isLoopInFlame ? selectedCation.symbol : (isVi ? 'KHÔNG CHẤT THỬ' : 'INERT BLUE')}
                </span>
                <span className="text-slate-400">
                  🌡️ {isVi ? 'VÙNG OXI HÓA NGOÀI' : 'OUTER OXIDIZING ZONE'}: ~1400°C - 1600°C
                </span>
              </div>

              {/* Quick Loop Toggle in Stage */}
              <button
                onClick={() => { audioManager.playClick(); setIsLoopInFlame(!isLoopInFlame); }}
                className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer active:scale-95 shadow-lg ${
                  isLoopInFlame 
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300' 
                    : 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                }`}
              >
                {isLoopInFlame ? (isVi ? 'RÚT ĐŨA RA' : 'REMOVE LOOP') : (isVi ? 'ĐƯA ĐŨA VÀO LỬA' : 'INSERT LOOP')}
              </button>
            </div>

            {/* Bunsen Burner & Optical Controls */}
            <div className="p-4 rounded-2xl bg-[#040e1e]/80 border border-cyan-900/40 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                  ⚙️ {isVi ? 'ĐIỀU CHỈNH LỖ KHÍ ĐÈN BUNSEN (AIR COLLAR)' : 'AIR COLLAR AIRFLOW'}
                </span>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  {burnerAirAirflow < 0.35 
                    ? (isVi ? 'Lửa vàng an toàn (~800°C)' : 'Safety Yellow Flame (~800°C)') 
                    : (isVi ? 'Lửa xanh không sáng (~1500°C)' : 'Non-luminous Blue Cone (~1500°C)')}
                </span>
              </div>
              
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={burnerAirAirflow}
                onChange={(e) => setBurnerAirflow(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />

              <div className="flex items-center justify-between pt-2 border-t border-cyan-950">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useCobaltGlass}
                    onChange={(e) => { audioManager.playClick(); setUseCobaltGlass(e.target.checked); }}
                    className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
                  />
                  <span className="text-xs font-mono text-blue-300 font-bold">
                    👓 {isVi ? 'Kính Coban lọc màu vàng Na⁺ (Cobalt Blue Glass)' : 'Filter Yellow with Cobalt Blue Glass'}
                  </span>
                </label>
                <span className="text-[10px] font-mono text-slate-400">
                  {isVi ? 'Quan sát màu tím Kali' : 'Essential for Potassium test'}
                </span>
              </div>
            </div>

            {/* Live Spectroscope Display (Quang phổ kế) */}
            <div className="p-4 rounded-2xl bg-[#030914] border border-cyan-500/30 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🌈</span>
                  <span className="text-xs font-mono font-bold text-cyan-200 uppercase">
                    {isVi ? 'QUANG PHỔ KẾ PHÁT XẠ (EMISSION SPECTROSCOPE)' : 'EMISSION SPECTROSCOPE DETECTOR'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {selectedCation.spectralLines.length} {isVi ? 'VẠCH ĐẶC TRƯNG' : 'DISCRETE LINES'}
                </span>
              </div>

              {/* Spectral Wavelength Bar (380nm - 750nm) */}
              <div className="relative h-12 w-full rounded-xl bg-black border border-slate-800 overflow-hidden shadow-inner flex items-center">
                {/* Continuous Dark Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#180a3a] via-[#051122] to-[#1a0505] opacity-50" />

                {/* Render Discrete Emission Lines */}
                {selectedCation.spectralLines.map((line, idx) => {
                  const leftPercent = ((line.wavelength - 380) / (750 - 380)) * 100;
                  return (
                    <div
                      key={idx}
                      className="absolute top-0 bottom-0 w-1 shadow-lg transition-all"
                      style={{
                        left: `${leftPercent}%`,
                        backgroundColor: line.color,
                        boxShadow: `0 0 12px ${line.color}`
                      }}
                      title={`${line.wavelength} nm`}
                    />
                  );
                })}

                {/* Wavelength Scale Markings */}
                <div className="absolute bottom-1 inset-x-2 flex justify-between font-mono text-[9px] text-slate-500 pointer-events-none">
                  <span>380 nm (Violet)</span>
                  <span>480 nm (Cyan)</span>
                  <span>580 nm (Yellow)</span>
                  <span>680 nm (Red)</span>
                  <span>750 nm (Near-IR)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 bg-[#071326] px-3 py-1.5 rounded-xl border border-cyan-950">
                <span>{isVi ? 'Bước chuyển lượng tử' : 'Quantum Transition'}:</span>
                <span className="text-cyan-300 font-bold">{selectedCation.quantumTransition}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cation Selector Cards & Scientific Dossier (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              🧪 {isVi ? 'CHỌN MUỐI CATION ĐỂ THỬ' : 'SELECT METAL CATION SALT'}
            </h3>

            {/* List of Cation Salt Options */}
            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto custom-scrollbar pr-1">
              {CATIONS.map((cat) => {
                const isSelected = selectedCation.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { audioManager.playClick(); setSelectedCation(cat); }}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer active:scale-98 ${
                      isSelected
                        ? 'bg-[#09223d] border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)]'
                        : 'bg-[#040e1c]/80 hover:bg-[#07172e] border-cyan-950 hover:border-cyan-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full border shadow-md shrink-0"
                        style={{ backgroundColor: cat.flameColor, borderColor: cat.flameColor }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold font-sans text-sm">
                            {cat.symbol} ({isVi ? cat.name.VN : cat.name.EN})
                          </span>
                          <span className="font-mono text-[10px] text-cyan-300 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-800">
                            {cat.saltFormula}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono block">
                          {isVi ? cat.saltName.VN : cat.saltName.EN}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      {isSelected ? '✓' : '→'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Scientific Profile Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#06152b] to-[#030914] border border-cyan-800/60 shadow-lg flex flex-col gap-2.5">
              <div className="flex items-center justify-between border-b border-cyan-950 pb-2">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                  🔬 {isVi ? 'ĐẶC TRƯNG QUANG HỌC' : 'SPECTRAL PHENOMENON'}
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {selectedCation.saltFormula}
                </span>
              </div>

              <div className="text-xs text-slate-200 leading-relaxed font-sans">
                <strong className="text-white block mb-1">
                  {isVi ? 'Màu ngọn lửa thực nghiệm:' : 'Empirical Flame Color:'}
                </strong>
                <span className="text-cyan-200 font-mono">
                  {isVi ? selectedCation.flameDesc.VN : selectedCation.flameDesc.EN}
                </span>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed font-sans bg-[#030814]/80 p-2.5 rounded-xl border border-cyan-950">
                <strong className="text-amber-200 block mb-1 font-mono text-[11px]">
                  💡 {isVi ? 'Nguyên lý cơ học lượng tử (Bohr Model):' : 'Quantum Mechanics Principle:'}
                </strong>
                {isVi ? (
                  <p className="text-[11px] text-slate-300 leading-normal">
                    Khi đưa muối vào ngọn lửa, năng lượng nhiệt kích thích electron hóa trị nhảy lên mức năng lượng cao hơn (E₂). Trạng thái này không bền; electron lập tức quay về mức năng lượng thấp hơn (E₁) và giải phóng một photon ánh sáng có tần số ν = (E₂ - E₁)/h, tạo nên màu sắc ngọn lửa đặc trưng không thể nhầm lẫn!
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-300 leading-normal">
                    Thermal energy excites valence electrons to higher discrete quantum shells (E₂). Upon collapsing back to ground states (E₁), photons are emitted with energy E = h·ν = hc/λ, yielding characteristic spectral emission lines unique to each element.
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
