'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

export default function WordCounterContent() {
    const [text, setText] = useState('');

    const stats = useMemo(() => {
        const trimmed = text.trim();

        // Characters
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, '').length;

        // Words
        const words = trimmed ? trimmed.split(/\s+/).filter(w => w.length > 0).length : 0;

        // Sentences (rough estimate)
        const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length : 0;

        // Paragraphs
        const paragraphs = trimmed ? trimmed.split(/\n\n+/).filter(p => p.trim().length > 0).length : 0;

        // Lines
        const lines = text.split('\n').length;

        // Reading time (avg 200 words/min)
        const readingTime = Math.ceil(words / 200);

        // Speaking time (avg 150 words/min)
        const speakingTime = Math.ceil(words / 150);

        return {
            characters,
            charactersNoSpaces,
            words,
            sentences,
            paragraphs,
            lines,
            readingTime,
            speakingTime
        };
    }, [text]);

    const handleClear = () => setText('');

    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setText(clipboardText);
        } catch (err) {
            console.error('Failed to read clipboard:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-teal-500/5">
            <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
                {/* Header */}
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500">
                            Word Counter
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Count words, characters, sentences, and more. Get instant reading time estimates.
                    </p>
                </header>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Text Input */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-lg">Your Text</h2>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={handlePaste}>
                                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Paste
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleClear}>
                                    Clear
                                </Button>
                            </div>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Start typing or paste your text here..."
                            className="w-full h-[400px] p-4 rounded-2xl bg-card border border-border resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-base leading-relaxed"
                        />
                    </div>

                    {/* Stats Panel */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-4 p-6 rounded-2xl bg-gradient-to-br from-card via-card to-teal-500/5 border border-border shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-teal-500/10">
                                    <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg">Statistics</h3>
                            </div>

                            {/* Main Stats */}
                            <div className="grid grid-cols-2 gap-3">
                                <StatCard label="Words" value={stats.words} color="teal" large />
                                <StatCard label="Characters" value={stats.characters} color="emerald" large />
                            </div>

                            {/* Secondary Stats */}
                            <div className="space-y-2">
                                <StatRow label="Characters (no spaces)" value={stats.charactersNoSpaces} />
                                <StatRow label="Sentences" value={stats.sentences} />
                                <StatRow label="Paragraphs" value={stats.paragraphs} />
                                <StatRow label="Lines" value={stats.lines} />
                            </div>

                            {/* Time Estimates */}
                            <div className="pt-4 border-t border-border space-y-3">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Time Estimates</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                                        <div className="text-xl font-bold text-blue-500">{stats.readingTime}</div>
                                        <div className="text-xs text-muted-foreground">min read</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                                        <div className="text-xl font-bold text-purple-500">{stats.speakingTime}</div>
                                        <div className="text-xs text-muted-foreground">min speak</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, color, large }: { label: string; value: number; color: string; large?: boolean }) {
    const colorClasses = {
        teal: 'bg-teal-500/10 border-teal-500/20 text-teal-500',
        emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
    };

    return (
        <div className={`p-4 rounded-xl border text-center ${colorClasses[color as keyof typeof colorClasses]}`}>
            <div className={`font-black ${large ? 'text-3xl' : 'text-xl'}`}>{value.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
        </div>
    );
}

function StatRow({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="font-bold">{value.toLocaleString()}</span>
        </div>
    );
}
