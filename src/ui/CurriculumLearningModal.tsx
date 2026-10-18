import React, { useState, useMemo, useEffect } from 'react';
import { useSimulationStore } from '../engine/store';
import { VIETNAM_CURRICULUM_DATA, CurriculumLesson, TEXTBOOK_CATALOG, GradeTextbookInfo } from '../data/VietnamCurriculumData';
import { GRADE_12_MASTER_CURRICULUM, MasterCurriculumLesson } from '../data/Grade12MasterCurriculum';
import { audioManager } from '../engine/AudioManager';
import { CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';
import { LatexRenderer } from './LatexRenderer';
import { getLessonEnhancement } from '../data/curriculumEnhancements';
import { t } from '../i18n/uiTranslations';

const GRADE_12_MASTER_MAP: Record<string, string> = {
    'hh12_b1': 'hh12_ester_lipid',
    'hh12_ester_lipid': 'hh12_ester_lipid',
    'hh12_b2': 'hh12_soap_detergent',
    'hh12_soap_detergent': 'hh12_soap_detergent',
    'hh12_b4': 'hh12_carbohydrate_glucose_fructose',
    'hh12_carbohydrate_glucose_fructose': 'hh12_carbohydrate_glucose_fructose',
    'hh12_b6': 'hh12_disaccharide_polysaccharide',
    'hh12_disaccharide_polysaccharide': 'hh12_disaccharide_polysaccharide',
    'hh12_b8': 'hh12_nitrogen_compounds',
    'hh12_b9': 'hh12_nitrogen_compounds',
    'hh12_b10': 'hh12_nitrogen_compounds',
    'hh12_nitrogen_compounds': 'hh12_nitrogen_compounds',
    'hh12_b15': 'hh12_electrochemistry',
    'hh12_b16': 'hh12_electrochemistry',
    'hh12_electrochemistry': 'hh12_electrochemistry'
};

interface CurriculumLearningModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CurriculumLearningModal: React.FC<CurriculumLearningModalProps> = ({ isOpen, onClose }) => {
    const language = useSimulationStore(state => state.language);
    const isVi = language === 'VN' || language === 'vi';

    const [selectedGrade, setSelectedGrade] = useState<number>(12);
    const [viewMode, setViewMode] = useState<'LESSON' | 'PDF'>('LESSON');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeLessonId, setActiveLessonId] = useState<string>('hh12_b1');
    const [showWorkedSolution, setShowWorkedSolution] = useState<boolean>(true);
    const [copied, setCopied] = useState<boolean>(false);

    // Quiz state: map questionId -> selectedOptionIndex
    const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

    const getChapterText = (ch: any): string => {
        if (!ch) return '';
        if (typeof ch === 'object') {
            return isVi ? (ch.VN || ch.vn || '') : (ch.EN || ch.en || ch.VN || '');
        }
        return String(ch);
    };

    // Filter lessons based on grade and search query across ALL 179 curriculum lessons
    const filteredLessons = useMemo(() => {
        return VIETNAM_CURRICULUM_DATA.filter(l => {
            if (l.grade !== selectedGrade) return false;
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            const title = ((l.title as any)[language] || (isVi ? l.title.VN : l.title.EN) || l.title.VN).toLowerCase();
            const summary = ((l.summary as any)[language] || (isVi ? l.summary.VN : l.summary.EN) || l.summary.VN).toLowerCase();
            const code = l.code.toLowerCase();
            const chapter = getChapterText(l.chapterTitle).toLowerCase();
            return title.includes(q) || summary.includes(q) || code.includes(q) || chapter.includes(q);
        });
    }, [selectedGrade, searchQuery, language, isVi]);

    // Active master lesson for Grade 12 (if current lesson maps to a deep YouTube masterclass)
    const activeMasterLesson = useMemo(() => {
        if (selectedGrade !== 12) return null;
        const masterId = GRADE_12_MASTER_MAP[activeLessonId];
        if (!masterId) return null;
        return GRADE_12_MASTER_CURRICULUM.find(l => l.id === masterId) || null;
    }, [selectedGrade, activeLessonId]);

    // Active curriculum lesson for all grades (including all 30 Grade 12 lessons)
    const activeLesson = useMemo(() => {
        return (VIETNAM_CURRICULUM_DATA.find(l => l.id === activeLessonId) || filteredLessons[0] || VIETNAM_CURRICULUM_DATA[0]) as CurriculumLesson;
    }, [activeLessonId, filteredLessons]);

    // When switching grade or searching, auto select first match if active not present
    useEffect(() => {
        if (filteredLessons.length > 0) {
            const exists = filteredLessons.some(l => l.id === activeLessonId);
            if (!exists) {
                setActiveLessonId(filteredLessons[0].id);
                setQuizAnswers({});
            }
        }
    }, [selectedGrade, filteredLessons, activeLessonId]);

    // Retrieve rich enhancement data when not displaying masterclass
    const enhancement = useMemo(() => {
        if (activeMasterLesson || !activeLesson) return null;
        const titleStr = isVi ? activeLesson.title.VN : (activeLesson.title.EN || activeLesson.title.VN);
        return getLessonEnhancement(activeLesson.id, titleStr, activeLesson.suggestedReagents);
    }, [activeMasterLesson, activeLesson, isVi]);

    const currentTextbook: GradeTextbookInfo = TEXTBOOK_CATALOG[selectedGrade] || TEXTBOOK_CATALOG[12];

    if (!isOpen) return null;

    const handleCopyLesson = () => {
        audioManager.playClick();
        let textToCopy = '';
        if (activeMasterLesson) {
            const lessonTitle = isVi ? activeMasterLesson.title.VN : (activeMasterLesson.title.EN || activeMasterLesson.title.VN);
            const lessonSummary = isVi ? activeMasterLesson.summary.VN : (activeMasterLesson.summary.EN || activeMasterLesson.summary.VN);
            textToCopy = `[${activeMasterLesson.code}] ${lessonTitle}\n\n` +
                `${isVi ? 'TỔNG QUAN:' : 'SUMMARY:'}\n${lessonSummary}\n\n` +
                `${isVi ? '1. DẪN NHẬP THỰC TẾ:' : '1. REAL-WORLD HOOK:'}\n${activeMasterLesson.hook.content[isVi ? 'VN' : 'EN']}\n\n` +
                `${isVi ? '2. QUY TẮC CẤU TẠO & DANH PHÁP:' : '2. STRUCTURE & NOMENCLATURE:'}\n` + activeMasterLesson.structureAndNomenclature.rules.map(r => `• ${r[isVi ? 'VN' : 'EN']}`).join('\n') + '\n\n' +
                `${isVi ? '3. PHẢN ỨNG HÓA HỌC ĐẶC TRƯNG:' : '3. SIGNATURE REACTIONS:'}\n` + activeMasterLesson.signatureReactions.reactions.map(rx => `• ${rx.equation[isVi ? 'VN' : 'EN']} (${rx.condition[isVi ? 'VN' : 'EN']}) -> ${rx.phenomenon[isVi ? 'VN' : 'EN']}`).join('\n') + '\n\n' +
                `${isVi ? '4. BẪY LÝ THUYẾT THI THPT:' : '4. EXAM TRAPS:'}\n` + activeMasterLesson.examTraps.traps.map(tr => `• ${tr.trapName[isVi ? 'VN' : 'EN']}: ${tr.explanation[isVi ? 'VN' : 'EN']}`).join('\n') + '\n\n' +
                `${isVi ? '5. BÀI TẬP ĐỊNH LƯỢNG:' : '5. WORKED PROBLEM:'}\n${activeMasterLesson.workedProblem.statement[isVi ? 'VN' : 'EN']}\n${activeMasterLesson.workedProblem.finalAnswer[isVi ? 'VN' : 'EN']}`;
        } else if (activeLesson) {
            const lessonTitle = isVi ? activeLesson.title.VN : (activeLesson.title.EN || activeLesson.title.VN);
            const lessonSummary = isVi ? activeLesson.summary.VN : (activeLesson.summary.EN || activeLesson.summary.VN);
            textToCopy = `[${activeLesson.code}] ${lessonTitle}\n\n` +
                `${isVi ? 'TÓM TẮT:' : 'SUMMARY:'}\n${lessonSummary}\n\n` +
                (activeLesson.sections ? activeLesson.sections.map(s => {
                    const h = isVi ? s.heading.VN : (s.heading.EN || s.heading.VN);
                    const pts = s.points.map(p => `• ${isVi ? p.VN : (p.EN || p.VN)}`).join('\n');
                    return `--- ${h} ---\n${pts}`;
                }).join('\n\n') : '') +
                `\n\n${isVi ? 'CÔNG THỨC:' : 'KEY FORMULAS:'}\n` + (activeLesson.keyFormulas ? activeLesson.keyFormulas.map(kf => typeof kf === 'object' ? (isVi ? kf.VN : (kf.EN || kf.VN)) : kf).join('\n') : '') +
                `\n\n${isVi ? 'PHƯƠNG TRÌNH:' : 'EQUATIONS:'}\n` + (activeLesson.equations ? activeLesson.equations.map(eq => typeof eq === 'object' ? (isVi ? eq.VN : (eq.EN || eq.VN)) : eq).join('\n') : '');
        }

        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleRunInLab = (reagentsToLoad?: { id: string; dose: number }[], targetTemp?: number) => {
        audioManager.playClick();
        const state = useSimulationStore.getState();

        // 1. Reset lab bench and spawn a fresh beaker
        state.flushAll();
        state.spawnContainer('beaker');

        // 2. Dispense suggested chemicals and set temperature
        setTimeout(() => {
            const currentContainers = useSimulationStore.getState().containers;
            const targetId = currentContainers.length > 0 ? currentContainers[0].id : 0;

            if (reagentsToLoad && reagentsToLoad.length > 0) {
                reagentsToLoad.forEach(item => {
                    if (CHEMICAL_REGISTRY[item.id]) {
                        useSimulationStore.getState().addReagentToContainer(targetId, item.id, item.dose);
                    }
                });
            } else if (activeMasterLesson) {
                activeMasterLesson.labPreset.reagents.forEach(item => {
                    if (CHEMICAL_REGISTRY[item.id]) {
                        useSimulationStore.getState().addReagentToContainer(targetId, item.id, item.dose);
                    }
                });
            } else if (activeLesson) {
                const validReagents = (activeLesson.suggestedReagents || []).filter(rId => CHEMICAL_REGISTRY[rId]);
                const dose = validReagents.length > 0 ? Math.min(30, Math.floor(60 / validReagents.length)) : 20;
                validReagents.forEach((chemId) => {
                    useSimulationStore.getState().addReagentToContainer(targetId, chemId, dose);
                });
            }

            const effectiveTemp = targetTemp !== undefined 
                ? targetTemp 
                : (activeMasterLesson ? activeMasterLesson.labPreset.temperature : undefined);
            if (effectiveTemp !== undefined) {
                useSimulationStore.getState().setEnvTemperature(effectiveTemp);
            }

            // 3. Switch to lab workbench and close modal
            useSimulationStore.getState().setActiveTab('lab');
            useSimulationStore.getState().setAppState('WORKBENCH');
            onClose();
        }, 120);
    };

    return (
        <div className="fixed inset-0 z-[200] bg-[#020712] text-slate-100 flex flex-col pointer-events-auto select-text overflow-hidden animate-in fade-in duration-200">
            
            {/* Top Navigation Bar: 3-Zone Segmented Ribbon */}
            <div className="h-16 border-b border-cyan-900/60 bg-[#040e1c]/95 backdrop-blur-xl px-4 md:px-8 flex items-center justify-between shrink-0 shadow-lg z-20">
                {/* Brand & Curriculum Title */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        <span className="text-xl">📚</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                            <span className="text-cyan-400 font-mono text-[10px] font-black tracking-[0.2em] uppercase">
                                {t('academySubtitle', language)}
                            </span>
                        </div>
                        <h1 className="text-sm md:text-base font-black text-white tracking-wide uppercase">
                            {t('gradeLabel', language)} {selectedGrade} {t('gradeCurriculum', language)}
                        </h1>
                    </div>
                </div>

                {/* Grade Switcher Tabs */}
                <div className="hidden lg:flex items-center gap-1.5 p-1 bg-[#020712]/90 border border-cyan-950 rounded-2xl">
                    {[8, 9, 10, 11, 12].map(gradeNum => (
                        <button
                            key={gradeNum}
                            type="button"
                            onClick={() => { audioManager.playClick(); setSelectedGrade(gradeNum); }}
                            className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                                selectedGrade === gradeNum
                                    ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                                    : 'text-slate-400 hover:text-white hover:bg-cyan-950/40'
                            }`}
                        >
                            {t('gradeLabel', language)} {gradeNum}
                        </button>
                    ))}
                </div>

                {/* Right Action Tools */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Open Calculating Board / Formulas Button */}
                    <button
                        type="button"
                        onClick={() => { audioManager.playClick(); useSimulationStore.getState().setCalculatingMode(true); }}
                        title={isVi ? 'Mở Bảng Công Thức & Máy Tính Hóa Học' : 'Open Formula Board & Calculator'}
                        className="px-3 py-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-600/70 rounded-xl text-amber-300 hover:text-white font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                        <span>🧮</span>
                        <span className="hidden sm:inline">{isVi ? 'BẢNG CÔNG THỨC' : 'FORMULAS'}</span>
                    </button>

                    {/* Copy Lesson Notes Button */}
                    <button
                        type="button"
                        onClick={handleCopyLesson}
                        title={isVi ? 'Sao chép toàn bộ nội dung bài giảng' : 'Copy entire lesson lecture'}
                        className="px-3 py-1.5 bg-[#05162a] hover:bg-cyan-950 border border-cyan-700/60 rounded-xl text-cyan-300 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                        <span>{copied ? '✅' : '📋'}</span>
                        <span className="hidden sm:inline">{copied ? t('btnCopied', language) : t('btnCopy', language)}</span>
                    </button>

                    {/* View Mode Toggle: Interactive Lessons vs PDF Textbook */}
                    <div className="flex items-center p-1 bg-[#020712]/90 border border-cyan-900/60 rounded-xl">
                        <button
                            type="button"
                            onClick={() => { audioManager.playClick(); setViewMode('LESSON'); }}
                            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                viewMode === 'LESSON'
                                    ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            <span>💡</span>
                            <span>{isVi ? 'BÀI GIẢNG' : 'LESSON'}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => { audioManager.playClick(); setViewMode('PDF'); }}
                            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                viewMode === 'PDF'
                                    ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            <span>📖</span>
                            <span>{isVi ? 'SGK PDF' : 'PDF BOOK'}</span>
                        </button>
                    </div>

                    {/* Exit Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3.5 py-1.5 bg-[#061426] hover:bg-rose-950/80 border border-slate-700 hover:border-rose-500 rounded-xl text-slate-300 hover:text-rose-300 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                    >
                        <span>✕</span>
                        <span className="hidden sm:inline">{t('btnExit', language)}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Grade Switcher */}
            <div className="flex lg:hidden items-center justify-around py-2 px-4 bg-[#030914] border-b border-cyan-950 shrink-0">
                {[8, 9, 10, 11, 12].map(gradeNum => (
                    <button
                        key={gradeNum}
                        type="button"
                        onClick={() => { audioManager.playClick(); setSelectedGrade(gradeNum); }}
                        className={`px-3 py-1 rounded-lg font-mono text-xs font-bold ${
                            selectedGrade === gradeNum
                                ? 'bg-cyan-600 text-white'
                                : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        {t('gradeLabel', language)} {gradeNum}
                    </button>
                ))}
            </div>

            {/* Main Interactive Work Area: Full-Width 12-Column Precision Layout */}
            <div className="flex-1 flex overflow-hidden">

                {viewMode === 'LESSON' ? (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden w-full">
                        
                        {/* COLUMN 1 (col-span-3): Lesson Directory & Search Filter */}
                        <div className="md:col-span-4 lg:col-span-3 border-r border-cyan-950/80 bg-[#030914]/90 flex flex-col overflow-hidden">
                            {/* Search Box */}
                            <div className="p-3 border-b border-cyan-950/80 shrink-0">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={t('academySearch', language)}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#051120] border border-cyan-900/60 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-inner"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Lesson List */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2 select-text">
                                {filteredLessons.length === 0 ? (
                                    <div className="text-center py-12 text-xs font-mono text-slate-500 italic">
                                        {isVi ? 'Không tìm thấy bài học nào phù hợp.' : 'No matching lessons found.'}
                                    </div>
                                ) : (
                                    filteredLessons.map(lesson => {
                                        const isSelected = lesson.id === activeLessonId;
                                        const title = isVi ? lesson.title.VN : (lesson.title.EN || lesson.title.VN);
                                        const chapterShort = getChapterText(lesson.chapterTitle).split(':')[0];
                                        return (
                                            <div
                                                key={lesson.id}
                                                onClick={() => { audioManager.playClick(); setActiveLessonId(lesson.id); setQuizAnswers({}); }}
                                                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 group ${
                                                    isSelected
                                                        ? 'bg-gradient-to-r from-cyan-950/90 to-emerald-950/90 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/50'
                                                        : 'bg-[#040e1c]/60 border-cyan-950/80 hover:border-cyan-800 hover:bg-[#06182e]'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="px-2 py-0.5 rounded-md bg-[#020712] border border-cyan-900/60 text-cyan-400 font-mono text-[9px] font-bold">
                                                            {lesson.code}
                                                        </span>
                                                        {selectedGrade === 12 && GRADE_12_MASTER_MAP[lesson.id] && (
                                                            <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[8px] font-bold uppercase tracking-wider">
                                                                Masterclass
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400 font-bold truncate max-w-[110px]">
                                                        {chapterShort}
                                                    </span>
                                                </div>
                                                <h3 className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-2 leading-snug">
                                                    {title}
                                                </h3>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* COLUMN 2 (col-span-6): Deep, Rigorous Classroom Lecture View */}
                        <div className="md:col-span-8 lg:col-span-6 bg-[#020712] border-r border-cyan-950/80 overflow-y-auto custom-scrollbar p-5 md:p-7 space-y-6 select-text">
                            
                            {/* GRADE 12 MASTERCLASS LECTURE RENDERER */}
                            {activeMasterLesson ? (
                                <>
                                    {/* Header Plate */}
                                    <div className="border-b border-cyan-950/90 pb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2.5 py-0.5 rounded-lg bg-cyan-950/90 border border-cyan-700/60 text-cyan-300 font-mono text-[10px] font-black uppercase">
                                                {activeMasterLesson.chapterTitle[isVi ? 'VN' : 'EN']}
                                            </span>
                                            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950/90 border border-emerald-700/60 text-emerald-300 font-mono text-[10px] font-black uppercase">
                                                {isVi ? 'LỚP 12 • GDPT 2018 MASTERCLASS' : 'GRADE 12 • GDPT 2018 MASTERCLASS'}
                                            </span>
                                        </div>
                                        <h2 className="text-lg md:text-xl font-black text-white tracking-wide mt-1">
                                            {activeMasterLesson.title[isVi ? 'VN' : 'EN']}
                                        </h2>
                                        <div className="text-xs md:text-sm text-slate-300 mt-2.5 leading-relaxed bg-[#040e1c]/80 p-3.5 rounded-xl border border-cyan-900/40">
                                            <LatexRenderer content={activeMasterLesson.summary[isVi ? 'VN' : 'EN']} language={language} />
                                        </div>
                                    </div>

                                    {/* SECTION 1: Real-World Classroom Hook & Core Concept */}
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2 pb-1.5 border-b border-cyan-950">
                                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                                            <span>{t('secHook', language)}</span>
                                        </h3>
                                        <div className="bg-gradient-to-br from-[#041021]/90 to-[#020814]/90 border border-cyan-800/40 rounded-xl p-4 shadow-sm space-y-2">
                                            <div className="font-bold text-xs text-cyan-200">
                                                {activeMasterLesson.hook.title[isVi ? 'VN' : 'EN']}
                                            </div>
                                            <div className="text-xs text-slate-300 leading-relaxed">
                                                <LatexRenderer content={activeMasterLesson.hook.content[isVi ? 'VN' : 'EN']} language={language} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* SECTION 2: Molecular Structure, Nomenclature & Bond Cleavage */}
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-mono font-bold text-sky-300 uppercase tracking-wider flex items-center gap-2 pb-1.5 border-b border-cyan-950">
                                            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                                            <span>{t('secMechanism', language)}</span>
                                        </h3>
                                        <div className="bg-gradient-to-br from-[#041021]/90 to-[#020814]/90 border border-cyan-800/40 rounded-xl p-4 shadow-sm space-y-3">
                                            <div className="font-bold text-xs text-cyan-200">
                                                {activeMasterLesson.structureAndNomenclature.heading[isVi ? 'VN' : 'EN']}
                                            </div>
                                            <div className="space-y-2">
                                                {activeMasterLesson.structureAndNomenclature.rules.map((r, rIdx) => (
                                                    <div key={rIdx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed pl-2 border-l border-cyan-800/60">
                                                        <span className="text-cyan-400 font-bold font-mono">▸</span>
                                                        <div className="flex-1">
                                                            <LatexRenderer content={r[isVi ? 'VN' : 'EN']} language={language} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pt-2 border-t border-cyan-950/80 text-xs text-slate-300 bg-[#020612]/60 p-3 rounded-lg border border-cyan-900/30">
                                                <LatexRenderer content={activeMasterLesson.structureAndNomenclature.isomersAndPhysicalProperties[isVi ? 'VN' : 'EN']} language={language} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* SECTION 3: Signature Chemical Reactions & Lab Phenomena */}
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2 pb-1.5 border-b border-cyan-950">
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                                            <span>{t('secReactions', language)}</span>
                                        </h3>
                                        <div className="space-y-3">
                                            {activeMasterLesson.signatureReactions.reactions.map((rxn, rxIdx) => (
                                                <div key={rxIdx} className="bg-gradient-to-br from-[#04151b]/90 to-[#02090e]/90 border border-emerald-700/40 rounded-xl p-3.5 space-y-2 shadow-sm">
                                                    <div className="py-1.5 px-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-xs font-bold text-emerald-200 overflow-x-auto">
                                                        <LatexRenderer content={rxn.equation[isVi ? 'VN' : 'EN']} language={language} />
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                                                        <div className="bg-[#020712] p-2 rounded-lg border border-cyan-950">
                                                            <span className="text-amber-400 font-mono font-bold mr-1">⚙ {isVi ? 'Điều kiện:' : 'Condition:'}</span>
                                                            <span className="text-slate-300">{rxn.condition[isVi ? 'VN' : 'EN']}</span>
                                                        </div>
                                                        <div className="bg-[#020712] p-2 rounded-lg border border-cyan-950">
                                                            <span className="text-teal-400 font-mono font-bold mr-1">👁 {isVi ? 'Hiện tượng:' : 'Phenomenon:'}</span>
                                                            <span className="text-slate-300">{rxn.phenomenon[isVi ? 'VN' : 'EN']}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* SECTION 4: High-Yield Exam Traps (THPT Quốc Gia & Olympiad) */}
                                    <div className="bg-gradient-to-br from-rose-950/40 via-[#18080f]/90 to-[#0c0408]/90 border border-rose-500/50 rounded-2xl p-4 shadow-[0_0_20px_rgba(244,63,94,0.15)] space-y-3">
                                        <div className="flex items-center gap-2 pb-2 border-b border-rose-900/40">
                                            <span className="text-base animate-pulse">⚠️</span>
                                            <h3 className="text-xs font-mono font-black text-rose-300 uppercase tracking-wider">
                                                {t('secExamTraps', language)}
                                            </h3>
                                        </div>
                                        <div className="space-y-2.5">
                                            {activeMasterLesson.examTraps.traps.map((trap, tIdx) => (
                                                <div key={tIdx} className="p-3 bg-[#0a0205]/80 rounded-xl border border-rose-500/30 text-xs text-rose-200 leading-relaxed space-y-1">
                                                    <div className="font-bold text-rose-300 font-mono flex items-center gap-1.5">
                                                        <span className="text-rose-400">✦</span>
                                                        <span>{trap.trapName[isVi ? 'VN' : 'EN']}</span>
                                                    </div>
                                                    <div className="pl-4 text-slate-300 text-[11px]">
                                                        <LatexRenderer content={trap.explanation[isVi ? 'VN' : 'EN']} language={language} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* SECTION 5: Step-by-Step Worked Classroom Problems */}
                                    <div className="bg-gradient-to-br from-indigo-950/40 via-[#070e24]/90 to-[#040816]/90 border border-indigo-500/40 rounded-2xl p-4 shadow-sm space-y-3">
                                        <div className="flex items-center justify-between pb-2 border-b border-indigo-900/40">
                                            <div className="flex items-center gap-2">
                                                <span className="text-base">🧮</span>
                                                <h3 className="text-xs font-mono font-black text-indigo-300 uppercase tracking-wider">
                                                    {t('secWorkedProblems', language)}
                                                </h3>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setShowWorkedSolution(!showWorkedSolution)}
                                                className="text-[11px] font-mono text-indigo-300 hover:text-white underline cursor-pointer"
                                            >
                                                {showWorkedSolution ? (isVi ? 'Thu gọn' : 'Collapse') : (isVi ? 'Mở rộng' : 'Expand')}
                                            </button>
                                        </div>

                                        <div className="text-xs text-slate-200 font-medium leading-relaxed bg-[#020510]/80 p-3 rounded-xl border border-indigo-950 space-y-1">
                                            <div className="font-bold text-indigo-200">
                                                {activeMasterLesson.workedProblem.title[isVi ? 'VN' : 'EN']}:
                                            </div>
                                            <LatexRenderer content={activeMasterLesson.workedProblem.statement[isVi ? 'VN' : 'EN']} language={language} />
                                        </div>

                                        {showWorkedSolution && (
                                            <div className="space-y-2 pt-1 animate-in fade-in">
                                                {activeMasterLesson.workedProblem.steps.map((st, idx) => (
                                                    <div key={idx} className="p-2.5 rounded-xl bg-[#030919] border border-indigo-900/40 text-xs text-slate-300 leading-relaxed">
                                                        <LatexRenderer content={st[isVi ? 'VN' : 'EN']} language={language} />
                                                    </div>
                                                ))}
                                                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center gap-2">
                                                    <span>✓</span>
                                                    <LatexRenderer content={activeMasterLesson.workedProblem.finalAnswer[isVi ? 'VN' : 'EN']} language={language} />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* SECTION 6: Reference Video Lectures from YouTube */}
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-2 pb-1.5 border-b border-cyan-950">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                                            <span>{t('secVideoLectures', language)}</span>
                                        </h3>
                                        <div className="grid grid-cols-1 gap-2.5">
                                            {activeMasterLesson.videoLectures.map((vid, vIdx) => (
                                                <a
                                                    key={vIdx}
                                                    href={vid.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3.5 rounded-xl bg-[#030d1a] hover:bg-[#05172e] border border-cyan-900/60 hover:border-cyan-400 transition-all flex items-center justify-between group shadow-sm cursor-pointer"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 text-[9px] font-mono font-bold">
                                                                ▶ YOUTUBE
                                                            </span>
                                                            <span className="text-[10px] font-mono text-slate-400">{vid.channel}</span>
                                                        </div>
                                                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                                                            {vid.title[isVi ? 'VN' : 'EN']}
                                                        </div>
                                                        <div className="text-[11px] text-slate-400">
                                                            {vid.description[isVi ? 'VN' : 'EN']}
                                                        </div>
                                                    </div>
                                                    <span className="text-cyan-400 text-lg group-hover:translate-x-1 transition-transform ml-3">
                                                        ↗
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : activeLesson ? (
                                /* GRADES 8-11 STANDARD LECTURE RENDERER */
                                <>
                                    {/* Header Plate */}
                                    <div className="border-b border-cyan-950/90 pb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2.5 py-0.5 rounded-lg bg-cyan-950/90 border border-cyan-700/60 text-cyan-300 font-mono text-[10px] font-black uppercase">
                                                {getChapterText(activeLesson.chapterTitle)}
                                            </span>
                                            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950/90 border border-emerald-700/60 text-emerald-300 font-mono text-[10px] font-black uppercase">
                                                {isVi ? `LỚP ${activeLesson.grade}` : `GRADE ${activeLesson.grade}`}
                                            </span>
                                        </div>
                                        <h2 className="text-lg md:text-xl font-black text-white tracking-wide mt-1">
                                            {isVi ? activeLesson.title.VN : (activeLesson.title.EN || activeLesson.title.VN)}
                                        </h2>
                                        <div className="text-xs md:text-sm text-slate-300 mt-2.5 leading-relaxed bg-[#040e1c]/80 p-3.5 rounded-xl border border-cyan-900/40">
                                            <LatexRenderer content={activeLesson.summary} language={language} />
                                        </div>
                                    </div>

                                    {/* SECTION 1: Core Molecular Theory & Electronic Mechanism */}
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2 pb-1.5 border-b border-cyan-950">
                                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                                            <span>{isVi ? '1. CƠ CHẾ ĐIỆN TỬ & LÝ THUYẾT TRỌNG TÂM' : '1. ELECTRONIC MECHANISM & CORE MOLECULAR THEORY'}</span>
                                        </h3>
                                        
                                        {activeLesson.sections && activeLesson.sections.length > 0 ? (
                                            <div className="space-y-3">
                                                {activeLesson.sections.map((sec, sIdx) => {
                                                    const headingText = isVi ? sec.heading.VN : (sec.heading.EN || sec.heading.VN);
                                                    return (
                                                        <div key={sIdx} className="bg-gradient-to-br from-[#041021]/90 to-[#020814]/90 border border-cyan-800/40 hover:border-cyan-500/50 rounded-xl p-3.5 shadow-sm transition-all">
                                                            <h4 className="text-[11px] md:text-xs font-mono font-bold text-cyan-300 mb-2.5 flex items-center gap-2 pb-1.5 border-b border-cyan-950/70">
                                                                <span className="text-cyan-400">▸</span>
                                                                <span className="uppercase tracking-wider">{headingText}</span>
                                                            </h4>
                                                            <div className="space-y-2">
                                                                {sec.points.map((pt, pIdx) => (
                                                                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed pl-2 border-l border-cyan-900/50">
                                                                        <span className="text-cyan-400 font-bold font-mono">•</span>
                                                                        <div className="flex-1">
                                                                            <LatexRenderer content={pt} language={language} />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                {activeLesson.theoryPoints.map((tp, idx) => (
                                                    <div key={idx} className="p-3 rounded-xl bg-[#040e1c]/80 border border-cyan-950 flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                                                        <span className="text-cyan-400 font-bold font-mono">▸</span>
                                                        <LatexRenderer content={tp} language={language} />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* SECTION 2: Characteristic Reaction Equations */}
                                    {activeLesson.equations && activeLesson.equations.length > 0 && (
                                        <div className="space-y-2.5">
                                            <h3 className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2 pb-1.5 border-b border-cyan-950">
                                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                                                <span>{isVi ? '2. PHƯƠNG TRÌNH HÓA HỌC & ĐỊNH LUẬT TỶ LỆ' : '2. CHEMICAL EQUATIONS & STOICHIOMETRIC RATIOS'}</span>
                                            </h3>
                                            <div className="space-y-2">
                                                {activeLesson.equations.map((eq, idx) => (
                                                    <div key={idx} className="py-2.5 px-3.5 bg-emerald-950/20 border border-emerald-500/40 rounded-xl text-xs font-bold text-emerald-200 shadow-sm overflow-x-auto">
                                                        <LatexRenderer content={eq} language={language} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* SECTION 3: High-Yield Exam Traps */}
                                    {enhancement && enhancement.examTraps && enhancement.examTraps.length > 0 && (
                                        <div className="bg-gradient-to-br from-rose-950/40 via-[#18080f]/90 to-[#0c0408]/90 border border-rose-500/50 rounded-2xl p-4 shadow-[0_0_20px_rgba(244,63,94,0.15)] space-y-3">
                                            <div className="flex items-center gap-2 pb-2 border-b border-rose-900/40">
                                                <span className="text-base animate-pulse">⚠️</span>
                                                <h3 className="text-xs font-mono font-black text-rose-300 uppercase tracking-wider">
                                                    {isVi ? '3. BẪY LÝ THUYẾT THI THPT QUỐC GIA & OLYMPIC' : '3. HIGH-YIELD EXAM TRAPS & PITFALLS'}
                                                </h3>
                                            </div>
                                            <div className="space-y-2.5">
                                                {enhancement.examTraps.map((trap, tIdx) => (
                                                    <div key={tIdx} className="p-3 bg-[#0a0205]/80 rounded-xl border border-rose-500/30 text-xs text-rose-200 leading-relaxed flex items-start gap-2.5">
                                                        <span className="text-rose-400 font-bold shrink-0">✦</span>
                                                        <div className="flex-1">
                                                            <LatexRenderer content={trap} language={language} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* SECTION 4: Worked Problem */}
                                    {enhancement && enhancement.workedProblem && (
                                        <div className="bg-gradient-to-br from-indigo-950/40 via-[#070e24]/90 to-[#040816]/90 border border-indigo-500/40 rounded-2xl p-4 shadow-sm space-y-3">
                                            <div className="flex items-center justify-between pb-2 border-b border-indigo-900/40">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base">🧮</span>
                                                    <h3 className="text-xs font-mono font-black text-indigo-300 uppercase tracking-wider">
                                                        {isVi ? '4. BÀI TẬP ĐỊNH LƯỢNG CÓ LỜI GIẢI CHI TIẾT' : '4. STEP-BY-STEP WORKED STOICHIOMETRY PROBLEM'}
                                                    </h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowWorkedSolution(!showWorkedSolution)}
                                                    className="text-[11px] font-mono text-indigo-300 hover:text-white underline cursor-pointer"
                                                >
                                                    {showWorkedSolution ? (isVi ? 'Thu gọn' : 'Collapse') : (isVi ? 'Mở rộng' : 'Expand')}
                                                </button>
                                            </div>

                                            <div className="text-xs text-slate-200 font-medium leading-relaxed bg-[#020510]/80 p-3 rounded-xl border border-indigo-950">
                                                <div className="font-bold text-indigo-200 mb-1">
                                                    {isVi ? enhancement.workedProblem.title.VN : (enhancement.workedProblem.title.EN || enhancement.workedProblem.title.VN)}:
                                                </div>
                                                <LatexRenderer content={enhancement.workedProblem.statement} language={language} />
                                            </div>

                                            {showWorkedSolution && (
                                                <div className="space-y-2 pt-1 animate-in fade-in">
                                                    {enhancement.workedProblem.steps.map((st, idx) => (
                                                        <div key={idx} className="p-2.5 rounded-xl bg-[#030919] border border-indigo-900/40 text-xs text-slate-300 leading-relaxed">
                                                            <LatexRenderer content={st} language={language} />
                                                        </div>
                                                    ))}
                                                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center gap-2">
                                                        <span>✓</span>
                                                        <LatexRenderer content={enhancement.workedProblem.finalAnswer} language={language} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* SECTION 5: Comparative Matrix Table */}
                                    {enhancement && enhancement.comparativeMatrix && (
                                        <div className="space-y-3">
                                            <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2 pb-1.5 border-b border-cyan-950">
                                                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                                                <span>{isVi ? '5. BẢNG MA TRẬN SO SÁNH TRỌNG TÂM' : '5. COMPARATIVE DISTINCTION MATRIX'}</span>
                                            </h3>
                                            <div className="overflow-x-auto border border-cyan-900/50 rounded-2xl bg-[#030914]/90 shadow-sm">
                                                <table className="w-full text-left text-xs">
                                                    <thead className="bg-[#05162a] border-b border-cyan-900/60 text-cyan-300 font-mono text-[11px] font-bold">
                                                        <tr>
                                                            {enhancement.comparativeMatrix.headers.map((h, idx) => (
                                                                <th key={idx} className="px-3.5 py-2.5 font-bold">
                                                                    {isVi ? h.VN : (h.EN || h.VN)}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-cyan-950/60 text-slate-300">
                                                        {enhancement.comparativeMatrix.rows.map((row, rIdx) => (
                                                            <tr key={rIdx} className="hover:bg-cyan-950/20 transition-colors">
                                                                {row.map((cell, cIdx) => (
                                                                    <td key={cIdx} className={`px-3.5 py-2.5 text-xs ${cIdx === 0 ? 'font-bold text-slate-200 font-mono' : ''}`}>
                                                                        <LatexRenderer content={cell} language={language} />
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : null}
                        </div>

                        {/* COLUMN 3 (col-span-3): Interactive Lab Bridge, Instant Concept Quiz & Reference Links */}
                        <div className="md:col-span-12 lg:col-span-3 bg-[#030914]/95 overflow-y-auto custom-scrollbar p-5 space-y-5 select-text flex flex-col justify-between">
                            <div className="space-y-5">
                                
                                {/* CARD 1: Glowing Virtual Lab Auto-Bridge */}
                                <div className="bg-gradient-to-br from-[#051a30] via-[#041224] to-[#020712] border border-cyan-500/50 rounded-2xl p-4 shadow-[0_0_25px_rgba(6,182,212,0.25)] space-y-3">
                                    <div className="flex items-center gap-2 pb-2 border-b border-cyan-900/60">
                                        <span className="text-xl animate-bounce">🧪</span>
                                        <div>
                                            <h4 className="text-xs font-mono font-black text-cyan-300 uppercase tracking-wider">
                                                {t('interactiveLabBridge', language)}
                                            </h4>
                                            <span className="text-[10px] font-mono text-slate-400">
                                                {t('autoLoadReagents', language)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Preset Reagents & Temperature for Grade 12 or Enhancement */}
                                    {activeMasterLesson ? (
                                        <div className="space-y-2">
                                            <div className="text-[11px] font-mono text-slate-300">
                                                {t('presetChemicals', language)}
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {activeMasterLesson.labPreset.reagents.map((item, idx) => {
                                                    const reg = CHEMICAL_REGISTRY[item.id];
                                                    const nameStr = reg ? ((reg.name as any)[language] || reg.name.EN) : item.id;
                                                    return (
                                                        <span key={idx} className="px-2 py-1 rounded-lg bg-[#020712] border border-cyan-700/60 text-cyan-300 font-mono text-[10px] font-bold">
                                                            {nameStr} ({item.dose}mL)
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                            <div className="text-[10px] font-mono text-amber-300 flex items-center gap-1.5 pt-1">
                                                <span>🌡️</span>
                                                <span>{t('targetTemp', language)} {activeMasterLesson.labPreset.temperature}°C</span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handleRunInLab(activeMasterLesson.labPreset.reagents, activeMasterLesson.labPreset.temperature)}
                                                className="w-full mt-2 py-3 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-mono font-bold text-xs rounded-xl tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer flex items-center justify-center gap-2 group active:scale-95"
                                            >
                                                <span className="group-hover:scale-125 transition-transform">⚡</span>
                                                <span>{activeMasterLesson.labPreset.label[isVi ? 'VN' : 'EN']}</span>
                                            </button>
                                        </div>
                                    ) : enhancement?.labPreset ? (
                                        <div className="space-y-2">
                                            <div className="text-[11px] font-mono text-slate-300">
                                                {t('presetChemicals', language)}
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {enhancement.labPreset.reagents.map((item, idx) => {
                                                    const reg = CHEMICAL_REGISTRY[item.id];
                                                    const nameStr = reg ? ((reg.name as any)[language] || reg.name.EN) : item.id;
                                                    return (
                                                        <span key={idx} className="px-2 py-1 rounded-lg bg-[#020712] border border-cyan-700/60 text-cyan-300 font-mono text-[10px] font-bold">
                                                            {nameStr} ({item.dose}mL)
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                            <div className="text-[10px] font-mono text-amber-300 flex items-center gap-1.5 pt-1">
                                                <span>🌡️</span>
                                                <span>{t('targetTemp', language)} {enhancement.labPreset.temperature}°C</span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handleRunInLab(enhancement.labPreset?.reagents, enhancement.labPreset?.temperature)}
                                                className="w-full mt-2 py-3 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-mono font-bold text-xs rounded-xl tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer flex items-center justify-center gap-2 group active:scale-95"
                                            >
                                                <span className="group-hover:scale-125 transition-transform">⚡</span>
                                                <span>{isVi ? enhancement.labPreset.label.VN : enhancement.labPreset.label.EN}</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handleRunInLab()}
                                            className="w-full py-3 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-mono font-bold text-xs rounded-xl tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            <span>🚀</span>
                                            <span>{t('loadToVirtualLab', language)}</span>
                                        </button>
                                    )}
                                </div>

                                {/* CARD 2: Interactive Concept Check Quiz */}
                                {activeMasterLesson ? (
                                    <div className="bg-gradient-to-br from-[#071324] via-[#040e1c] to-[#020712] border border-cyan-800/60 rounded-2xl p-4 shadow-sm space-y-3">
                                        <div className="flex items-center gap-2 pb-2 border-b border-cyan-900/50">
                                            <span className="text-base">🎯</span>
                                            <h4 className="text-xs font-mono font-black text-cyan-300 uppercase tracking-wider">
                                                {t('conceptQuiz', language)}
                                            </h4>
                                        </div>

                                        <div className="space-y-4">
                                            {activeMasterLesson.quiz.map((qItem, qIdx) => {
                                                const answeredIndex = quizAnswers[qItem.id];
                                                const hasAnswered = answeredIndex !== undefined;
                                                const isCorrect = answeredIndex === qItem.correctIndex;

                                                return (
                                                    <div key={qItem.id} className="p-3 bg-[#02050e] rounded-xl border border-cyan-950 space-y-2">
                                                        <div className="text-xs font-semibold text-slate-200 leading-snug">
                                                            <span className="text-cyan-400 font-mono font-bold mr-1">Q{qIdx + 1}.</span>
                                                            <LatexRenderer content={qItem.question[isVi ? 'VN' : 'EN']} language={language} />
                                                        </div>

                                                        {/* Options */}
                                                        <div className="space-y-1.5 pt-1">
                                                            {qItem.options.map((opt, oIdx) => {
                                                                const isChosen = answeredIndex === oIdx;
                                                                const isActualCorrect = oIdx === qItem.correctIndex;

                                                                let btnStyle = 'bg-[#040e1c] border-cyan-900/60 text-slate-300 hover:border-cyan-500/80 hover:text-white';
                                                                if (hasAnswered) {
                                                                    if (isActualCorrect) {
                                                                        btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]';
                                                                    } else if (isChosen && !isCorrect) {
                                                                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold shadow-[0_0_10px_rgba(244,63,94,0.3)]';
                                                                    } else {
                                                                        btnStyle = 'bg-[#02050e] border-slate-900 text-slate-500 opacity-60';
                                                                    }
                                                                }

                                                                return (
                                                                    <button
                                                                        key={oIdx}
                                                                        type="button"
                                                                        disabled={hasAnswered}
                                                                        onClick={() => {
                                                                            audioManager.playClick();
                                                                            setQuizAnswers(prev => ({ ...prev, [qItem.id]: oIdx }));
                                                                        }}
                                                                        className={`w-full text-left px-2.5 py-1.5 rounded-lg border text-[11px] leading-snug transition-all cursor-pointer ${btnStyle}`}
                                                                    >
                                                                        <LatexRenderer content={opt[isVi ? 'VN' : 'EN']} language={language} />
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>

                                                        {/* Instant Explanation Feedback */}
                                                        {hasAnswered && (
                                                            <div className={`mt-2 p-2.5 rounded-lg text-[11px] leading-relaxed border ${
                                                                isCorrect ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
                                                            }`}>
                                                                <div className="font-bold font-mono mb-0.5">
                                                                    {isCorrect ? t('correctAnswer', language) : t('incorrectAnswer', language)}
                                                                </div>
                                                                <LatexRenderer content={qItem.explanation[isVi ? 'VN' : 'EN']} language={language} />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : enhancement && enhancement.quiz && enhancement.quiz.length > 0 ? (
                                    <div className="bg-gradient-to-br from-[#071324] via-[#040e1c] to-[#020712] border border-cyan-800/60 rounded-2xl p-4 shadow-sm space-y-3">
                                        <div className="flex items-center gap-2 pb-2 border-b border-cyan-900/50">
                                            <span className="text-base">🎯</span>
                                            <h4 className="text-xs font-mono font-black text-cyan-300 uppercase tracking-wider">
                                                {t('conceptQuiz', language)}
                                            </h4>
                                        </div>

                                        <div className="space-y-4">
                                            {enhancement.quiz.map((qItem, qIdx) => {
                                                const answeredIndex = quizAnswers[qItem.id];
                                                const hasAnswered = answeredIndex !== undefined;
                                                const isCorrect = answeredIndex === qItem.correctIndex;

                                                return (
                                                    <div key={qItem.id} className="p-3 bg-[#02050e] rounded-xl border border-cyan-950 space-y-2">
                                                        <div className="text-xs font-semibold text-slate-200 leading-snug">
                                                            <span className="text-cyan-400 font-mono font-bold mr-1">Q{qIdx + 1}.</span>
                                                            <LatexRenderer content={qItem.question} language={language} />
                                                        </div>

                                                        {/* Options */}
                                                        <div className="space-y-1.5 pt-1">
                                                            {qItem.options.map((opt, oIdx) => {
                                                                const isChosen = answeredIndex === oIdx;
                                                                const isActualCorrect = oIdx === qItem.correctIndex;

                                                                let btnStyle = 'bg-[#040e1c] border-cyan-900/60 text-slate-300 hover:border-cyan-500/80 hover:text-white';
                                                                if (hasAnswered) {
                                                                    if (isActualCorrect) {
                                                                        btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]';
                                                                    } else if (isChosen && !isCorrect) {
                                                                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold shadow-[0_0_10px_rgba(244,63,94,0.3)]';
                                                                    } else {
                                                                        btnStyle = 'bg-[#02050e] border-slate-900 text-slate-500 opacity-60';
                                                                    }
                                                                }

                                                                return (
                                                                    <button
                                                                        key={oIdx}
                                                                        type="button"
                                                                        disabled={hasAnswered}
                                                                        onClick={() => {
                                                                            audioManager.playClick();
                                                                            setQuizAnswers(prev => ({ ...prev, [qItem.id]: oIdx }));
                                                                        }}
                                                                        className={`w-full text-left px-2.5 py-1.5 rounded-lg border text-[11px] leading-snug transition-all cursor-pointer ${btnStyle}`}
                                                                    >
                                                                        <LatexRenderer content={opt} language={language} />
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>

                                                        {/* Instant Explanation Feedback */}
                                                        {hasAnswered && (
                                                            <div className={`mt-2 p-2.5 rounded-lg text-[11px] leading-relaxed border ${
                                                                isCorrect ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
                                                            }`}>
                                                                <div className="font-bold font-mono mb-0.5">
                                                                    {isCorrect ? t('correctAnswer', language) : t('incorrectAnswer', language)}
                                                                </div>
                                                                <LatexRenderer content={qItem.explanation} language={language} />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : null}

                                {/* CARD 3: YouTube Official Masterclass Playlists Quick Link */}
                                <div className="bg-gradient-to-br from-[#120408] via-[#090204] to-[#020712] border border-red-800/50 rounded-2xl p-4 shadow-sm space-y-3">
                                    <div className="flex items-center gap-2 pb-2 border-b border-red-900/40">
                                        <span className="text-base text-red-500">📺</span>
                                        <h4 className="text-xs font-mono font-black text-red-300 uppercase tracking-wider">
                                            {isVi ? 'PLAYLIST BÀI GIẢNG YOUTUBE' : 'YOUTUBE LECTURE PLAYLISTS'}
                                        </h4>
                                    </div>
                                    <div className="space-y-2 text-[11px] font-mono">
                                        <a
                                            href="https://www.youtube.com/watch?v=8nfiPbueiPI&list=PLGcSL45Mzf_LtPWLcEZ484ncw3Z_nV2W9"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-xl bg-[#1e080c]/60 hover:bg-[#2e0c13] border border-red-700/50 hover:border-red-400 text-red-200 flex items-center justify-between transition-all group"
                                        >
                                            <div className="space-y-0.5">
                                                <div className="font-bold text-white group-hover:text-red-300">
                                                    Học Hóa Đến Chết
                                                </div>
                                                <div className="text-[10px] text-slate-400">
                                                    GDPT 2018 Master Series
                                                </div>
                                            </div>
                                            <span className="text-red-400 group-hover:translate-x-1 transition-transform">↗</span>
                                        </a>

                                        <a
                                            href="https://www.youtube.com/watch?v=hEuHcAhAwu8&list=PLOVaCZ_HQkvcpZRPbQngOTgm9I9vooagJ"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-xl bg-[#1e080c]/60 hover:bg-[#2e0c13] border border-red-700/50 hover:border-red-400 text-red-200 flex items-center justify-between transition-all group"
                                        >
                                            <div className="space-y-0.5">
                                                <div className="font-bold text-white group-hover:text-red-300">
                                                    VietJack THPT Official
                                                </div>
                                                <div className="text-[10px] text-slate-400">
                                                    Hóa học 12 (KNTT)
                                                </div>
                                            </div>
                                            <span className="text-red-400 group-hover:translate-x-1 transition-transform">↗</span>
                                        </a>
                                    </div>
                                </div>

                                {/* CARD 4: Quick Stoichiometric Constants & Exam Reference */}
                                <div className="bg-[#020712] border border-cyan-950 rounded-2xl p-3.5 space-y-2 text-[10px] font-mono text-slate-400">
                                    <div className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <span>📌</span>
                                        <span>{t('constantsAndStandards', language)}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div>• Vm (25°C, 1 bar) = 24.79 L/mol (GDPT 2018)</div>
                                        <div>• F = 96,500 C/mol (Faraday Constant)</div>
                                        <div>• M(Ag) = 108 g/mol | M(Cu) = 64 g/mol</div>
                                        <div>• M(C₆H₁₂O₆) = 180 g/mol | M(C₁₂H₂₂O₁₁) = 342 g/mol</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    /* In-App PDF Textbook Reader Pane */
                    <div className="flex-1 flex flex-col bg-[#01040a] overflow-hidden">
                        <div className="p-3 bg-[#030914] border-b border-cyan-950 flex items-center justify-between px-6 shrink-0">
                            <div>
                                <h3 className="text-sm font-black text-white">
                                    {isVi ? currentTextbook.title.VN : (currentTextbook.title.EN || currentTextbook.title.VN)}
                                </h3>
                                <p className="text-xs font-mono text-slate-400">
                                    {isVi ? currentTextbook.description.VN : (currentTextbook.description.EN || currentTextbook.description.VN)}
                                </p>
                            </div>

                            <a
                                href={currentTextbook.pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 rounded-xl text-cyan-200 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                            >
                                <span>📥</span>
                                <span>{t('downloadPdf', language)}</span>
                            </a>
                        </div>

                        <div className="flex-1 w-full h-full bg-[#111] overflow-hidden">
                            <iframe
                                src={currentTextbook.pdfUrl}
                                title={currentTextbook.title.VN}
                                className="w-full h-full border-0"
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
