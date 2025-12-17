'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

export default function RegexTesterContent() {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('g');
    const [testString, setTestString] = useState('');
    const [error, setError] = useState('');

    const result = useMemo(() => {
        setError('');
        if (!pattern || !testString) return null;

        try {
            const regex = new RegExp(pattern, flags);
            const matches = [...testString.matchAll(regex)];
            return {
                matches,
                highlightedText: testString.replace(regex, (match) => `[[MATCH]]${match}[[/MATCH]]`),
                isValid: true
            };
        } catch (e) {
            setError((e as Error).message);
            return { matches: [], highlightedText: testString, isValid: false };
        }
    }, [pattern, flags, testString]);

    const flagOptions = [
        { id: 'g', label: 'Global (g)' },
        { id: 'i', label: 'Case Insensitive (i)' },
        { id: 'm', label: 'Multiline (m)' },
    ];

    const toggleFlag = (flag: string) => {
        setFlags(prev => prev.includes(flag) ? prev.replace(flag, '') : prev + flag);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-yellow-500/5">
            <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500">
                            Regex Tester
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Test and validate regular expressions with real-time matching.
                    </p>
                </header>

                <div className="space-y-6">
                    {/* Pattern Input */}
                    <div className="p-6 rounded-2xl bg-card border border-border shadow-lg space-y-4">
                        <div className="space-y-2">
                            <label className="font-semibold">Regular Expression</label>
                            <div className="flex gap-2 items-center">
                                <span className="text-2xl text-muted-foreground">/</span>
                                <input
                                    type="text"
                                    value={pattern}
                                    onChange={(e) => setPattern(e.target.value)}
                                    placeholder="Enter regex pattern..."
                                    className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border font-mono text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                                />
                                <span className="text-2xl text-muted-foreground">/</span>
                                <span className="text-lg font-mono text-yellow-500">{flags}</span>
                            </div>
                        </div>

                        {/* Flags */}
                        <div className="flex flex-wrap gap-2">
                            {flagOptions.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => toggleFlag(f.id)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${flags.includes(f.id)
                                            ? 'bg-yellow-500 text-black'
                                            : 'bg-secondary hover:bg-yellow-500/20'
                                        }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        {error && (
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                                ❌ {error}
                            </div>
                        )}
                    </div>

                    {/* Test String */}
                    <div className="space-y-3">
                        <label className="font-semibold">Test String</label>
                        <textarea
                            value={testString}
                            onChange={(e) => setTestString(e.target.value)}
                            placeholder="Enter text to test against the pattern..."
                            className="w-full h-40 p-4 rounded-xl bg-card border border-border resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500/50 font-mono"
                        />
                    </div>

                    {/* Results */}
                    {result && result.matches.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <h3 className="font-semibold">Matches</h3>
                                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 font-bold text-sm">
                                    {result.matches.length} found
                                </span>
                            </div>

                            {/* Highlighted Text */}
                            <div className="p-4 rounded-xl bg-card border border-yellow-500/30 font-mono whitespace-pre-wrap">
                                {result.highlightedText.split('[[MATCH]]').map((part, i) => {
                                    if (part.includes('[[/MATCH]]')) {
                                        const [match, rest] = part.split('[[/MATCH]]');
                                        return (
                                            <span key={i}>
                                                <mark className="bg-yellow-500/30 text-yellow-500 px-1 rounded">{match}</mark>
                                                {rest}
                                            </span>
                                        );
                                    }
                                    return part;
                                })}
                            </div>

                            {/* Match Details */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {result.matches.map((m, i) => (
                                    <div key={i} className="p-3 rounded-xl bg-secondary/50 border border-border">
                                        <div className="text-xs text-muted-foreground mb-1">Match {i + 1}</div>
                                        <code className="text-sm font-bold">{m[0]}</code>
                                        <div className="text-xs text-muted-foreground mt-1">Index: {m.index}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
