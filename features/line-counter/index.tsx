'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    Copy,
    Check,
    Trash2,
    ClipboardPaste,
    Zap,
    Hash,
    AlignLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function LineCounterContent() {
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const stats = useMemo(() => {
        const lines = text ? text.split('\n') : [];
        const totalLines = lines.length;
        const emptyLines = lines.filter(line => line.trim() === '').length;
        const nonEmptyLines = totalLines - emptyLines;

        return {
            totalLines: text === '' ? 0 : totalLines,
            emptyLines: text === '' ? 0 : emptyLines,
            nonEmptyLines: text === '' ? 0 : nonEmptyLines,
            words: text.trim() ? text.trim().split(/\s+/).length : 0,
            characters: text.length
        };
    }, [text]);

    const handleCopy = async () => {
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success("Text copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setText(clipboardText);
            toast.success("Text pasted");
        } catch (err) {
            console.error('Failed to read clipboard', err);
        }
    };

    const handleClear = () => {
        setText('');
        toast.info("Cleared");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            <div className="container max-w-7xl mx-auto px-4 py-12 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-600 dark:text-blue-400 mb-2"
                    >
                        <AlignLeft className="h-4 w-4" />
                        TEXT ANALYSIS TOOL
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                        Line Counter
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Accurately count total lines, empty lines, and non-empty lines.
                        Instant analysis for your code or plain text files.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Editor Section */}
                    <div className="lg:col-span-8">
                        <div className="bg-white dark:bg-slate-900 border-2 border-border rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                                        <FileText className="h-4 w-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Editor</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={handlePaste} className="h-8 text-[10px] font-bold uppercase">
                                        <ClipboardPaste className="h-3.5 w-3.5 mr-1" /> Paste
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 text-[10px] font-bold uppercase hover:text-red-500">
                                        <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear
                                    </Button>
                                </div>
                            </div>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Paste your text or code here to count lines..."
                                className="w-full h-[500px] p-8 bg-transparent outline-none text-sm font-mono leading-relaxed resize-none custom-scrollbar"
                            />
                            <div className="absolute bottom-6 right-6">
                                <Button size="sm" onClick={handleCopy} disabled={!text} className="rounded-xl shadow-lg">
                                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                    {copied ? 'Copied' : 'Copy Text'}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 bg-white dark:bg-slate-900 border-2 border-border rounded-[2.5rem] shadow-2xl space-y-8">
                            <h3 className="text-xl font-black flex items-center gap-3">
                                <Hash className="h-5 w-5 text-blue-500" />
                                Line Statistics
                            </h3>

                            <div className="space-y-4">
                                <SummaryItem label="Total Lines" value={stats.totalLines} primary />
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                    <MiniStat label="Non-Empty" value={stats.nonEmptyLines} color="bg-green-500" />
                                    <MiniStat label="Empty" value={stats.emptyLines} color="bg-orange-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <MiniStat label="Words" value={stats.words} color="bg-purple-500" />
                                    <MiniStat label="Characters" value={stats.characters} color="bg-indigo-500" />
                                </div>
                            </div>

                            <div className="pt-6">
                                <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-start gap-4">
                                    <Zap className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Line counting is done locally in your browser for privacy.
                                        Supports all plaintext formats including code, logs, and essays.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Tip Card */}
                        <div className="p-6 bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-[2rem] shadow-2xl">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-4 text-indigo-200">Pro Tip</p>
                            <h4 className="font-bold mb-2">Code Analysis?</h4>
                            <p className="text-xs text-white/70 leading-relaxed font-inter">
                                Empty lines often represent formatting. Use the "Non-Empty" count to see the actual content volume of your source code.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SummaryItem({ label, value, primary }: { label: string; value: number; primary?: boolean }) {
    return (
        <div className={cn(
            "p-6 rounded-3xl border-2 flex flex-col items-center text-center transition-all",
            primary ? "bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-500/20" : "bg-card border-border"
        )}>
            <span className={cn("text-[10px] font-black uppercase tracking-widest mb-1", primary ? "text-blue-100" : "text-muted-foreground")}>{label}</span>
            <span className={cn("text-5xl font-black tabular-nums")}>{value.toLocaleString()}</span>
        </div>
    );
}

function MiniStat({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <div className={cn("w-1.5 h-1.5 rounded-full", color)} />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
            </div>
            <div className="text-xl font-bold tabular-nums pl-3.5">
                {value.toLocaleString()}
            </div>
        </div>
    );
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}
