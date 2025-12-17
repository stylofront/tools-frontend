'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

export default function TextDiffContent() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [viewMode, setViewMode] = useState<'inline' | 'split'>('split');

    const diff = useMemo(() => {
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        const maxLen = Math.max(lines1.length, lines2.length);

        const result = [];
        for (let i = 0; i < maxLen; i++) {
            const line1 = lines1[i] ?? '';
            const line2 = lines2[i] ?? '';

            if (line1 === line2) {
                result.push({ type: 'same', line1, line2, num: i + 1 });
            } else if (!lines1[i]) {
                result.push({ type: 'added', line1: '', line2, num: i + 1 });
            } else if (!lines2[i]) {
                result.push({ type: 'removed', line1, line2: '', num: i + 1 });
            } else {
                result.push({ type: 'changed', line1, line2, num: i + 1 });
            }
        }
        return result;
    }, [text1, text2]);

    const stats = useMemo(() => {
        const added = diff.filter(d => d.type === 'added').length;
        const removed = diff.filter(d => d.type === 'removed').length;
        const changed = diff.filter(d => d.type === 'changed').length;
        return { added, removed, changed };
    }, [diff]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-rose-500/5">
            <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-6">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-red-500 to-orange-500">
                            Text Diff
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Compare two texts and find differences instantly.
                    </p>
                </header>

                {/* Stats */}
                <div className="flex justify-center gap-4">
                    <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 font-bold">
                        +{stats.added} Added
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 font-bold">
                        -{stats.removed} Removed
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-bold">
                        ~{stats.changed} Changed
                    </div>
                </div>

                {/* Inputs */}
                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="font-semibold">Original Text</label>
                        <textarea
                            value={text1}
                            onChange={(e) => setText1(e.target.value)}
                            placeholder="Paste original text here..."
                            className="w-full h-48 p-4 rounded-xl bg-card border border-border resize-none focus:outline-none focus:ring-2 focus:ring-rose-500/50 font-mono text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="font-semibold">Modified Text</label>
                        <textarea
                            value={text2}
                            onChange={(e) => setText2(e.target.value)}
                            placeholder="Paste modified text here..."
                            className="w-full h-48 p-4 rounded-xl bg-card border border-border resize-none focus:outline-none focus:ring-2 focus:ring-rose-500/50 font-mono text-sm"
                        />
                    </div>
                </div>

                {/* Diff Output */}
                {(text1 || text2) && (
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Differences</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode('split')}
                                    className={`px-3 py-1 rounded-lg text-sm ${viewMode === 'split' ? 'bg-rose-500 text-white' : 'bg-secondary'}`}
                                >
                                    Split
                                </button>
                                <button
                                    onClick={() => setViewMode('inline')}
                                    className={`px-3 py-1 rounded-lg text-sm ${viewMode === 'inline' ? 'bg-rose-500 text-white' : 'bg-secondary'}`}
                                >
                                    Inline
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl border border-border overflow-hidden bg-card">
                            {viewMode === 'split' ? (
                                <div className="grid grid-cols-2 divide-x divide-border">
                                    <div className="p-2 space-y-0.5">
                                        {diff.map((d, i) => (
                                            <div
                                                key={i}
                                                className={`px-2 py-0.5 font-mono text-xs ${d.type === 'removed' || d.type === 'changed' ? 'bg-red-500/20 text-red-400' : ''
                                                    }`}
                                            >
                                                <span className="text-muted-foreground mr-2">{d.num}</span>
                                                {d.line1}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-2 space-y-0.5">
                                        {diff.map((d, i) => (
                                            <div
                                                key={i}
                                                className={`px-2 py-0.5 font-mono text-xs ${d.type === 'added' || d.type === 'changed' ? 'bg-green-500/20 text-green-400' : ''
                                                    }`}
                                            >
                                                <span className="text-muted-foreground mr-2">{d.num}</span>
                                                {d.line2}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="p-2 space-y-0.5">
                                    {diff.map((d, i) => (
                                        <div key={i}>
                                            {d.type === 'removed' || d.type === 'changed' ? (
                                                <div className="px-2 py-0.5 font-mono text-xs bg-red-500/20 text-red-400">
                                                    - {d.line1}
                                                </div>
                                            ) : null}
                                            {d.type === 'added' || d.type === 'changed' ? (
                                                <div className="px-2 py-0.5 font-mono text-xs bg-green-500/20 text-green-400">
                                                    + {d.line2}
                                                </div>
                                            ) : null}
                                            {d.type === 'same' && (
                                                <div className="px-2 py-0.5 font-mono text-xs text-muted-foreground">
                                                    &nbsp; {d.line1}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
