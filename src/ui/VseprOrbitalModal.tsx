import React, { useState, useEffect, useRef } from 'react';
import { audioManager } from '../engine/AudioManager';

interface VseprOrbitalModalProps {
  isOpen: boolean;
  onClose: () => void;
  isVi?: boolean;
}

interface Atom3D {
  symbol: string;
  name: string;
  x: number;
  y: number;
  z: number;
  color: string;
  radius: number;
  isLonePair?: boolean;
}

interface VseprMolecule {
  id: string;
  formula: string;
  name: { EN: string; VN: string };
  geometry: { EN: string; VN: string };
  vseprType: string; // e.g. AX4, AX3E1, AX2E2
  stericNumber: number;
  hybridization: string; // sp, sp2, sp3, sp3d, sp3d2
  idealAngle: string;
  actualAngle: string;
  explanation: { EN: string; VN: string };
  centralAtom: Atom3D;
  ligands: Atom3D[];
}

const MOLECULES: VseprMolecule[] = [
  {
    id: 'ch4',
    formula: 'CH₄',
    name: { EN: 'Methane', VN: 'Metan' },
    geometry: { EN: 'Tetrahedral', VN: 'Tứ diện đều' },
    vseprType: 'AX₄',
    stericNumber: 4,
    hybridization: 'sp³',
    idealAngle: '109.5°',
    actualAngle: '109.5°',
    explanation: {
      EN: '4 bonding pairs distributed symmetrically in 3D space with zero lone pairs. Angle = exactly 109.5°.',
      VN: '4 cặp electron liên kết phân bố đối xứng hoàn hảo trong không gian 3 chiều, 0 cặp electron tự do. Góc liên kết chuẩn 109.5°.'
    },
    centralAtom: { symbol: 'C', name: 'Carbon', x: 0, y: 0, z: 0, color: '#334155', radius: 26 },
    ligands: [
      { symbol: 'H', name: 'Hydrogen', x: 0, y: -90, z: 0, color: '#e2e8f0', radius: 16 },
      { symbol: 'H', name: 'Hydrogen', x: 85, y: 30, z: -35, color: '#e2e8f0', radius: 16 },
      { symbol: 'H', name: 'Hydrogen', x: -85, y: 30, z: -35, color: '#e2e8f0', radius: 16 },
      { symbol: 'H', name: 'Hydrogen', x: 0, y: 30, z: 90, color: '#e2e8f0', radius: 16 }
    ]
  },
  {
    id: 'nh3',
    formula: 'NH₃',
    name: { EN: 'Ammonia', VN: 'Amoniac' },
    geometry: { EN: 'Trigonal Pyramidal', VN: 'Chóp tam giác' },
    vseprType: 'AX₃E₁',
    stericNumber: 4,
    hybridization: 'sp³',
    idealAngle: '109.5°',
    actualAngle: '107.0°',
    explanation: {
      EN: '1 lone pair on Nitrogen exerts stronger electrostatic repulsion than bonding pairs, compressing H-N-H bond angles to 107.0°.',
      VN: '1 cặp electron tự do (lone pair) trên Nito đẩy mạnh hơn các cặp liên kết, nén góc H-N-H từ 109.5° xuống còn 107.0°.'
    },
    centralAtom: { symbol: 'N', name: 'Nitrogen', x: 0, y: -10, z: 0, color: '#2563eb', radius: 26 },
    ligands: [
      { symbol: 'H', name: 'Hydrogen', x: 75, y: 40, z: -35, color: '#e2e8f0', radius: 16 },
      { symbol: 'H', name: 'Hydrogen', x: -75, y: 40, z: -35, color: '#e2e8f0', radius: 16 },
      { symbol: 'H', name: 'Hydrogen', x: 0, y: 40, z: 80, color: '#e2e8f0', radius: 16 },
      { symbol: '::', name: 'Lone Pair', x: 0, y: -85, z: 0, color: '#f43f5e', radius: 18, isLonePair: true }
    ]
  },
  {
    id: 'h2o',
    formula: 'H₂O',
    name: { EN: 'Water', VN: 'Nước' },
    geometry: { EN: 'Bent / Angular', VN: 'Gấp khúc (Chữ V)' },
    vseprType: 'AX₂E₂',
    stericNumber: 4,
    hybridization: 'sp³',
    idealAngle: '109.5°',
    actualAngle: '104.5°',
    explanation: {
      EN: '2 lone pairs on Oxygen exert double repulsive force, squeezing the H-O-H bond angle down to 104.5°.',
      VN: '2 cặp electron tự do trên Oxy tạo lực đẩy cực mạnh, bóp hẹp góc liên kết H-O-H xuống chỉ còn 104.5°.'
    },
    centralAtom: { symbol: 'O', name: 'Oxygen', x: 0, y: -15, z: 0, color: '#dc2626', radius: 26 },
    ligands: [
      { symbol: 'H', name: 'Hydrogen', x: -65, y: 45, z: 0, color: '#e2e8f0', radius: 16 },
      { symbol: 'H', name: 'Hydrogen', x: 65, y: 45, z: 0, color: '#e2e8f0', radius: 16 },
      { symbol: '::', name: 'Lone Pair 1', x: -45, y: -80, z: -30, color: '#f43f5e', radius: 18, isLonePair: true },
      { symbol: '::', name: 'Lone Pair 2', x: 45, y: -80, z: 30, color: '#f43f5e', radius: 18, isLonePair: true }
    ]
  },
  {
    id: 'bf3',
    formula: 'BF₃',
    name: { EN: 'Boron Trifluoride', VN: 'Bo Triflorua' },
    geometry: { EN: 'Trigonal Planar', VN: 'Tam giác phẳng' },
    vseprType: 'AX₃',
    stericNumber: 3,
    hybridization: 'sp²',
    idealAngle: '120.0°',
    actualAngle: '120.0°',
    explanation: {
      EN: '3 electron domains in a single plane maximizing distance at 120° apart (sp² hybridization).',
      VN: '3 cặp electron cùng nằm trên một mặt phẳng, khoảng cách tối đa với góc 120° (lai hóa sp²).'
    },
    centralAtom: { symbol: 'B', name: 'Boron', x: 0, y: 0, z: 0, color: '#10b981', radius: 24 },
    ligands: [
      { symbol: 'F', name: 'Fluorine', x: 0, y: -90, z: 0, color: '#38bdf8', radius: 20 },
      { symbol: 'F', name: 'Fluorine', x: 78, y: 45, z: 0, color: '#38bdf8', radius: 20 },
      { symbol: 'F', name: 'Fluorine', x: -78, y: 45, z: 0, color: '#38bdf8', radius: 20 }
    ]
  },
  {
    id: 'becl2',
    formula: 'BeCl₂',
    name: { EN: 'Beryllium Chloride', VN: 'Beri Clorua' },
    geometry: { EN: 'Linear', VN: 'Đường thẳng' },
    vseprType: 'AX₂',
    stericNumber: 2,
    hybridization: 'sp',
    idealAngle: '180.0°',
    actualAngle: '180.0°',
    explanation: {
      EN: '2 bonding domains facing opposite sides in a straight line at 180° (sp hybridization).',
      VN: '2 cặp electron đối xứng thẳng hàng hai phía ngược nhau với góc 180° (lai hóa sp).'
    },
    centralAtom: { symbol: 'Be', name: 'Beryllium', x: 0, y: 0, z: 0, color: '#64748b', radius: 22 },
    ligands: [
      { symbol: 'Cl', name: 'Chlorine', x: -100, y: 0, z: 0, color: '#a3e635', radius: 22 },
      { symbol: 'Cl', name: 'Chlorine', x: 100, y: 0, z: 0, color: '#a3e635', radius: 22 }
    ]
  },
  {
    id: 'sf6',
    formula: 'SF₆',
    name: { EN: 'Sulfur Hexafluoride', VN: 'Lưu huỳnh Hexaflorua' },
    geometry: { EN: 'Octahedral', VN: 'Bát diện đều' },
    vseprType: 'AX₆',
    stericNumber: 6,
    hybridization: 'sp³d²',
    idealAngle: '90.0°',
    actualAngle: '90.0°',
    explanation: {
      EN: '6 Fluorine atoms positioned symmetrically at 90° vertices of a regular octahedron (sp³d² expanded octet).',
      VN: '6 nguyên tử Flo nằm tại 6 đỉnh của hình bát diện đều với góc 90° (bát tành mở rộng lai hóa sp³d²).'
    },
    centralAtom: { symbol: 'S', name: 'Sulfur', x: 0, y: 0, z: 0, color: '#facc15', radius: 28 },
    ligands: [
      { symbol: 'F', name: 'Fluorine', x: 0, y: -85, z: 0, color: '#38bdf8', radius: 18 },
      { symbol: 'F', name: 'Fluorine', x: 0, y: 85, z: 0, color: '#38bdf8', radius: 18 },
      { symbol: 'F', name: 'Fluorine', x: -85, y: 0, z: 0, color: '#38bdf8', radius: 18 },
      { symbol: 'F', name: 'Fluorine', x: 85, y: 0, z: 0, color: '#38bdf8', radius: 18 },
      { symbol: 'F', name: 'Fluorine', x: 0, y: 0, z: -85, color: '#38bdf8', radius: 18 },
      { symbol: 'F', name: 'Fluorine', x: 0, y: 0, z: 85, color: '#38bdf8', radius: 18 }
    ]
  }
];

export const VseprOrbitalModal: React.FC<VseprOrbitalModalProps> = ({ isOpen, onClose, isVi = false }) => {
  const [selectedMolecule, setSelectedMolecule] = useState<VseprMolecule>(MOLECULES[0]);
  const [showOrbitalClouds, setShowOrbitalClouds] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // 3D Rotation angles (Euler angles)
  const [rotX, setRotX] = useState<number>(0.3);
  const [rotY, setRotY] = useState<number>(0.5);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 3D Canvas Projection Loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      if (autoRotate && !isDraggingRef.current) {
        setRotY(prev => prev + 0.012);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 3D Rotation helper
      const project = (x: number, y: number, z: number) => {
        // Rotate around Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // Rotate around X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective scaling
        const fov = 350;
        const scale = fov / (fov + z2);

        return {
          px: centerX + x1 * scale,
          py: centerY + y2 * scale,
          depth: z2,
          scale
        };
      };

      const centralProj = project(
        selectedMolecule.centralAtom.x,
        selectedMolecule.centralAtom.y,
        selectedMolecule.centralAtom.z
      );

      // Collect all 3D items to sort by Z-depth (Painter's Algorithm)
      const renderItems: any[] = [];

      // 1. Add chemical bonds
      selectedMolecule.ligands.forEach(lig => {
        const ligProj = project(lig.x, lig.y, lig.z);
        renderItems.push({
          type: 'bond',
          depth: (centralProj.depth + ligProj.depth) / 2,
          isLonePair: lig.isLonePair,
          x1: centralProj.px,
          y1: centralProj.py,
          x2: ligProj.px,
          y2: ligProj.py,
          scale: (centralProj.scale + ligProj.scale) / 2
        });

        // 2. Add orbital clouds if enabled
        if (showOrbitalClouds) {
          renderItems.push({
            type: 'orbital_lobe',
            depth: (centralProj.depth + ligProj.depth) / 2,
            isLonePair: lig.isLonePair,
            x1: centralProj.px,
            y1: centralProj.py,
            x2: ligProj.px,
            y2: ligProj.py,
            scale: ligProj.scale
          });
        }

        // 3. Add ligand atom
        renderItems.push({
          type: 'atom',
          depth: ligProj.depth,
          px: ligProj.px,
          py: ligProj.py,
          scale: ligProj.scale,
          atom: lig
        });
      });

      // 4. Add Central Atom
      renderItems.push({
        type: 'atom',
        depth: centralProj.depth,
        px: centralProj.px,
        py: centralProj.py,
        scale: centralProj.scale,
        atom: selectedMolecule.centralAtom
      });

      // Sort items back-to-front (highest depth drawn first)
      renderItems.sort((a, b) => b.depth - a.depth);

      // Draw sorted items
      renderItems.forEach(item => {
        if (item.type === 'bond') {
          if (!item.isLonePair) {
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 5 * item.scale;
            ctx.beginPath();
            ctx.moveTo(item.x1, item.y1);
            ctx.lineTo(item.x2, item.y2);
            ctx.stroke();
          } else {
            // Dashed line for lone pair direction
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
            ctx.lineWidth = 2 * item.scale;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(item.x1, item.y1);
            ctx.lineTo(item.x2, item.y2);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        } else if (item.type === 'orbital_lobe') {
          // Draw translucent pear-shaped electron cloud
          const midX = (item.x1 + item.x2) / 2;
          const midY = (item.y1 + item.y2) / 2;
          const lobeRadius = (item.isLonePair ? 28 : 20) * item.scale;

          const lobeGrad = ctx.createRadialGradient(midX, midY, 0, midX, midY, lobeRadius);
          if (item.isLonePair) {
            lobeGrad.addColorStop(0, 'rgba(244, 63, 94, 0.55)');
            lobeGrad.addColorStop(0.7, 'rgba(244, 63, 94, 0.2)');
            lobeGrad.addColorStop(1, 'transparent');
          } else {
            lobeGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
            lobeGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.15)');
            lobeGrad.addColorStop(1, 'transparent');
          }

          ctx.fillStyle = lobeGrad;
          ctx.beginPath();
          ctx.arc(midX, midY, lobeRadius, 0, Math.PI * 2);
          ctx.fill();
        } else if (item.type === 'atom') {
          const r = item.atom.radius * item.scale;

          if (item.atom.isLonePair) {
            // Render Lone Pair symbol (two dots)
            ctx.fillStyle = 'rgba(244, 63, 94, 0.85)';
            ctx.beginPath();
            ctx.arc(item.px - 6 * item.scale, item.py, 3.5 * item.scale, 0, Math.PI * 2);
            ctx.arc(item.px + 6 * item.scale, item.py, 3.5 * item.scale, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Shaded 3D Sphere with Specular Highlight
            const grad = ctx.createRadialGradient(
              item.px - r * 0.35, item.py - r * 0.35, r * 0.1,
              item.px, item.py, r
            );
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(0.3, item.atom.color);
            grad.addColorStop(1, '#020617');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(item.px, item.py, r, 0, Math.PI * 2);
            ctx.fill();

            // Atom Symbol text
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${Math.round(13 * item.scale)}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(item.atom.symbol, item.px, item.py);
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isOpen, selectedMolecule, showOrbitalClouds, autoRotate, rotX, rotY]);

  // Mouse Drag Handling for 3D Orbiting
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setRotY(prev => prev + dx * 0.01);
    setRotX(prev => Math.max(-1.4, Math.min(1.4, prev + dy * 0.01)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-[#020712]/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 font-sans select-none animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-gradient-to-b from-[#061528] via-[#040e1c] to-[#020814] border-2 border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(34,211,238,0.25)] flex flex-col overflow-hidden max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-cyan-900/60 bg-[#040f20]/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/50 text-purple-300 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              🔮
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase font-mono">
                  {isVi ? 'MÔ HÌNH HÌNH HỌC VSEPR & LAI HÓA ORBITAL 3D' : '3D VSEPR GEOMETRY & HYBRIDIZATION VIEWER'}
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-purple-950 border border-purple-700/60 text-purple-300 font-mono text-[10px] font-bold">
                  GDPT 2018 LỚP 10
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isVi ? 'Mô phỏng lực đẩy cặp electron vỏ hóa trị, góc liên kết và đám mây orbital lai hóa' : 'Valence shell electron pair repulsion, bond angles & hybrid orbital lobes'}
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
          
          {/* Left: 3D Viewport (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            <div 
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="relative h-72 sm:h-80 w-full rounded-2xl bg-[#020611] border border-cyan-900/60 shadow-inner flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <canvas
                ref={canvasRef}
                width={520}
                height={320}
                className="w-full h-full object-contain"
              />

              {/* Angle Readout Overlay */}
              <div className="absolute top-3 left-3 bg-[#030914]/85 px-3 py-1.5 rounded-xl border border-cyan-950 font-mono text-[11px] flex flex-col gap-0.5 pointer-events-none">
                <span className="text-cyan-400 font-bold">
                  📐 {isVi ? 'GÓC LIÊN KẾT THỰC TẾ' : 'ACTUAL BOND ANGLE'}: <span className="text-amber-300 text-sm font-black">{selectedMolecule.actualAngle}</span>
                </span>
                <span className="text-slate-400 text-[10px]">
                  {isVi ? 'Góc lý thuyết đối xứng' : 'Ideal symmetric angle'}: {selectedMolecule.idealAngle}
                </span>
              </div>

              {/* Viewport Control Badges */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => { audioManager.playClick(); setShowOrbitalClouds(!showOrbitalClouds); }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer active:scale-95 shadow-lg ${
                    showOrbitalClouds 
                      ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200' 
                      : 'bg-[#030914] border-slate-800 text-slate-500'
                  }`}
                >
                  ☁️ {showOrbitalClouds ? (isVi ? 'ĐÁM MÂY ORBITAL: BẬT' : 'ORBITALS: ON') : (isVi ? 'ĐÁM MÂY ORBITAL: TẮT' : 'ORBITALS: OFF')}
                </button>
                <button
                  onClick={() => { audioManager.playClick(); setAutoRotate(!autoRotate); }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer active:scale-95 shadow-lg ${
                    autoRotate 
                      ? 'bg-purple-950/90 border-purple-400 text-purple-200' 
                      : 'bg-[#030914] border-slate-800 text-slate-500'
                  }`}
                >
                  🔄 {autoRotate ? (isVi ? 'TỰ XOAY: BẬT' : 'AUTO-ROTATE') : (isVi ? 'DỪNG XOAY' : 'PAUSED')}
                </button>
              </div>
            </div>

            {/* Scientific Explanation Card */}
            <div className="p-3.5 rounded-2xl bg-[#040e1e] border border-cyan-900/40 text-xs font-sans text-slate-300">
              <span className="font-mono text-cyan-400 font-bold block mb-1">
                🔬 {isVi ? 'PHÂN TÍCH LỰC ĐẨY CẶP ELECTRON (VSEPR):' : 'VSEPR ELECTROSTATIC REPULSION MECHANISM:'}
              </span>
              <p className="leading-relaxed">
                {isVi ? selectedMolecule.explanation.VN : selectedMolecule.explanation.EN}
              </p>
            </div>

          </div>

          {/* Right: Molecule Selector & Geometric Parameters (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              🧪 {isVi ? 'CHỌN PHÂN TỬ HÓA HỌC' : 'SELECT TARGET MOLECULE'}
            </h3>

            {/* List of molecules */}
            <div className="grid grid-cols-2 gap-2">
              {MOLECULES.map(mol => {
                const isSelected = selectedMolecule.id === mol.id;
                return (
                  <button
                    key={mol.id}
                    onClick={() => { audioManager.playClick(); setSelectedMolecule(mol); }}
                    className={`p-2.5 rounded-2xl border text-left font-mono text-xs font-bold transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#0a2745] border-cyan-400 text-cyan-200 shadow-md' 
                        : 'bg-[#040e1c] border-cyan-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-white text-sm font-sans font-bold">{mol.formula} ({isVi ? mol.name.VN : mol.name.EN})</div>
                    <div className="text-[10px] text-cyan-400">{mol.vseprType} // {mol.hybridization}</div>
                  </button>
                );
              })}
            </div>

            {/* Parameters Table */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#06152b] to-[#030914] border border-cyan-800/60 flex flex-col gap-2 font-mono text-xs">
              <span className="text-amber-300 font-bold uppercase text-[11px] border-b border-cyan-950 pb-1.5">
                📐 {isVi ? 'BẢNG THÔNG SỐ CẤU TRÚC KHÔNG GIAN' : 'GEOMETRIC QUANTUM MATRIX'}
              </span>

              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">{isVi ? 'Dạng hình học:' : 'Molecular Geometry:'}</span>
                <span className="text-white font-bold">{isVi ? selectedMolecule.geometry.VN : selectedMolecule.geometry.EN}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">{isVi ? 'Kiểu VSEPR:' : 'VSEPR Classification:'}</span>
                <span className="text-cyan-300 font-bold">{selectedMolecule.vseprType}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">{isVi ? 'Trạng thái lai hóa:' : 'Hybridization State:'}</span>
                <span className="text-purple-300 font-bold">{selectedMolecule.hybridization}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">{isVi ? 'Số phối trí (Steric No.):' : 'Steric Number:'}</span>
                <span className="text-white font-bold">{selectedMolecule.stericNumber}</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-400">{isVi ? 'Cặp electron tự do:' : 'Lone Electron Pairs:'}</span>
                <span className="text-rose-400 font-bold">
                  {selectedMolecule.ligands.filter(l => l.isLonePair).length}
                </span>
              </div>
            </div>

            {/* VSEPR Hierarchy Axiom */}
            <div className="p-3.5 rounded-2xl bg-[#030914] border border-cyan-950 text-xs font-mono text-slate-300">
              <span className="text-rose-300 font-bold block mb-1">
                ⚡ {isVi ? 'QUY LUẬT LỰC ĐẨY VSEPR:' : 'VSEPR REPULSION HIERARCHY:'}
              </span>
              <p className="text-[11px] text-cyan-200">
                Lone Pair - Lone Pair &gt; Lone Pair - Bonding Pair &gt; Bonding Pair - Bonding Pair
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
