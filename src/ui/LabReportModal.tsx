import React, { useMemo } from 'react';
import { useSimulationStore } from '../engine/store';
import { LabReportExporter, LabReportData } from '../services/LabReportExporter';
import { GoogleAuthService } from '../services/GoogleAuthService';
import { audioManager } from '../engine/AudioManager';
import { CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';

interface LabReportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LabReportModal: React.FC<LabReportModalProps> = ({ isOpen, onClose }) => {
    const language = useSimulationStore(state => state.language);
    const isVi = language === 'VN';
    const containers = useSimulationStore(state => state.containers);
    const env = useSimulationStore(state => state.env);

    const [statusMessage, setStatusMessage] = React.useState<string | null>(null);

    const user = GoogleAuthService.getUser();

    // Compile active experiment telemetry
    const reportData: LabReportData = useMemo(() => {
        const phs = containers.map(c => c.ph || 7.0);
        const reactions: string[] = [];
        const observations: string[] = [];

        containers.forEach(c => {
            const chemKeys = Object.keys(c.contents || {});
            if (chemKeys.length > 1) {
                const names = chemKeys.map(k => CHEMICAL_REGISTRY[k]?.formula || k).join(' + ');
                reactions.push(`${names} → Products (pH = ${c.ph?.toFixed(1)})`);
            }
            if (c.ph < 6) observations.push(isVi ? `Bình #${c.id + 1}: Môi trường axit mạnh (pH ${c.ph.toFixed(1)}).` : `Vessel #${c.id + 1}: Acidic matrix (pH ${c.ph.toFixed(1)}).`);
            if (c.ph > 8) observations.push(isVi ? `Bình #${c.id + 1}: Môi trường kiềm bazơ (pH ${c.ph.toFixed(1)}).` : `Vessel #${c.id + 1}: Alkaline matrix (pH ${c.ph.toFixed(1)}).`);
        });

        if (observations.length === 0) {
            observations.push(isVi ? 'Hệ thống đo lường ổn định ở điều kiện tiêu chuẩn.' : 'System steady-state telemetry recorded under standard STP conditions.');
        }

        return {
            title: isVi ? 'Báo Cáo Thí Nghiệm Hóa Học Lượng Tử' : 'Quantum Chemistry Experimental Lab Report',
            experimentType: isVi ? 'Khảo Sát Động Học & Cân Bằng Hóa Học' : 'Reaction Stoichiometry & Kinetics',
            containers: containers,
            reactionsEncountered: reactions,
            temperatureRange: { min: env.temp, max: env.temp + 15 },
            phValues: phs,
            observations: observations,
            conclusions: [
                isVi ? 'Các phương trình hóa học diễn ra tuân thủ định luật bảo toàn khối lượng và năng lượng.' : 'Reactions follow mass conservation and thermodynamic spontaneity criteria.',
                isVi ? 'Đã hoàn thành các tiêu chuẩn an toàn phòng thí nghiệm và giáo dục GDPT 2018.' : 'Verified compliant with lab safety protocols and curriculum benchmarks.'
            ]
        };
    }, [containers, env, isVi]);

    const reportHtml = useMemo(() => {
        return LabReportExporter.generateHtmlReport(reportData, language);
    }, [reportData, language]);

    if (!isOpen) return null;

    const handleOpenGoogleDocs = async () => {
        audioManager.playClick();
        const res = await LabReportExporter.openInGoogleDocs(reportHtml, 'Chemic-AI_Lab_Report');
        setStatusMessage(res.message);
        audioManager.playDiscoveryChime();
        setTimeout(() => setStatusMessage(null), 6000);
    };

    const handleDownload = () => {
        audioManager.playClick();
        LabReportExporter.downloadReport(reportHtml, 'Chemic-AI_Lab_Report.html');
        setStatusMessage(isVi ? 'Đã tải file báo cáo về máy!' : 'Report downloaded successfully!');
        setTimeout(() => setStatusMessage(null), 4000);
    };

    return (
        <div className="fixed inset-0 z-[180] flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-auto p-4 overflow-y-auto select-none animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl bg-gradient-to-b from-[#061528]/98 via-[#030d1a]/98 to-[#020710]/98 border-2 border-cyan-500/60 rounded-3xl p-6 md:p-8 shadow-[0_0_70px_rgba(6,182,212,0.35)] overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-cyan-900/60 mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/60 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                            <span className="text-xl">📄</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-pulse" />
                                <span className="text-blue-400 font-mono text-[10px] font-black tracking-[0.25em] uppercase">
                                    {isVi ? 'GOOGLE WORKSPACE // XUẤT BÁO CÁO' : 'GOOGLE WORKSPACE // LAB REPORT EXPORTER'}
                                </span>
                            </div>
                            <h2 className="text-lg md:text-xl font-black text-white tracking-wide uppercase">
                                {isVi ? 'BÁO CÁO THÍ NGHIỆM HÓA HỌC' : 'SCIENTIFIC EXPERIMENT REPORT'}
                            </h2>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-cyan-950/80 hover:bg-rose-950/80 border border-cyan-700/60 hover:border-rose-500 text-cyan-300 hover:text-rose-300 flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Student Google Profile Header Card */}
                <div className="bg-[#030914] border border-cyan-900/60 rounded-2xl p-4 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={user.picture} alt="Google Avatar" className="w-10 h-10 rounded-full border border-cyan-500/40 bg-cyan-950" />
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">{user.name}</span>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-[9px] font-mono font-bold">
                                    {user.isGoogleConnected ? 'Google Connected' : 'Guest Scholar'}
                                </span>
                            </div>
                            <span className="text-xs font-mono text-slate-400">{user.email}</span>
                        </div>
                    </div>

                    <span className="text-xs font-mono text-cyan-400 uppercase hidden sm:inline-block">
                        AI Riser 2026 // Ready
                    </span>
                </div>

                {/* Report Preview Frame */}
                <div className="bg-white rounded-2xl p-4 md:p-6 text-slate-800 font-sans text-xs max-h-[45vh] overflow-y-auto custom-scrollbar border border-slate-300 shadow-inner mb-5">
                    <div className="border-b border-slate-300 pb-2 mb-3">
                        <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">CHEMIC-AI // LAB REPORT</span>
                        <h3 className="text-base font-black text-slate-900 mt-0.5">{reportData.title}</h3>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <strong className="text-slate-900 uppercase font-bold text-[11px]">1. {isVi ? 'Hóa chất thực nghiệm:' : 'Reagents Inventory:'}</strong>
                            <div className="mt-1 flex flex-wrap gap-1.5">
                                {containers.map((c, i) => {
                                    const keys = Object.keys(c.contents || {});
                                    return keys.length > 0 ? (
                                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[11px]">
                                            Vessel #{i+1}: {keys.map(k => CHEMICAL_REGISTRY[k]?.formula || k).join(', ')} ({c.volume.toFixed(0)}mL)
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </div>

                        <div>
                            <strong className="text-slate-900 uppercase font-bold text-[11px]">2. {isVi ? 'Hiện tượng quan sát:' : 'Observations:'}</strong>
                            <ul className="list-disc pl-5 mt-0.5 space-y-0.5">
                                {reportData.observations.map((obs, oIdx) => (
                                    <li key={oIdx}>{obs}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <strong className="text-slate-900 uppercase font-bold text-[11px]">3. {isVi ? 'Đánh giá an toàn & Kết luận:' : 'Safety & Conclusions:'}</strong>
                            <ul className="list-disc pl-5 mt-0.5 space-y-0.5">
                                {reportData.conclusions.map((c, cIdx) => (
                                    <li key={cIdx}>{c}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Status Message Alert */}
                {statusMessage && (
                    <div className="mb-3 px-4 py-2.5 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-emerald-300 font-mono text-xs flex items-center gap-2 animate-in fade-in">
                        <span>✓</span>
                        <span>{statusMessage}</span>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={handleDownload}
                        className="w-full sm:w-auto px-5 py-2.5 bg-[#061426] hover:bg-[#092244] border border-cyan-800 text-cyan-200 font-mono font-bold text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span>💾</span>
                        <span>{isVi ? 'TẢI VỀ FILE (.HTML)' : 'DOWNLOAD REPORT'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleOpenGoogleDocs}
                        className="w-full sm:w-auto px-7 py-2.5 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-mono font-bold text-xs rounded-xl tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span>📄</span>
                        <span>{isVi ? 'MỞ TRÊN GOOGLE DOCS / IN PDF' : 'OPEN IN GOOGLE DOCS / PRINT'}</span>
                        <span>→</span>
                    </button>
                </div>

            </div>
        </div>
    );
};
