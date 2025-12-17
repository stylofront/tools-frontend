'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

export default function StringTrimmerContent() {
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const operations = [
        { label: 'Trim All', fn: () => setText(text.trim()) },
        { label: 'Trim Start', fn: () => setText(text.trimStart()) },
        { label: 'Trim End', fn: () => setText(text.trimEnd()) },
        { label: 'Remove All Spaces', fn: () => setText(text.replace(/\s/g, '')) },
        { label: 'Single Spaces', fn: () => setText(text.replace(/\s+/g, ' ')) },
        { label: 'Remove Empty Lines', fn: () => setText(text.split('\n').filter(l => l.trim()).join('\n')) },
        { label: 'Remove Duplicate Lines', fn: () => setText([...new Set(text.split('\n'))].join('\n')) },
        { label: 'Sort Lines A-Z', fn: () => setText(text.split('\n').sort().join('\n')) },
        { label: 'Sort Lines Z-A', fn: () => setText(text.split('\n').sort().reverse().join('\n')) },
        { label: 'Reverse Lines', fn: () => setText(text.split('\n').reverse().join('\n')) },
        { label: 'Remove Tabs', fn: () => setText(text.replace(/\t/g, '')) },
        { label: 'Tabs to Spaces', fn: () => setText(text.replace(/\t/g, '    ')) },
    ];

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [text]);

    const handlePaste = useCallback(async () => {
        const clipboardText = await navigator.clipboard.readText();
        setText(clipboardText);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-orange-500/5">
            <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
                            String Trimmer
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Clean up your text. Trim whitespace, remove duplicates, and sort lines instantly.
                    </p>
                </header>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-lg">Your Text</h2>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={handlePaste}>Paste</Button>
                                <Button variant="outline" size="sm" onClick={handleCopy}>
                                    {copied ? '✓ Copied!' : 'Copy'}
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setText('')}>Clear</Button>
                            </div>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste text with extra whitespace, duplicate lines, etc..."
                            className="w-full h-[400px] p-4 rounded-2xl bg-card border border-border resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-mono text-sm"
                        />
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-4 p-6 rounded-2xl bg-gradient-to-br from-card via-card to-orange-500/5 border border-border shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-orange-500/10">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg">Operations</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-2">
                                {operations.map((op) => (
                                    <button
                                        key={op.label}
                                        onClick={op.fn}
                                        disabled={!text}
                                        className="px-3 py-2.5 text-sm font-medium rounded-xl bg-secondary/50 hover:bg-orange-500/20 hover:text-orange-500 border border-transparent hover:border-orange-500/30 transition-all text-left disabled:opacity-50"
                                    >
                                        {op.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
