import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulationStore, getTableBenchY } from '../engine/store';
import { audioManager } from '../engine/AudioManager';
import { LatexRenderer } from './LatexRenderer';
import {
    CHEMISTRY_FORMULAS,
    FORMULA_SYMBOLS_TABLE,
    CALCULATION_QUESTIONS_DATA,
    QUICK_CALC_SUBSTANCES,
    ChemistryFormula,
    CalculationQuestion
} from '../data/ChemistryFormulaData';
import {
    balanceChemicalEquation,
    calculateStoichiometryTable,
    PRESET_EQUATIONS,
    BalancedEquationResult,
    StoichiometryCalculationRow
} from '../services/EquationBalancer';
import { LiveTitrationModal } from './LiveTitrationModal';

export const CalculatingMode: React.FC = () => {
    const isCalculatingModeActive = useSimulationStore(state => state.isCalculatingModeActive);
    const setCalculatingMode = useSimulationStore(state => state.setCalculatingMode);
    const rawLanguage = useSimulationStore(state => state.language || 'EN');
    const isVi = rawLanguage === 'VN' || rawLanguage === 'vi';
    const setAppState = useSimulationStore(state => state.setAppState);
    const flushAll = useSimulationStore(state => state.flushAll);
    const spawnContainer = useSimulationStore(state => state.spawnContainer);
    const addReagentToContainer = useSimulationStore(state => state.addReagentToContainer);

    // Active Navigation Tabs: 'BOARD' | 'SOLVER' | 'QUESTIONS' | 'SYMBOLS'
    const [activeTab, setActiveTab] = useState<'BOARD' | 'SOLVER' | 'QUESTIONS' | 'SYMBOLS'>('BOARD');

    // Selected Formula for Highlight / Inspection
    const [selectedFormulaId, setSelectedFormulaId] = useState<string>('mole_mass_volume');

    // Questions Filter
    const [selectedGrade, setSelectedGrade] = useState<number | 'ALL'>('ALL');
    const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
    const [activeQuestionId, setActiveQuestionId] = useState<string>(CALCULATION_QUESTIONS_DATA[0].id);
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
    const [showSolutionMap, setShowSolutionMap] = useState<Record<string, boolean>>({});
    const [answerFeedback, setAnswerFeedback] = useState<Record<string, 'CORRECT' | 'WRONG' | null>>({});

    // Interactive Solvers State
    const [activeSolver, setActiveSolver] = useState<string>('MOLE');
    
    // Solver 1: Mole / Mass / Gas
    const [solverMass, setSolverMass] = useState<number>(31.6);
    const [solverMolarMass, setSolverMolarMass] = useState<number>(158);
    const [selectedQuickSubstance, setSelectedQuickSubstance] = useState<string>('KMnO4');

    // Solver 2: Solution Concentration C%
    const [solverSoluteMass, setSolverSoluteMass] = useState<number>(15);
    const [solverSolutionMass, setSolverSolutionMass] = useState<number>(200);

    // Solver 3: Molarity C_M
    const [solverMoles, setSolverMoles] = useState<number>(0.2);
    const [solverVolumeLiters, setSolverVolumeLiters] = useState<number>(0.5);

    // Solver 4: C% <-> C_M via Density
    const [solverCPercent, setSolverCPercent] = useState<number>(98);
    const [solverDensity, setSolverDensity] = useState<number>(1.84);
    const [solverSoluteM, setSolverSoluteM] = useState<number>(98);

    // Solver 5: pH Calculation
    const [solverHPlus, setSolverHPlus] = useState<number>(0.01);

    // Solver 6: Auto Redox & Stoichiometry Balancer
    const [equationInput, setEquationInput] = useState<string>('Fe3O4 + HNO3 -> Fe(NO3)3 + NO + H2O');
    const [balancedResult, setBalancedResult] = useState<BalancedEquationResult>(() => balanceChemicalEquation('Fe3O4 + HNO3 -> Fe(NO3)3 + NO + H2O'));
    const [selectedStoichSubstance, setSelectedStoichSubstance] = useState<string>('Fe3O4');
    const [stoichInputType, setStoichInputType] = useState<'MASS' | 'MOLES'>('MASS');
    const [stoichInputValue, setStoichInputValue] = useState<number>(23.2);
    const [isTitrationStationOpen, setIsTitrationStationOpen] = useState<boolean>(false);

    // Search query for formulas and symbols
    const [formulaSearch, setFormulaSearch] = useState<string>('');
    const [symbolSearch, setSymbolSearch] = useState<string>('');

    // Handle Escape Key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isCalculatingModeActive) {
                setCalculatingMode(false);
            }
        };
        if (isCalculatingModeActive) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isCalculatingModeActive, setCalculatingMode]);

    if (!isCalculatingModeActive) return null;

    // Filtered Formulas
    const filteredFormulas = CHEMISTRY_FORMULAS.filter(f => {
        if (!formulaSearch.trim()) return true;
        const q = formulaSearch.toLowerCase();
        return (
            f.title.VN.toLowerCase().includes(q) ||
            f.title.EN.toLowerCase().includes(q) ||
            f.description.VN.toLowerCase().includes(q) ||
            f.description.EN.toLowerCase().includes(q) ||
            f.latexMain.toLowerCase().includes(q)
        );
    });

    // Filtered Questions
    const filteredQuestions = CALCULATION_QUESTIONS_DATA.filter(q => {
        if (selectedGrade !== 'ALL' && q.grade !== selectedGrade) return false;
        if (selectedCategory !== 'ALL' && q.category !== selectedCategory) return false;
        return true;
    });

    const activeQuestion = CALCULATION_QUESTIONS_DATA.find(q => q.id === activeQuestionId) || filteredQuestions[0] || CALCULATION_QUESTIONS_DATA[0];

    // Filtered Symbols
    const filteredSymbols = FORMULA_SYMBOLS_TABLE.filter(s => {
        if (!symbolSearch.trim()) return true;
        const q = symbolSearch.toLowerCase();
        return (
            s.symbol.toLowerCase().includes(q) ||
            s.name.VN.toLowerCase().includes(q) ||
            s.name.EN.toLowerCase().includes(q) ||
            s.unit.toLowerCase().includes(q) ||
            s.description.VN.toLowerCase().includes(q)
        );
    });

    // Answer Checking Logic
    const handleCheckAnswer = (q: CalculationQuestion) => {
        const userAns = (userAnswers[q.id] || '').trim();
        if (!userAns) return;

        audioManager.playClick();
        let isCorrect = false;

        if (q.numericAnswer) {
            const parsed = parseFloat(userAns.replace(',', '.'));
            if (!isNaN(parsed)) {
                const diff = Math.abs(parsed - q.numericAnswer.value);
                isCorrect = diff <= q.numericAnswer.tolerance;
            }
        } else if (q.options) {
            const correctOpt = q.options.find(o => o.isCorrect);
            isCorrect = correctOpt ? correctOpt.id.toLowerCase() === userAns.toLowerCase() : false;
        }

        if (isCorrect) {
            audioManager.playSuccess();
            setAnswerFeedback(prev => ({ ...prev, [q.id]: 'CORRECT' }));
        } else {
            audioManager.playGlassClink();
            setAnswerFeedback(prev => ({ ...prev, [q.id]: 'WRONG' }));
        }
    };

    // Load suggested chemicals into lab workbench
    const handleLoadToWorkbench = (reagents?: string[]) => {
        if (!reagents || reagents.length === 0) return;
        audioManager.playClick();
        setCalculatingMode(false);
        setAppState('WORKBENCH');

        setTimeout(() => {
            flushAll();
            spawnContainer('beaker', window.innerWidth * 0.45, getTableBenchY());
            setTimeout(() => {
                const containers = useSimulationStore.getState().containers;
                if (containers.length > 0) {
                    const targetId = containers[0].id;
                    reagents.forEach(r => {
                        addReagentToContainer(targetId, r, 20);
                    });
                }
            }, 100);
        }, 150);
    };

    return (
        <div className="fixed inset-0 z-[120] bg-[#020712]/95 backdrop-blur-2xl flex flex-col font-sans select-none overflow-hidden text-slate-100">
            {/* Ambient Cyber Grid & Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.08)_0%,_rgba(6,182,212,0.05)_40%,_transparent_75%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* TOP COMMAND HEADER */}
            <header className="relative z-20 flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 bg-[#030d1c]/90 border-b border-amber-500/30 backdrop-blur-xl shrink-0 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
                {/* Left Branding */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-cyan-500/20 border border-amber-400/60 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                        🧮
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
                            <h1 className="text-base md:text-lg font-black tracking-wider uppercase bg-gradient-to-r from-amber-300 via-amber-100 to-cyan-300 bg-clip-text text-transparent font-mono">
                                {isVi ? 'CHẾ ĐỘ TÍNH TOÁN // BẢNG CÔNG THỨC' : 'CALCULATING MODE // FORMULA LAB'}
                            </h1>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono font-bold">
                                GDPT 2018 • LỚP 8-12
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono hidden sm:block">
                            {isVi
                                ? 'Hệ thống công thức chuẩn, máy tính thế số tự động & bài tập lượng giác hóa học'
                                : 'Standard Formula Sheet, Instant Variable Solvers & Grade 8-12 Calculations'}
                        </p>
                    </div>
                </div>

                {/* Center Segmented Navigation Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-[#020611]/90 border border-amber-500/30 rounded-2xl shadow-inner">
                    <button
                        type="button"
                        onClick={() => { audioManager.playClick(); setActiveTab('BOARD'); }}
                        className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                            activeTab === 'BOARD'
                                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                                : 'text-slate-400 hover:text-amber-200 hover:bg-amber-950/30'
                        }`}
                    >
                        <span>📋</span>
                        <span>{isVi ? 'BẢNG CÔNG THỨC' : 'FORMULA SHEET'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => { audioManager.playClick(); setActiveTab('SOLVER'); }}
                        className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                            activeTab === 'SOLVER'
                                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                                : 'text-slate-400 hover:text-cyan-200 hover:bg-cyan-950/30'
                        }`}
                    >
                        <span>⚡</span>
                        <span>{isVi ? 'MÁY TÍNH THẾ SỐ' : 'LIVE SOLVER'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => { audioManager.playClick(); setActiveTab('QUESTIONS'); }}
                        className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                            activeTab === 'QUESTIONS'
                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                                : 'text-slate-400 hover:text-emerald-200 hover:bg-emerald-950/30'
                        }`}
                    >
                        <span>🎯</span>
                        <span>{isVi ? 'BÀI TẬP LỚP 8-12' : 'QUESTION BANK'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => { audioManager.playClick(); setActiveTab('SYMBOLS'); }}
                        className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                            activeTab === 'SYMBOLS'
                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                : 'text-slate-400 hover:text-purple-200 hover:bg-purple-950/30'
                        }`}
                    >
                        <span>📖</span>
                        <span>{isVi ? 'CHÚ THÍCH & ĐƠN VỊ' : 'SYMBOLS & UNITS'}</span>
                    </button>
                </div>

                {/* Right Actions: Close Button */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => { audioManager.playClick(); setCalculatingMode(false); }}
                        className="px-4 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/60 hover:border-rose-400 text-rose-200 hover:text-white font-mono text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                        <span>✕</span>
                        <span>{isVi ? 'ĐÓNG (ESC)' : 'EXIT (ESC)'}</span>
                    </button>
                </div>
            </header>

            {/* MAIN CONTENT BODY */}
            <div className="relative z-10 flex-1 overflow-hidden p-4 md:p-6 flex flex-col">
                {/* VIEW 1: THE REPLICATED & EXPANDED FORMULA SHEET BOARD */}
                {activeTab === 'BOARD' && (
                    <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-1 max-w-7xl mx-auto w-full">
                        {/* Interactive Mole-Mass-Volume Conversion Banner (Section 1 Diagram) */}
                        <div className="relative p-5 md:p-6 rounded-3xl bg-gradient-to-r from-[#09182d]/95 via-[#0c1f3d]/95 to-[#09182d]/95 border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.15)] overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="max-w-md">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/40">
                                            SƠ ĐỒ TRỌNG TÂM #1
                                        </span>
                                        <h3 className="font-mono text-sm md:text-base font-bold text-white uppercase tracking-wide">
                                            {isVi ? 'Tam Giác Chuyển Đổi Số Mol - Khối Lượng - Thể Tích Khí' : 'Mole-Mass-Gas Volume Triad Conversion'}
                                        </h3>
                                    </div>
                                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                                        {isVi
                                            ? 'Cầu nối lượng giác trung tâm của môn Hóa học: Chuyển đổi qua lại giữa khối lượng m (g), lượng chất n (mol) và thể tích chất khí V (L) ở điều kiện chuẩn 25°C, 1 bar (1 mol = 24,79 L).'
                                            : 'The core quantitative bridge of chemistry: Interconverting mass m (g), amount in moles n (mol), and gas volume V (L) at 25°C, 1 bar (1 mol = 24.79 L).'}
                                    </p>
                                </div>

                                {/* Visual Diagram Flow */}
                                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 p-4 rounded-2xl bg-[#030914]/80 border border-cyan-800/60 shadow-inner">
                                    {/* Box Mass m */}
                                    <div className="flex flex-col items-center p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/50 min-w-[120px] text-center shadow-md">
                                        <span className="text-[10px] text-cyan-300 font-mono uppercase font-bold">{isVi ? 'Khối lượng' : 'Mass'}</span>
                                        <span className="text-xl font-mono font-black text-white">m (gam)</span>
                                    </div>

                                    {/* Left Arrow: m <-> n */}
                                    <div className="flex flex-col items-center justify-center gap-1 font-mono text-[10px] text-amber-300 font-bold px-1">
                                        <span>n = m / M ➔</span>
                                        <span className="text-slate-400">◀ m = n · M</span>
                                    </div>

                                    {/* Center Box Mole n */}
                                    <div className="flex flex-col items-center p-3.5 rounded-2xl bg-amber-500/20 border-2 border-amber-400 min-w-[140px] text-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                                        <span className="text-[10px] text-amber-300 font-mono uppercase font-bold tracking-wider">{isVi ? 'TRUNG TÂM' : 'CORE PIVOT'}</span>
                                        <span className="text-2xl font-mono font-black text-amber-200">n (mol)</span>
                                    </div>

                                    {/* Right Arrow: n <-> V */}
                                    <div className="flex flex-col items-center justify-center gap-1 font-mono text-[10px] text-cyan-300 font-bold px-1">
                                        <span>➔ V = n · 24.79</span>
                                        <span className="text-slate-400">◀ n = V / 24.79</span>
                                    </div>

                                    {/* Box Volume V */}
                                    <div className="flex flex-col items-center p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/50 min-w-[120px] text-center shadow-md">
                                        <span className="text-[10px] text-cyan-300 font-mono uppercase font-bold">{isVi ? 'Thể tích khí (đkc)' : 'Gas Volume'}</span>
                                        <span className="text-xl font-mono font-black text-white">V (Lít)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search & Category Filter Toolbar */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="relative flex-1 max-w-md">
                                <input
                                    type="text"
                                    value={formulaSearch}
                                    onChange={(e) => setFormulaSearch(e.target.value)}
                                    placeholder={isVi ? 'Tìm công thức (mol, C%, nồng độ, tỉ khối, pH...)' : 'Search formula (mole, C%, molarity, density, pH...)'}
                                    className="w-full bg-[#051122] border border-cyan-800/70 rounded-xl py-2 pl-9 pr-3 text-xs text-cyan-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors font-mono"
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">🔍</span>
                            </div>

                            <span className="text-xs text-slate-400 font-mono">
                                {isVi ? `Hiển thị ${filteredFormulas.length} công thức` : `Showing ${filteredFormulas.length} formulas`}
                            </span>
                        </div>

                        {/* Cards Grid: Replicating the 9 Formulas on the Paper + Advanced */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredFormulas.map((f) => (
                                <div
                                    key={f.id}
                                    className="group relative p-5 rounded-2xl bg-[#040e1c]/85 border border-cyan-900/60 hover:border-amber-400/80 hover:bg-[#071830] transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]"
                                >
                                    <div>
                                        {/* Card Header */}
                                        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-cyan-900/40">
                                            <span className="text-xs font-mono font-bold text-amber-300">
                                                {f.title[isVi ? 'VN' : 'EN']}
                                            </span>
                                            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono border border-cyan-800 shrink-0">
                                                {f.gradeRange}
                                            </span>
                                        </div>

                                        {/* Main LaTeX Equation */}
                                        <div className="my-3 p-3 rounded-xl bg-[#020712] border border-cyan-950 flex items-center justify-center min-h-[56px] text-amber-200">
                                            <LatexRenderer content={`$$${f.latexMain}$$`} />
                                        </div>

                                        {/* Variant Formulas */}
                                        {f.latexVariants && f.latexVariants.length > 0 && (
                                            <div className="space-y-1 mb-3">
                                                {f.latexVariants.map((v, i) => (
                                                    <div key={i} className="text-xs text-slate-300 bg-[#061426]/60 p-1.5 rounded-lg border border-cyan-950 flex items-center justify-center">
                                                        <LatexRenderer content={`$$${v}$$`} />
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Description */}
                                        <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-3">
                                            {f.description[isVi ? 'VN' : 'EN']}
                                        </p>
                                    </div>

                                    {/* Action Footnote */}
                                    <div className="pt-2 border-t border-cyan-900/30 flex items-center justify-between">
                                        <div className="flex gap-1">
                                            {f.symbols.map(s => (
                                                <span key={s} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/70 text-cyan-400 border border-cyan-900">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                audioManager.playClick();
                                                setActiveTab('SOLVER');
                                                if (f.solverType) {
                                                    if (f.solverType === 'MOLE_MASS_VOLUME') setActiveSolver('MOLE');
                                                    if (f.solverType === 'PERCENT_CONCENTRATION' || f.solverType === 'SOLUTION_MASS') setActiveSolver('CPERCENT');
                                                    if (f.solverType === 'MOLAR_CONCENTRATION') setActiveSolver('CM');
                                                    if (f.solverType === 'CM_CPERCENT_RELATION') setActiveSolver('CONVERT');
                                                    if (f.solverType === 'PH_CALCULATOR') setActiveSolver('PH');
                                                }
                                            }}
                                            className="text-xs font-mono font-bold text-amber-400 hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all cursor-pointer"
                                        >
                                            <span>{isVi ? 'Thế số' : 'Calculate'}</span>
                                            <span>➔</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* VIEW 2: INTERACTIVE LIVE VARIABLE SOLVERS */}
                {activeTab === 'SOLVER' && (
                    <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 pr-1 max-w-5xl mx-auto w-full">
                        {/* Selector Tabs for Solvers */}
                        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#030914] border border-cyan-800/60 shrink-0">
                            {[
                                { id: 'MOLE', label: isVi ? '1. Số Mol & Thể Tích (n, m, V)' : '1. Moles & Gas Volume' },
                                { id: 'CPERCENT', label: isVi ? '2. Nồng Độ C%' : '2. Mass % (C%)' },
                                { id: 'CM', label: isVi ? '3. Nồng Độ Mol C_M' : '3. Molarity C_M' },
                                { id: 'CONVERT', label: isVi ? '4. Đổi C% ↔ C_M (d)' : '4. C% ↔ C_M (d)' },
                                { id: 'PH', label: isVi ? '5. Thang Đo pH' : '5. pH Scale' },
                                { id: 'REDOX_BALANCER', label: isVi ? '✨ 6. Cân Bằng Phản Ứng & Thăng Bằng e⁻' : '✨ 6. Auto Redox & Stoichiometry' },
                            ].map(s => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => { audioManager.playClick(); setActiveSolver(s.id); }}
                                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                                        activeSolver === s.id
                                            ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                                            : 'text-slate-400 hover:text-white hover:bg-cyan-950/40'
                                    }`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>

                        {/* SOLVER 1: MOLE / MASS / GAS VOLUME */}
                        {activeSolver === 'MOLE' && (
                            <div className="p-6 rounded-3xl bg-[#040e1c]/90 border border-cyan-500/40 shadow-xl space-y-6">
                                <div className="border-b border-cyan-900/60 pb-3">
                                    <h2 className="text-base font-bold font-mono text-cyan-300 uppercase">
                                        {isVi ? 'Máy Tính Số Mol, Khối Lượng & Thể Tích Khí ở đkc (24,79 L/mol)' : 'Moles, Mass & Gas Volume Calculator (24.79 L/mol)'}
                                    </h2>
                                    <p className="text-xs text-slate-400 font-sans">
                                        {isVi ? 'Nhập khối lượng và khối lượng mol để tính số mol n và thể tích khí V (L).' : 'Enter mass and molar mass to calculate moles and gas volume.'}
                                    </p>
                                </div>

                                {/* Quick Substance Presets */}
                                <div>
                                    <span className="text-xs font-mono text-slate-400 block mb-2">{isVi ? 'Chọn nhanh chất phổ biến:' : 'Quick Select Substance:'}</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {QUICK_CALC_SUBSTANCES.map(sub => (
                                            <button
                                                key={sub.formula}
                                                type="button"
                                                onClick={() => {
                                                    audioManager.playClick();
                                                    setSelectedQuickSubstance(sub.formula);
                                                    setSolverMolarMass(sub.molarMass);
                                                }}
                                                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                                                    selectedQuickSubstance === sub.formula
                                                        ? 'bg-amber-500 text-black'
                                                        : 'bg-[#061528] text-cyan-300 border border-cyan-900 hover:border-cyan-400'
                                                }`}
                                            >
                                                {sub.formula} ({sub.molarMass})
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Input Controls */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-[#020712] border border-cyan-950 space-y-2">
                                        <label className="text-xs font-mono text-slate-300 block">{isVi ? 'Khối lượng m (gam):' : 'Mass m (grams):'}</label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={solverMass}
                                            onChange={(e) => setSolverMass(parseFloat(e.target.value) || 0)}
                                            className="w-full bg-[#051122] border border-cyan-800 rounded-xl px-3 py-2 text-cyan-200 font-mono text-base focus:border-amber-400 focus:outline-none"
                                        />
                                    </div>

                                    <div className="p-4 rounded-2xl bg-[#020712] border border-cyan-950 space-y-2">
                                        <label className="text-xs font-mono text-slate-300 block">{isVi ? 'Khối lượng mol M (g/mol):' : 'Molar Mass M (g/mol):'}</label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={solverMolarMass}
                                            onChange={(e) => setSolverMolarMass(parseFloat(e.target.value) || 1)}
                                            className="w-full bg-[#051122] border border-cyan-800 rounded-xl px-3 py-2 text-cyan-200 font-mono text-base focus:border-amber-400 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Computed Results & Steps */}
                                {solverMolarMass > 0 && (
                                    <div className="p-5 rounded-2xl bg-[#020914] border border-amber-500/40 space-y-3">
                                        <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">
                                            {isVi ? 'KẾT QUẢ & CÁC BƯỚC THẾ SỐ:' : 'RESULTS & STEP-BY-STEP SUBSTITUTION:'}
                                        </span>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60">
                                                <span className="text-xs text-slate-400 font-mono block mb-1">Số mol n:</span>
                                                <span className="text-2xl font-mono font-black text-cyan-300">
                                                    {(solverMass / solverMolarMass).toFixed(4)} mol
                                                </span>
                                                <div className="mt-2 text-xs text-slate-300">
                                                    <LatexRenderer content={`$$n = \\frac{m}{M} = \\frac{${solverMass}}{${solverMolarMass}} = ${(solverMass / solverMolarMass).toFixed(4)}\\text{ mol}$$`} />
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60">
                                                <span className="text-xs text-slate-400 font-mono block mb-1">Thể tích khí ở đkc (25°C, 1 bar):</span>
                                                <span className="text-2xl font-mono font-black text-amber-300">
                                                    {((solverMass / solverMolarMass) * 24.79).toFixed(3)} Lít
                                                </span>
                                                <div className="mt-2 text-xs text-slate-300">
                                                    <LatexRenderer content={`$$V = n \\times 24{,}79 = ${(solverMass / solverMolarMass).toFixed(4)} \\times 24{,}79 = ${((solverMass / solverMolarMass) * 24.79).toFixed(3)}\\text{ L}$$`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* SOLVER 2: C% CONCENTRATION */}
                        {activeSolver === 'CPERCENT' && (
                            <div className="p-6 rounded-3xl bg-[#040e1c]/90 border border-cyan-500/40 shadow-xl space-y-6">
                                <div className="border-b border-cyan-900/60 pb-3">
                                    <h2 className="text-base font-bold font-mono text-cyan-300 uppercase">
                                        {isVi ? 'Máy Tính Nồng Độ Phần Trăm Khối Lượng (C%)' : 'Mass Percentage Concentration (C%) Calculator'}
                                    </h2>
                                    <p className="text-xs text-slate-400 font-sans">
                                        {isVi ? 'Công thức: C% = (m_ct / m_dd) × 100% với m_dd = m_ct + m_dm' : 'Formula: C% = (m_ct / m_dd) * 100%'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-[#020712] border border-cyan-950 space-y-2">
                                        <label className="text-xs font-mono text-slate-300 block">{isVi ? 'Khối lượng chất tan m_ct (g):' : 'Solute Mass m_ct (g):'}</label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={solverSoluteMass}
                                            onChange={(e) => setSolverSoluteMass(parseFloat(e.target.value) || 0)}
                                            className="w-full bg-[#051122] border border-cyan-800 rounded-xl px-3 py-2 text-cyan-200 font-mono text-base focus:border-amber-400 focus:outline-none"
                                        />
                                    </div>

                                    <div className="p-4 rounded-2xl bg-[#020712] border border-cyan-950 space-y-2">
                                        <label className="text-xs font-mono text-slate-300 block">{isVi ? 'Khối lượng dung dịch m_dd (g):' : 'Solution Mass m_dd (g):'}</label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={solverSolutionMass}
                                            onChange={(e) => setSolverSolutionMass(parseFloat(e.target.value) || 1)}
                                            className="w-full bg-[#051122] border border-cyan-800 rounded-xl px-3 py-2 text-cyan-200 font-mono text-base focus:border-amber-400 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {solverSolutionMass > 0 && (
                                    <div className="p-5 rounded-2xl bg-[#020914] border border-amber-500/40 space-y-3">
                                        <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">
                                            {isVi ? 'KẾT QUẢ NỒNG ĐỘ PHẦN TRĂM:' : 'RESULTING PERCENTAGE CONCENTRATION:'}
                                        </span>
                                        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
                                            <div>
                                                <span className="text-xs text-slate-400 font-mono block">C% =</span>
                                                <span className="text-3xl font-mono font-black text-amber-300">
                                                    {((solverSoluteMass / solverSolutionMass) * 100).toFixed(2)} %
                                                </span>
                                            </div>
                                            <div className="text-xs text-slate-300">
                                                <LatexRenderer content={`$$C\\% = \\frac{${solverSoluteMass}}{${solverSolutionMass}} \\times 100\\% = ${((solverSoluteMass / solverSolutionMass) * 100).toFixed(2)}\\%$$`} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* SOLVER 3: MOLARITY C_M */}
                        {activeSolver === 'CM' && (
                            <div className="p-6 rounded-3xl bg-[#040e1c]/90 border border-cyan-500/40 shadow-xl space-y-6">
                                <div className="border-b border-cyan-900/60 pb-3">
                                    <h2 className="text-base font-bold font-mono text-cyan-300 uppercase">
                                        {isVi ? 'Máy Tính Nồng Độ Mol C_M (mol/L)' : 'Molar Concentration (C_M) Calculator'}
                                    </h2>
                                    <p className="text-xs text-slate-400 font-sans">
                                        {isVi ? 'Công thức: C_M = n / V_dd (Lít)' : 'Formula: C_M = n / V (L)'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-[#020712] border border-cyan-950 space-y-2">
                                        <label className="text-xs font-mono text-slate-300 block">{isVi ? 'Số mol chất tan n (mol):' : 'Moles of Solute n (mol):'}</label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={solverMoles}
                                            onChange={(e) => setSolverMoles(parseFloat(e.target.value) || 0)}
                                            className="w-full bg-[#051122] border border-cyan-800 rounded-xl px-3 py-2 text-cyan-200 font-mono text-base focus:border-amber-400 focus:outline-none"
                                        />
                                    </div>

                                    <div className="p-4 rounded-2xl bg-[#020712] border border-cyan-950 space-y-2">
                                        <label className="text-xs font-mono text-slate-300 block">{isVi ? 'Thể tích dung dịch V (Lít):' : 'Volume of Solution V (Liters):'}</label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={solverVolumeLiters}
                                            onChange={(e) => setSolverVolumeLiters(parseFloat(e.target.value) || 0.1)}
                                            className="w-full bg-[#051122] border border-cyan-800 rounded-xl px-3 py-2 text-cyan-200 font-mono text-base focus:border-amber-400 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {solverVolumeLiters > 0 && (
                                    <div className="p-5 rounded-2xl bg-[#020914] border border-amber-500/40 space-y-3">
                                        <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">
                                            {isVi ? 'KẾT QUẢ NỒNG ĐỘ MOL C_M:' : 'RESULTING MOLAR CONCENTRATION:'}
                                        </span>
                                        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
                                            <div>
                                                <span className="text-xs text-slate-400 font-mono block">C_M =</span>
                                                <span className="text-3xl font-mono font-black text-cyan-300">
                                                    {(solverMoles / solverVolumeLiters).toFixed(3)} M (mol/L)
                                                </span>
                                            </div>
                                            <div className="text-xs text-slate-300">
                                                <LatexRenderer content={`$$C_M = \\frac{n}{V} = \\frac{${solverMoles}}{${solverVolumeLiters}} = ${(solverMoles / solverVolumeLiters).toFixed(3)}\\text{ mol/L}$$`} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* SOLVER 4: C% <-> CM via DENSITY */}
                        {activeSolver === 'CONVERT' && (
                            <div className="p-6 rounded-3xl bg-[#040e1c]/90 border border-cyan-500/40 shadow-xl space-y-6">
                                <div className="border-b border-cyan-900/60 pb-3">
                                    <h2 className="text-base font-bold font-mono text-cyan-300 uppercase">
                                        {isVi ? 'Chuyển Đổi Nồng Độ C% ↔ C_M Thông Qua Khối Lượng Riêng (d)' : 'Interconversion C% ↔ C_M via Density (d)'}
                                    </h2>
                                    <p className="text-xs text-slate-400 font-sans">
                                        {isVi ? 'Công thức: C_M = (C% × 10 × d) / M_ct' : 'Formula: C_M = (C% * 10 * d) / M_ct'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-2xl bg-[#020712] border border-cyan-950 space-y-2">
                                        <label className="text-xs font-mono text-slate-300 block">{isVi ? 'Nồng độ C% (%):' : 'Percentage C% (%):'}</label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={solverCPercent}
                                            onChange={(e) => setSolverCPercent(parseFloat(e.target.value) || 0)}
                                            className="w-full bg-[#051122] border border-cyan-800 rounded-xl px-3 py-2 text-cyan-200 font-mono text-base focus:border-amber-400 focus:outline-none"
                                        />
                                    </div>

                                    <div className="p-4 rounded-2xl bg-[#020712] border border-cyan-950 space-y-2">
                                        <label className="text-xs font-mono text-slate-300 block">{isVi ? 'Khối lượng riêng d (g/mL):' : 'Density d (g/mL):'}</label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={solverDensity}
                                            onChange={(e) => setSolverDensity(parseFloat(e.target.value) || 1)}
                                            className="w-full bg-[#051122] border border-cyan-800 rounded-xl px-3 py-2 text-cyan-200 font-mono text-base focus:border-amber-400 focus:outline-none"
                                        />
                                    </div>

                                    <div className="p-4 rounded-2xl bg-[#020712] border border-cyan-950 space-y-2">
                                        <label className="text-xs font-mono text-slate-300 block">{isVi ? 'Khối lượng mol M_ct (g/mol):' : 'Molar Mass M_ct (g/mol):'}</label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={solverSoluteM}
                                            onChange={(e) => setSolverSoluteM(parseFloat(e.target.value) || 1)}
                                            className="w-full bg-[#051122] border border-cyan-800 rounded-xl px-3 py-2 text-cyan-200 font-mono text-base focus:border-amber-400 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {solverSoluteM > 0 && (
                                    <div className="p-5 rounded-2xl bg-[#020914] border border-amber-500/40 space-y-3">
                                        <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">
                                            {isVi ? 'NỒNG ĐỘ MOL TƯƠNG ĐƯƠNG:' : 'EQUIVALENT MOLAR CONCENTRATION:'}
                                        </span>
                                        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
                                            <div>
                                                <span className="text-xs text-slate-400 font-mono block">C_M =</span>
                                                <span className="text-3xl font-mono font-black text-purple-300">
                                                    {((solverCPercent * 10 * solverDensity) / solverSoluteM).toFixed(2)} M
                                                </span>
                                            </div>
                                            <div className="text-xs text-slate-300">
                                                <LatexRenderer content={`$$C_M = \\frac{${solverCPercent} \\times 10 \\times ${solverDensity}}{${solverSoluteM}} = ${((solverCPercent * 10 * solverDensity) / solverSoluteM).toFixed(2)}\\text{ M}$$`} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* SOLVER 5: pH & ACID-BASE */}
                        {activeSolver === 'PH' && (
                            <div className="p-6 rounded-3xl bg-[#040e1c]/90 border border-cyan-500/40 shadow-xl space-y-6">
                                <div className="border-b border-cyan-900/60 pb-3">
                                    <h2 className="text-base font-bold font-mono text-cyan-300 uppercase">
                                        {isVi ? 'Máy Tính Độ pH & Nồng Độ Ion [H+], [OH-]' : 'pH & Hydronium/Hydroxide Ion Calculator'}
                                    </h2>
                                    <p className="text-xs text-slate-400 font-sans">
                                        {isVi ? 'Công thức: pH = -log[H+] và [H+][OH-] = 10^-14 (ở 25°C)' : 'Formula: pH = -log[H+]'}
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-[#020712] border border-cyan-950 space-y-2 max-w-md">
                                    <label className="text-xs font-mono text-slate-300 block">{isVi ? 'Nồng độ ion [H+] (mol/L):' : '[H+] Ion Concentration (mol/L):'}</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={solverHPlus}
                                        onChange={(e) => setSolverHPlus(parseFloat(e.target.value) || 0.0000001)}
                                        className="w-full bg-[#051122] border border-cyan-800 rounded-xl px-3 py-2 text-cyan-200 font-mono text-base focus:border-amber-400 focus:outline-none"
                                    />
                                </div>

                                {solverHPlus > 0 && (
                                    <div className="p-5 rounded-2xl bg-[#020914] border border-amber-500/40 space-y-3">
                                        <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">
                                            {isVi ? 'CHỈ SỐ ĐỘ pH & MÔI TRƯỜNG DUNG DỊCH:' : 'pH INDEX & CHEMICAL ENVIRONMENT:'}
                                        </span>
                                        {(() => {
                                            const computedPH = -Math.log10(solverHPlus);
                                            const isAcid = computedPH < 6.8;
                                            const isBase = computedPH > 7.2;
                                            const envText = isAcid ? (isVi ? 'Môi trường Axit (Chua)' : 'Acidic') : isBase ? (isVi ? 'Môi trường Kiềm / Bazơ' : 'Basic') : (isVi ? 'Môi trường Trung tính' : 'Neutral');
                                            const envColor = isAcid ? 'text-rose-400' : isBase ? 'text-blue-400' : 'text-emerald-400';

                                            return (
                                                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                                                    <div>
                                                        <span className="text-xs text-slate-400 font-mono block">pH =</span>
                                                        <span className="text-3xl font-mono font-black text-amber-300">
                                                            {computedPH.toFixed(2)}
                                                        </span>
                                                        <span className={`block font-mono text-xs font-bold mt-1 ${envColor}`}>
                                                            {envText}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-slate-300">
                                                        <LatexRenderer content={`$$\\text{pH} = -\\log(${solverHPlus}) = ${computedPH.toFixed(2)}$$`} />
                                                        <LatexRenderer content={`$$\\text{pOH} = 14 - \\text{pH} = ${(14 - computedPH).toFixed(2)}$$`} />
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}

                                {/* Quick Launcher for Analytical Titration Station */}
                                <div className="mt-4 pt-4 border-t border-cyan-900/40 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">📈</span>
                                        <span className="text-xs font-mono text-cyan-300">
                                            {isVi ? 'Muốn mô phỏng nhỏ giọt buret và quan sát đường cong chuẩn độ?' : 'Want to simulate buret drop titration and observe pH curve?'}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            audioManager.playClick();
                                            setIsTitrationStationOpen(true);
                                        }}
                                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono font-bold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer shadow-lg active:scale-95"
                                    >
                                        {isVi ? 'MỞ TRẠM CHUẨN ĐỘ BURET ➔' : 'OPEN BURET TITRATION ➔'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* SOLVER 6: AUTO REDOX & STOICHIOMETRY BALANCER */}
                        {activeSolver === 'REDOX_BALANCER' && (
                            <div className="p-6 rounded-3xl bg-[#040e1c]/90 border border-cyan-500/40 shadow-xl space-y-6">
                                <div className="border-b border-cyan-900/60 pb-3 flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                                            <h2 className="text-base font-bold font-mono text-cyan-300 uppercase">
                                                {isVi ? 'Cân Bằng Phản Ứng Oxi Hóa - Khử & Tính Toán Lượng Chất' : 'Auto Redox & Stoichiometry Balancer'}
                                            </h2>
                                        </div>
                                        <p className="text-xs text-slate-400 font-sans mt-0.5">
                                            {isVi
                                                ? 'Giải hệ ma trận nghiệm Gauss tự động, hiển thị quá trình bảo toàn e (chất khử, chất oxi hóa) và bảng tính số mol, khối lượng, thể tích khí (24,79 L/mol).'
                                                : 'Solves exact rational nullspace matrix, details electron transfer steps, and bridges mass, moles, and gas volume (24.79 L/mol).'}
                                        </p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700 text-cyan-300 font-mono text-[10px] font-bold">
                                        GDPT 2018 • SLC 24.79 L/mol
                                    </span>
                                </div>

                                {/* Preset Equations */}
                                <div>
                                    <span className="text-xs font-mono text-slate-400 block mb-2">
                                        {isVi ? 'Phương trình kinh điển ôn thi GDPT 2018 (Nhấn để nạp nhanh):' : 'Curriculum Redox Presets (Click to load):'}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {PRESET_EQUATIONS.map(item => (
                                            <button
                                                key={item.label}
                                                type="button"
                                                onClick={() => {
                                                    audioManager.playClick();
                                                    setEquationInput(item.equation);
                                                    const res = balanceChemicalEquation(item.equation);
                                                    setBalancedResult(res);
                                                    if (res.reactants.length > 0) {
                                                        setSelectedStoichSubstance(res.reactants[0].formula);
                                                    }
                                                }}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                                                    equationInput === item.equation
                                                        ? 'bg-amber-500 text-black shadow-md'
                                                        : 'bg-[#061528] text-cyan-300 border border-cyan-900 hover:border-cyan-400'
                                                }`}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Equation Input Field */}
                                <div className="p-4 rounded-2xl bg-[#020712] border border-cyan-950 space-y-3">
                                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                                        <div className="flex-1">
                                            <label className="text-xs font-mono text-slate-300 block mb-1">
                                                {isVi ? 'Gõ phương trình phản ứng hóa học (Dùng -> hoặc =):' : 'Enter Chemical Equation (Use -> or =):'}
                                            </label>
                                            <input
                                                type="text"
                                                value={equationInput}
                                                onChange={(e) => setEquationInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        const res = balanceChemicalEquation(equationInput);
                                                        setBalancedResult(res);
                                                        if (res.reactants.length > 0) {
                                                            setSelectedStoichSubstance(res.reactants[0].formula);
                                                        }
                                                    }
                                                }}
                                                placeholder="e.g. Fe3O4 + HNO3 -> Fe(NO3)3 + NO + H2O"
                                                className="w-full bg-[#051122] border border-cyan-800 rounded-xl px-4 py-2.5 text-cyan-200 font-mono text-base focus:border-amber-400 focus:outline-none"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                audioManager.playClick();
                                                const res = balanceChemicalEquation(equationInput);
                                                setBalancedResult(res);
                                                if (res.reactants.length > 0) {
                                                    setSelectedStoichSubstance(res.reactants[0].formula);
                                                }
                                            }}
                                            className="px-5 py-2.5 self-end bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer active:scale-95 shrink-0"
                                        >
                                            {isVi ? 'CÂN BẰNG PHẢN ỨNG ➔' : 'BALANCE REACTION ➔'}
                                        </button>
                                    </div>

                                    {balancedResult.error && (
                                        <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 font-mono text-xs">
                                            ⚠️ {balancedResult.error}
                                        </div>
                                    )}
                                </div>

                                {/* Balanced Equation Display */}
                                {!balancedResult.error && balancedResult.balancedLatex && (
                                    <div className="p-5 rounded-2xl bg-[#020914] border border-cyan-500/50 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
                                                {isVi ? 'PHƯƠNG TRÌNH ĐÃ ĐƯỢC CÂN BẰNG HOÀN CHỈNH:' : 'FULLY BALANCED CHEMICAL EQUATION:'}
                                            </span>
                                            <span className="text-[10px] font-mono text-slate-400">
                                                {balancedResult.balancedText}
                                            </span>
                                        </div>

                                        <div className="p-5 rounded-xl bg-[#051428]/90 border border-cyan-800/80 flex items-center justify-center overflow-x-auto text-cyan-200 shadow-inner py-6">
                                            <LatexRenderer content={`$$${balancedResult.balancedLatex}$$`} />
                                        </div>

                                        {/* Redox Electron-Transfer Analysis Panel */}
                                        <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-900/60 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                                                    <span>⚡</span>
                                                    <span>{isVi ? 'PHÂN TÍCH QUÁ TRÌNH OXI HÓA - KHỬ & BẢO TOÀN ELECTRON:' : 'REDOX ELECTRON-TRANSFER ANALYSIS:'}</span>
                                                </span>
                                                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                                                    balancedResult.redox.isRedox
                                                        ? 'bg-amber-950 text-amber-300 border border-amber-600'
                                                        : 'bg-slate-900 text-slate-400 border border-slate-700'
                                                }`}>
                                                    {balancedResult.redox.isRedox ? (isVi ? 'PHẢN ỨNG OXI HÓA - KHỬ' : 'REDOX REACTION') : (isVi ? 'PHẢN ỨNG TRAO ĐỔI ION' : 'IONIC EXCHANGE')}
                                                </span>
                                            </div>

                                            {balancedResult.redox.isRedox && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {/* Reducing Agent / Oxidation Process */}
                                                    <div className="p-3 rounded-xl bg-[#07172c] border border-cyan-800/70 flex flex-col gap-1">
                                                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                                                            {isVi ? '1. CHẤT KHỬ (NHƯỜNG ELECTRON):' : '1. REDUCING AGENT (ELECTRON DONOR):'}
                                                        </span>
                                                        <strong className="text-cyan-200 font-mono text-sm">
                                                            {balancedResult.redox.reducingAgent || (isVi ? 'Đang phân tích' : 'Analyzing')}
                                                        </strong>
                                                        <span className="text-xs font-mono text-emerald-300 mt-1">
                                                            {balancedResult.redox.oxidationStep ? (isVi ? balancedResult.redox.oxidationStep.VN : balancedResult.redox.oxidationStep.EN) : ''}
                                                        </span>
                                                    </div>

                                                    {/* Oxidizing Agent / Reduction Process */}
                                                    <div className="p-3 rounded-xl bg-[#07172c] border border-cyan-800/70 flex flex-col gap-1">
                                                        <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">
                                                            {isVi ? '2. CHẤT OXI HÓA (NHẬN ELECTRON):' : '2. OXIDIZING AGENT (ELECTRON ACCEPTOR):'}
                                                        </span>
                                                        <strong className="text-rose-200 font-mono text-sm">
                                                            {balancedResult.redox.oxidizingAgent || (isVi ? 'Đang phân tích' : 'Analyzing')}
                                                        </strong>
                                                        <span className="text-xs font-mono text-amber-300 mt-1">
                                                            {balancedResult.redox.reductionStep ? (isVi ? balancedResult.redox.reductionStep.VN : balancedResult.redox.reductionStep.EN) : ''}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            {balancedResult.redox.notes && (
                                                <div className="text-[11px] font-sans text-slate-300 leading-relaxed bg-[#030914] p-3 rounded-lg border border-cyan-950">
                                                    <strong>💡 {isVi ? 'Phương pháp thăng bằng electron: ' : 'Electron balance method: '}</strong>
                                                    {isVi ? balancedResult.redox.notes.VN : balancedResult.redox.notes.EN}
                                                </div>
                                            )}
                                        </div>

                                        {/* Stoichiometric Mass / Mole Bridge */}
                                        <div className="p-4 rounded-xl bg-[#041124] border border-cyan-900/60 space-y-4">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <span className="text-xs font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
                                                    <span>🧮</span>
                                                    <span>{isVi ? 'BẢNG TÍNH LƯỢNG CHẤT TỈ LƯỢNG (STOICHIOMETRY CALCULATOR):' : 'STOICHIOMETRIC QUANTITY SOLVER:'}</span>
                                                </span>
                                                <span className="text-[10px] font-mono text-slate-400">
                                                    {isVi ? 'Tự động tính mol, gam & thể tích khí V ở đkc (24,79 L/mol)' : 'Auto-computes moles, grams & gas volume (24.79 L/mol)'}
                                                </span>
                                            </div>

                                            {/* Reference Participant Selector */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                                                        {isVi ? 'Chọn chất làm mốc:' : 'Reference Substance:'}
                                                    </label>
                                                    <select
                                                        value={selectedStoichSubstance}
                                                        onChange={(e) => setSelectedStoichSubstance(e.target.value)}
                                                        className="bg-[#020712] border border-cyan-800 rounded-xl px-3 py-2 text-cyan-200 font-mono text-xs focus:outline-none focus:border-cyan-400"
                                                    >
                                                        {[...balancedResult.reactants, ...balancedResult.products].map(p => (
                                                            <option key={p.formula} value={p.formula}>
                                                                {p.coefficient > 1 ? `${p.coefficient} ` : ''}{p.formula} ({p.isProduct ? (isVi ? 'Sản phẩm' : 'Product') : (isVi ? 'Chất phản ứng' : 'Reactant')})
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="flex flex-col gap-1">
                                                    <label className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                                                        {isVi ? 'Đơn vị nhập lượng chất:' : 'Input Quantity Unit:'}
                                                    </label>
                                                    <div className="flex rounded-xl bg-[#020712] p-1 border border-cyan-800">
                                                        <button
                                                            type="button"
                                                            onClick={() => setStoichInputType('MASS')}
                                                            className={`flex-1 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                                                                stoichInputType === 'MASS' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
                                                            }`}
                                                        >
                                                            {isVi ? 'Khối lượng m (g)' : 'Mass m (g)'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setStoichInputType('MOLES')}
                                                            className={`flex-1 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                                                                stoichInputType === 'MOLES' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
                                                            }`}
                                                        >
                                                            {isVi ? 'Số mol n (mol)' : 'Moles n (mol)'}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-1">
                                                    <label className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                                                        {isVi ? `Giá trị ${stoichInputType === 'MASS' ? 'm (gam)' : 'n (mol)'}:` : `Value ${stoichInputType === 'MASS' ? 'm (g)' : 'n (mol)'}:`}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        step="any"
                                                        value={stoichInputValue}
                                                        onChange={(e) => setStoichInputValue(parseFloat(e.target.value) || 0)}
                                                        className="bg-[#020712] border border-cyan-800 rounded-xl px-3 py-2 text-cyan-200 font-mono text-xs focus:outline-none focus:border-amber-400"
                                                    />
                                                </div>
                                            </div>

                                            {/* Results Table */}
                                            {(() => {
                                                const rows = calculateStoichiometryTable(balancedResult, selectedStoichSubstance, stoichInputValue, stoichInputType);
                                                return (
                                                    <div className="overflow-x-auto rounded-xl border border-cyan-950">
                                                        <table className="w-full text-left font-mono text-xs">
                                                            <thead className="bg-[#030914] text-cyan-400 border-b border-cyan-900/60 uppercase text-[10px]">
                                                                <tr>
                                                                    <th className="py-2.5 px-3">{isVi ? 'Chất' : 'Substance'}</th>
                                                                    <th className="py-2.5 px-3">{isVi ? 'Hệ số tỉ lượng' : 'Stoich Coef'}</th>
                                                                    <th className="py-2.5 px-3">M (g/mol)</th>
                                                                    <th className="py-2.5 px-3 text-amber-300">{isVi ? 'Số mol n (mol)' : 'Moles n (mol)'}</th>
                                                                    <th className="py-2.5 px-3 text-emerald-300">{isVi ? 'Khối lượng m (g)' : 'Mass m (g)'}</th>
                                                                    <th className="py-2.5 px-3 text-cyan-300">{isVi ? 'Thể tích khí V (L ở 25°C 1 bar)' : 'Gas Vol V (L @ SLC)'}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-cyan-950/60 text-slate-200">
                                                                {rows.map(row => (
                                                                    <tr 
                                                                        key={row.formula}
                                                                        className={`hover:bg-cyan-950/30 transition-colors ${
                                                                            row.formula === selectedStoichSubstance ? 'bg-cyan-950/40 font-bold' : ''
                                                                        }`}
                                                                    >
                                                                        <td className="py-2.5 px-3 flex items-center gap-1.5 font-bold">
                                                                            <span className={row.isProduct ? 'text-blue-300' : 'text-amber-300'}>
                                                                                {row.formula}
                                                                            </span>
                                                                            {row.isGas && (
                                                                                <span className="px-1.5 py-0.5 rounded bg-cyan-900/80 text-[9px] text-cyan-300 border border-cyan-700">
                                                                                    {isVi ? 'Khí' : 'Gas'}
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                        <td className="py-2.5 px-3 text-slate-300">{row.coefficient}</td>
                                                                        <td className="py-2.5 px-3 text-slate-400">{row.molarMass}</td>
                                                                        <td className="py-2.5 px-3 text-amber-300 font-bold">{row.moles}</td>
                                                                        <td className="py-2.5 px-3 text-emerald-300 font-bold">{row.mass} g</td>
                                                                        <td className="py-2.5 px-3 text-cyan-300">
                                                                            {row.gasVolume !== undefined ? `${row.gasVolume} L` : '—'}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* VIEW 3: PRACTICE QUESTION BANK FOR GRADES 8-12 */}
                {activeTab === 'QUESTIONS' && (
                    <div className="flex-1 overflow-hidden flex flex-col md:flex-row gap-6 max-w-7xl mx-auto w-full">
                        {/* Left List of Questions */}
                        <div className="w-full md:w-80 lg:w-96 flex flex-col bg-[#030a16]/90 border border-cyan-900/60 rounded-3xl p-4 shadow-xl shrink-0 overflow-hidden">
                            {/* Grade Pills */}
                            <div className="flex items-center justify-between gap-1 pb-3 mb-3 border-b border-cyan-900/40 shrink-0 overflow-x-auto">
                                {(['ALL', 8, 9, 10, 11, 12] as const).map(gr => (
                                    <button
                                        key={gr}
                                        type="button"
                                        onClick={() => { audioManager.playClick(); setSelectedGrade(gr); }}
                                        className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                                            selectedGrade === gr
                                                ? 'bg-amber-500 text-black shadow-md'
                                                : 'text-slate-400 hover:text-white bg-[#061426]'
                                        }`}
                                    >
                                        {gr === 'ALL' ? (isVi ? 'Tất cả' : 'All') : `L${gr}`}
                                    </button>
                                ))}
                            </div>

                            {/* Questions Scrollable List */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
                                {filteredQuestions.map(q => (
                                    <button
                                        key={q.id}
                                        type="button"
                                        onClick={() => { audioManager.playClick(); setActiveQuestionId(q.id); }}
                                        className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                                            activeQuestionId === q.id
                                                ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                                                : 'bg-[#020712] border-cyan-950 hover:border-cyan-800'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-900">
                                                LỚP {q.grade} • {q.code}
                                            </span>
                                            {answerFeedback[q.id] === 'CORRECT' && <span className="text-xs">✅</span>}
                                        </div>
                                        <span className="text-xs font-bold text-slate-200 line-clamp-2">
                                            {q.title[isVi ? 'VN' : 'EN']}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Detail Question Card */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#040e1c]/90 border border-cyan-800/60 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
                            <div className="space-y-4">
                                {/* Header */}
                                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-cyan-900/60">
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono font-bold text-xs">
                                            LỚP {activeQuestion.grade} • {activeQuestion.code}
                                        </span>
                                        <h2 className="text-base font-bold text-white font-mono">
                                            {activeQuestion.title[isVi ? 'VN' : 'EN']}
                                        </h2>
                                    </div>

                                    {/* Load to Lab Bench Button */}
                                    {activeQuestion.suggestedReagents && activeQuestion.suggestedReagents.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => handleLoadToWorkbench(activeQuestion.suggestedReagents)}
                                            className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/60 text-cyan-200 font-mono text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                                        >
                                            <span>🧪</span>
                                            <span>{isVi ? 'Nạp vào Bàn Lab' : 'Simulate in Lab'}</span>
                                        </button>
                                    )}
                                </div>

                                {/* Problem Statement */}
                                <div className="p-4 rounded-2xl bg-[#020712] border border-cyan-950">
                                    <p className="text-sm text-slate-100 font-sans leading-relaxed">
                                        {activeQuestion.question[isVi ? 'VN' : 'EN']}
                                    </p>

                                    {activeQuestion.equation && (
                                        <div className="mt-3 p-2.5 rounded-xl bg-[#061426] border border-cyan-900/50 font-mono text-xs text-amber-300 flex items-center gap-2">
                                            <span>⚛</span>
                                            <span className="font-bold">{activeQuestion.equation}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Given Data Badges */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-mono text-slate-400">{isVi ? 'Dữ kiện:' : 'Given:'}</span>
                                    {activeQuestion.givenData.map((d, i) => (
                                        <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-950/70 text-cyan-300 border border-cyan-800">
                                            {d.label}: <strong>{d.value}</strong>
                                        </span>
                                    ))}
                                </div>

                                {/* Student Answer Interaction */}
                                <div className="p-5 rounded-2xl bg-[#030914] border border-amber-500/30 space-y-3">
                                    <span className="text-xs font-mono text-amber-300 uppercase font-bold block">
                                        {isVi ? '👉 Nhập kết quả tính toán của em:' : '👉 Enter your calculated answer:'}
                                    </span>

                                    {/* Multiple choice options */}
                                    {activeQuestion.options && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {activeQuestion.options.map(opt => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => {
                                                        audioManager.playClick();
                                                        setUserAnswers(prev => ({ ...prev, [activeQuestion.id]: opt.id }));
                                                    }}
                                                    className={`p-3 rounded-xl font-mono text-xs font-bold transition-all border text-left cursor-pointer ${
                                                        userAnswers[activeQuestion.id] === opt.id
                                                            ? 'bg-amber-500 text-black border-amber-300 shadow-md'
                                                            : 'bg-[#061426] text-slate-300 border-cyan-950 hover:border-cyan-700'
                                                    }`}
                                                >
                                                    <span className="mr-1">{opt.id}.</span> {opt.text}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Numeric input field if supported */}
                                    {activeQuestion.numericAnswer && (
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="text"
                                                placeholder={isVi ? `Ví dụ: ${activeQuestion.numericAnswer.value} ${activeQuestion.numericAnswer.unit}` : 'Answer...'}
                                                value={userAnswers[activeQuestion.id] || ''}
                                                onChange={(e) => setUserAnswers(prev => ({ ...prev, [activeQuestion.id]: e.target.value }))}
                                                className="bg-[#051122] border border-cyan-800 rounded-xl px-4 py-2 text-cyan-100 font-mono text-sm focus:border-amber-400 focus:outline-none flex-1 max-w-xs"
                                            />
                                            {activeQuestion.numericAnswer.unit && (
                                                <span className="text-xs font-mono text-slate-400">{activeQuestion.numericAnswer.unit}</span>
                                            )}
                                        </div>
                                    )}

                                    {/* Check button & Feedback */}
                                    <div className="flex items-center gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => handleCheckAnswer(activeQuestion)}
                                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 cursor-pointer"
                                        >
                                            {isVi ? 'KIỂM TRA ĐÁP ÁN' : 'CHECK ANSWER'}
                                        </button>

                                        {answerFeedback[activeQuestion.id] === 'CORRECT' && (
                                            <span className="text-emerald-400 font-mono text-xs font-bold flex items-center gap-1 animate-bounce">
                                                🎉 {isVi ? 'Chính xác 100%! Giỏi quá!' : 'Spot on! Excellent calculation!'}
                                            </span>
                                        )}
                                        {answerFeedback[activeQuestion.id] === 'WRONG' && (
                                            <span className="text-rose-400 font-mono text-xs font-bold flex items-center gap-1">
                                                ❌ {isVi ? 'Chưa chuẩn xác rồi, hãy thử tính lại hoặc xem giải!' : 'Not quite right. Double check your math!'}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Step-by-Step Detailed Solution Accordion */}
                                <div className="space-y-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            audioManager.playClick();
                                            setShowSolutionMap(prev => ({ ...prev, [activeQuestion.id]: !prev[activeQuestion.id] }));
                                        }}
                                        className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-200 flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <span>{showSolutionMap[activeQuestion.id] ? '▼' : '▶'}</span>
                                        <span>{isVi ? 'XEM LỜI GIẢI CHI TIẾT & CÔNG THỨC ÁP DỤNG' : 'VIEW STEP-BY-STEP SOLUTION & FORMULAS'}</span>
                                    </button>

                                    <AnimatePresence>
                                        {showSolutionMap[activeQuestion.id] && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="space-y-3 pt-2"
                                            >
                                                {activeQuestion.stepByStepSolution.map(s => (
                                                    <div key={s.step} className="p-3.5 rounded-2xl bg-[#020712] border border-cyan-950 space-y-2">
                                                        <span className="text-xs font-mono text-amber-400 font-bold block">
                                                            {isVi ? `Bước ${s.step}: ` : `Step ${s.step}: `}
                                                            {s.title[isVi ? 'VN' : 'EN']}
                                                        </span>
                                                        <div className="p-2.5 rounded-xl bg-[#051122] border border-cyan-900/40 text-amber-200 text-xs flex items-center justify-center">
                                                            <LatexRenderer content={`$$${s.latexContent}$$`} />
                                                        </div>
                                                        <p className="text-[11px] text-slate-300 font-sans">
                                                            {s.explanation[isVi ? 'VN' : 'EN']}
                                                        </p>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW 4: SYMBOLS & UNITS REFERENCE TABLE */}
                {activeTab === 'SYMBOLS' && (
                    <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4 pr-1 max-w-6xl mx-auto w-full">
                        {/* Search Bar */}
                        <div className="flex items-center justify-between gap-4 shrink-0">
                            <div className="relative flex-1 max-w-md">
                                <input
                                    type="text"
                                    value={symbolSearch}
                                    onChange={(e) => setSymbolSearch(e.target.value)}
                                    placeholder={isVi ? 'Tra cứu ký hiệu (n, V, m, C%, CM, d, M...)' : 'Search symbols (n, V, m, C%, CM, d, M...)'}
                                    className="w-full bg-[#051122] border border-cyan-800/70 rounded-xl py-2 pl-9 pr-3 text-xs text-cyan-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-400 transition-colors font-mono"
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">🔍</span>
                            </div>

                            <span className="text-xs text-slate-400 font-mono">
                                {isVi ? `Bảng tra cứu ${filteredSymbols.length} ký hiệu chuẩn` : `${filteredSymbols.length} standard symbols`}
                            </span>
                        </div>

                        {/* Beautiful Responsive Table */}
                        <div className="overflow-x-auto rounded-3xl border border-cyan-900/60 bg-[#040e1c]/90 shadow-xl">
                            <table className="w-full text-left text-xs font-mono">
                                <thead className="bg-[#06162d] text-cyan-300 uppercase tracking-wider text-[11px] border-b border-cyan-900/80">
                                    <tr>
                                        <th className="py-3 px-4 w-28">{isVi ? 'Ký Hiệu' : 'Symbol'}</th>
                                        <th className="py-3 px-4 w-52">{isVi ? 'Tên Gọi' : 'Name'}</th>
                                        <th className="py-3 px-4 w-32">{isVi ? 'Đơn Vị' : 'Unit'}</th>
                                        <th className="py-3 px-4">{isVi ? 'Định Nghĩa & Ý Nghĩa Vật Lý' : 'Definition & Significance'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-cyan-950/60 text-slate-200">
                                    {filteredSymbols.map(sym => (
                                        <tr key={sym.symbol} className="hover:bg-cyan-950/30 transition-colors">
                                            <td className="py-3 px-4 font-bold text-amber-300 text-sm">
                                                <LatexRenderer content={`$$${sym.latexSymbol}$$`} />
                                            </td>
                                            <td className="py-3 px-4 font-sans font-bold text-slate-100">
                                                {sym.name[isVi ? 'VN' : 'EN']}
                                            </td>
                                            <td className="py-3 px-4 text-cyan-300 font-bold">
                                                {sym.unit}
                                            </td>
                                            <td className="py-3 px-4 font-sans text-slate-300 text-[11px] leading-relaxed">
                                                {sym.description[isVi ? 'VN' : 'EN']}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* BOTTOM STATUS FOOTER */}
            <footer className="relative z-20 px-6 py-2.5 bg-[#030914] border-t border-cyan-950 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{isVi ? 'ĐỘNG CƠ TÍNH TOÁN LƯỢNG TỬ // CHUẨN SGK GDPT 2018' : 'QUANTUM COMPUTING ENGINE // GDPT 2018 STANDARDS'}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>{isVi ? 'Phím tắt: ESC để thoát' : 'Shortcut: ESC to close'}</span>
                    <span className="text-cyan-400 font-bold">CHEMIC-AI v2.5</span>
                </div>
            </footer>

            {/* LIVE TITRATION MODAL INTEGRATION */}
            <LiveTitrationModal
                isOpen={isTitrationStationOpen}
                onClose={() => setIsTitrationStationOpen(false)}
                isVi={isVi}
            />
        </div>
    );
};

export default CalculatingMode;
