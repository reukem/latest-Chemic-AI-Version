import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface LatexRendererProps {
    content: string | { VN: string; EN: string } | undefined;
    language?: string;
    className?: string;
    inline?: boolean;
}

/**
 * Clean and normalize mathematical and chemical strings before KaTeX parsing.
 * Auto-wraps raw subscripts (e.g. n_NaOH -> n_{\text{NaOH}}) and handles text labels.
 */
function sanitizeMath(math: string): string {
    if (!math) return '';
    let s = math.trim();

    // Strip outer $$ if present
    if (s.startsWith('$$') && s.endsWith('$$')) {
        s = s.slice(2, -2).trim();
    } else if (s.startsWith('$') && s.endsWith('$')) {
        s = s.slice(1, -1).trim();
    }

    // Fix double text nesting like \text{{\text{...}}} or \text{{\text{...}
    s = s.replace(/\\text\{\\text\{/g, '\\text{');
    if (s.startsWith('{\\text{') && !s.endsWith('}}')) {
        s = s.slice(7).trim();
        if (s.endsWith('}')) s = s.slice(0, -1).trim();
        s = '\\text{' + s + '}';
    }

    // Fix arrows inside \text{...}
    s = s.replace(/\\text\{([^}]*?)(\\longrightarrow|\\rightarrow|\\to|\\rightleftharpoons|\\xrightleftharpoons|\\xrightarrow)([^}]*?)\}/g, (_match, p1, arr, p2) => {
        return `\\text{${p1.trim()}} ${arr} \\text{${p2.trim()}}`;
    });

    // Fix raw unescaped %
    s = s.replace(/(?<!\\)%/g, '\\%');

    // Fix broken subscript patterns like C_{\text{M} = or K_{\text{C} =
    s = s.replace(/([A-Z])_\{?\\text\{([A-Za-z0-9]+)\}\s*=/g, '$1_{\\text{$2}} =');
    s = s.replace(/C_\{\\text\{M\}\s*=/g, 'C_M =');
    s = s.replace(/K_\{\\text\{C\}\s*=/g, 'K_C =');
    s = s.replace(/K_\{\\text\{C\s*=/g, 'K_C =');
    s = s.replace(/C_\{\\text\{M\s*=/g, 'C_M =');

    // Auto-fix raw chemical subscript notations
    s = s.replace(/\bn_([a-zA-Z0-9_\p{L}]+)\b/gu, (match, p1) => {
        if (p1.startsWith('\\text{') || p1.startsWith('\\mathrm{')) return match;
        if (p1.toLowerCase() === 'co2') return 'n_{\\text{CO}_2}';
        if (p1.toLowerCase() === 'h2o') return 'n_{\\text{H}_2\\text{O}}';
        if (p1.toLowerCase() === 'o2') return 'n_{\\text{O}_2}';
        return `n_{\\text{${p1}}}`;
    });

    s = s.replace(/\bm_([a-zA-Z0-9_\p{L}\s\(\)]+)\b/gu, (match, p1) => {
        if (p1.startsWith('\\text{') || p1.startsWith('\\mathrm{')) return match;
        return `m_{\\text{${p1}}}`;
    });

    // Balance unclosed braces
    let openCount = (s.match(/\{/g) || []).length;
    let closeCount = (s.match(/\}/g) || []).length;
    while (openCount > closeCount) {
        s += '}';
        closeCount++;
    }
    while (closeCount > openCount && s.endsWith('}')) {
        s = s.slice(0, -1);
        closeCount--;
    }

    return s;
}

/**
 * High-performance, robust LaTeX & Chemistry Formula Renderer.
 * Parses Markdown bold/italic, newlines, and KaTeX math blocks seamlessly.
 */
export const LatexRenderer: React.FC<LatexRendererProps> = ({ content, language = 'VN', className = '', inline = false }) => {
    const rawText = useMemo(() => {
        if (!content) return '';
        if (typeof content === 'object') {
            const isVi = language === 'VN' || language === 'vi';
            return isVi ? (content.VN || (content as any).vn || '') : (content.EN || (content as any).en || content.VN || '');
        }
        return String(content);
    }, [content, language]);

    const renderedElements = useMemo(() => {
        if (!rawText) return null;

        // Split by $$...$$ first, then by $...$
        const parts = rawText.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g);

        return parts.map((part, idx) => {
            if (!part) return null;

            if (part.startsWith('$$') && part.endsWith('$$')) {
                const math = part.slice(2, -2).trim();
                
                // If it's a plain sentence without math symbols, render as text
                if (!math.includes('\\') && !math.includes('=') && !math.includes('+') && !math.includes('^') && !math.includes('_') && math.includes(' ')) {
                    return (
                        <div key={idx} className="my-1.5 select-text text-cyan-200 font-sans text-xs md:text-sm">
                            {math}
                        </div>
                    );
                }

                const cleaned = sanitizeMath(math);
                try {
                    const html = katex.renderToString(cleaned, {
                        displayMode: true,
                        throwOnError: true,
                        trust: true,
                    });
                    return (
                        <div
                            key={idx}
                            className="my-1.5 select-text overflow-x-auto py-1 text-cyan-200"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    );
                } catch {
                    // Fallback to non-throwing KaTeX with custom error handling or plain styled text
                    try {
                        const fallbackHtml = katex.renderToString(`\\text{${cleaned.replace(/[\{\}\$\\]/g, ' ')}}`, {
                            displayMode: true,
                            throwOnError: false,
                            trust: true,
                        });
                        return (
                            <div
                                key={idx}
                                className="my-1.5 select-text overflow-x-auto py-1 text-cyan-200"
                                dangerouslySetInnerHTML={{ __html: fallbackHtml }}
                            />
                        );
                    } catch {
                        return <div key={idx} className="my-1.5 font-mono text-cyan-300 select-text">{math}</div>;
                    }
                }
            } else if (part.startsWith('$') && part.endsWith('$')) {
                const math = part.slice(1, -1).trim();

                // If it's plain text without math symbols, render as normal text
                if (!math.includes('\\') && !math.includes('=') && !math.includes('+') && !math.includes('^') && !math.includes('_') && math.includes(' ')) {
                    return (
                        <span key={idx} className="select-text px-1 text-cyan-200 font-sans">
                            {math}
                        </span>
                    );
                }

                const cleaned = sanitizeMath(math);
                try {
                    const html = katex.renderToString(cleaned, {
                        displayMode: false,
                        throwOnError: true,
                        trust: true,
                    });
                    return (
                        <span
                            key={idx}
                            className="select-text px-1 text-cyan-300 font-medium inline-block"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    );
                } catch {
                    return <span key={idx} className="font-mono text-cyan-300 select-text">{math}</span>;
                }
            }

            // Normal text with basic formatting (newlines, **bold**, and *emphasis/labels*)
            const lines = part.split('\n');
            return (
                <span key={idx} className="select-text">
                    {lines.map((line, lIdx) => {
                        // First parse **bold**
                        const boldParts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                            <React.Fragment key={lIdx}>
                                {lIdx > 0 && <br />}
                                {boldParts.map((bp, bIdx) => {
                                    if (bp.startsWith('**') && bp.endsWith('**')) {
                                        return <strong key={bIdx} className="text-cyan-300 font-bold">{bp.slice(2, -2)}</strong>;
                                    }
                                    // Parse *single asterisks* inside non-bold segments
                                    const italicParts = bp.split(/(\*[^*\n]+?\*)/g);
                                    return italicParts.map((ip, iIdx) => {
                                        if (ip.startsWith('*') && ip.endsWith('*') && ip.length > 2) {
                                            return <strong key={`${bIdx}-${iIdx}`} className="text-cyan-300 font-semibold">{ip.slice(1, -1)}</strong>;
                                        }
                                        return <span key={`${bIdx}-${iIdx}`}>{ip}</span>;
                                    });
                                })}
                            </React.Fragment>
                        );
                    })}
                </span>
            );
        });
    }, [rawText]);

    return (
        <span className={`select-text leading-relaxed ${className}`}>
            {renderedElements}
        </span>
    );
};
