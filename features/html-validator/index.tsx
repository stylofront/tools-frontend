'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    Copy,
    Check,
    Trash2,
    ClipboardPaste,
    Search,
    Code,
    Zap,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ValidationError {
    line: number;
    message: string;
    type: 'error' | 'warning';
}

export default function HtmlValidatorContent() {
    const [html, setHtml] = useState('');
    const [copied, setCopied] = useState(false);

    const formatHtml = () => {
        if (!html) return;
        try {
            let formatted = '';
            let indent = '';
            const tab = '  ';
            html.split(/>\s*</).forEach((element) => {
                if (element.match(/^\/\w/)) {
                    indent = indent.substring(tab.length);
                }
                formatted += indent + '<' + element + '>\r\n';
                if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('input') && !element.startsWith('img') && !element.startsWith('br') && !element.startsWith('hr')) {
                    indent += tab;
                }
            });
            setHtml(formatted.substring(1, formatted.length - 3));
            toast.success("HTML formatted!");
        } catch (e) {
            toast.error("Format failed");
        }
    };

    const results = useMemo(() => {
        if (!html) return null;
        const errors: ValidationError[] = [];

        // 1. Basic Regex Checks
        const lines = html.split('\n');
        lines.forEach((line, i) => {
            if (line.toLowerCase().includes('<img') && !line.toLowerCase().includes('alt=')) {
                errors.push({ line: i + 1, message: 'Image tag missing "alt" attribute.', type: 'warning' });
            }
            if (line.toLowerCase().includes('<html') && !line.toLowerCase().includes('lang=')) {
                errors.push({ line: i + 1, message: 'HTML tag missing "lang" attribute.', type: 'warning' });
            }
        });

        // 2. Structural Check using DOMParser
        if (typeof window !== 'undefined') {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const parserErrors = doc.querySelectorAll('parsererror');
            if (parserErrors.length > 0) {
                parserErrors.forEach(err => {
                    errors.push({
                        line: 0,
                        message: 'Structural error: Possible unclosed tag or invalid hierarchy. ' + err.textContent?.split('\n')[0],
                        type: 'error'
                    });
                });
            }
        }

        // 3. Simple Tag Mismatch Count
        const openingTags = (html.match(/<[a-zA-Z0-9]+(?!([^>]*\/))> /g) || []).length;
        const closingTags = (html.match(/<\/[a-zA-Z0-9]+>/g) || []).length;
        const selfClosingTags = (html.match(/<[a-zA-Z0-9]+[^>]*\/>/g) || []).length;

        // This is very rough but helps
        // skip common void tags
        const voidTags = (html.match(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)[^>]*>/gi) || []).length;

        const balance = openingTags - closingTags;
        if (balance > 0) {
            errors.push({ line: 0, message: `Tag mismatch: Found ${balance} more opening tags than closing tags.`, type: 'error' });
        } else if (balance < 0) {
            errors.push({ line: 0, message: `Tag mismatch: Found ${Math.abs(balance)} more closing tags than opening tags.`, type: 'error' });
        }

        return errors;
    }, [html]);

    const handlePaste = useCallback(async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setHtml(clipboardText);
            toast.success("Pasted from clipboard");
        } catch (err) {
            console.error('Failed to read clipboard', err);
        }
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(html);
        setCopied(true);
        toast.success("Copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            <div className="container max-w-7xl mx-auto px-4 py-12 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2"
                    >
                        <ShieldCheck className="h-4 w-4" />
                        CODE VALIDATOR & FORMATTER
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                        HTML Validator
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg text-balance">
                        Inspect your markup for structural errors, missing attributes,
                        and accessibility issues. Format your code with one click.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Editor Section */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="bg-card border-2 border-emerald-500/10 rounded-3xl overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-emerald-500/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-emerald-500/10">
                                        <Code className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">HTML Source</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" onClick={formatHtml} className="h-9 gap-2 text-xs text-emerald-600 hover:bg-emerald-500/10">
                                        <Wand2 className="h-4 w-4" /> Format
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={handlePaste} className="h-9 gap-2 text-xs">
                                        <ClipboardPaste className="h-4 w-4" /> Paste
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setHtml('')} className="h-9 gap-2 text-xs hover:text-red-500">
                                        <Trash2 className="h-4 w-4" /> Clear
                                    </Button>
                                </div>
                            </div>

                            <textarea
                                value={html}
                                onChange={(e) => setHtml(e.target.value)}
                                placeholder="Paste your HTML code here..."
                                className="w-full h-[500px] p-8 bg-transparent resize-none outline-none text-sm font-mono leading-relaxed custom-scrollbar dark:text-emerald-50/90"
                            />

                            <div className="p-4 border-t border-border bg-muted/20 flex justify-end">
                                <Button onClick={handleCopy} disabled={!html} className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-6">
                                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                    Copy Code
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Results Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 bg-card border-2 border-border rounded-[2.5rem] shadow-xl space-y-6 min-h-[500px]">
                            <h3 className="text-xl font-bold flex items-center gap-3">
                                <Search className="h-5 w-5 text-emerald-500" />
                                Validation Report
                            </h3>

                            <AnimatePresence mode="wait">
                                {!html ? (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center py-20 text-center space-y-4"
                                    >
                                        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900">
                                            <AlertCircle className="h-10 w-10 text-muted-foreground/30" />
                                        </div>
                                        <p className="text-sm text-muted-foreground max-w-[150px]">Waiting for HTML input to analyze...</p>
                                    </motion.div>
                                ) : results?.length === 0 ? (
                                    <motion.div
                                        key="valid"
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-3xl text-center space-y-4"
                                    >
                                        <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
                                        <div>
                                            <p className="font-black text-xl text-emerald-600">Perfect!</p>
                                            <p className="text-xs text-emerald-600/70 uppercase tracking-widest mt-2 font-bold">No structural issues found</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="errors"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{results?.length} Issues Detected</span>
                                        </div>
                                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                            {results?.map((err, i) => (
                                                <div
                                                    key={i}
                                                    className={cn(
                                                        "p-4 rounded-2xl border flex gap-3 items-start transition-colors",
                                                        err.type === 'error' ? "bg-red-500/5 border-red-500/20 text-red-600" : "bg-amber-500/5 border-amber-500/20 text-amber-600"
                                                    )}
                                                >
                                                    {err.type === 'error' ? <XCircle className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-bold leading-tight">{err.message}</p>
                                                        {err.line > 0 && <p className="text-[10px] opacity-70 font-mono">Line {err.line}</p>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Tip Card */}
                        <div className="p-6 bg-emerald-600 text-white rounded-[2rem] shadow-lg shadow-emerald-500/20 space-y-3">
                            <Zap className="h-6 w-6" />
                            <h4 className="font-bold">Pro Tip</h4>
                            <p className="text-xs text-white/80 leading-relaxed font-medium">
                                Always include a `lang` attribute on your `html` tag and `alt` text on images for better accessibility.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
