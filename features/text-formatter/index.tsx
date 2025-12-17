'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const TRANSFORMATIONS = [
    { id: 'uppercase', label: 'UPPERCASE', fn: (s: string) => s.toUpperCase() },
    { id: 'lowercase', label: 'lowercase', fn: (s: string) => s.toLowerCase() },
    { id: 'titlecase', label: 'Title Case', fn: (s: string) => s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()) },
    { id: 'sentencecase', label: 'Sentence case', fn: (s: string) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()) },
    { id: 'camelcase', label: 'camelCase', fn: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
    { id: 'pascalcase', label: 'PascalCase', fn: (s: string) => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => w.toUpperCase()).replace(/\s+/g, '') },
    { id: 'snakecase', label: 'snake_case', fn: (s: string) => s.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') },
    { id: 'kebabcase', label: 'kebab-case', fn: (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') },
    { id: 'reverse', label: 'Reverse', fn: (s: string) => s.split('').reverse().join('') },
    { id: 'alternating', label: 'aLtErNaTiNg', fn: (s: string) => s.split('').map((c, i) => i % 2 ? c.toUpperCase() : c.toLowerCase()).join('') },
];

export default function TextFormatterContent() {
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const applyTransformation = useCallback((fn: (s: string) => string) => {
        setText(fn(text));
    }, [text]);

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [text]);

    const handlePaste = useCallback(async () => {
        const clipboardText = await navigator.clipboard.readText();
        setText(clipboardText);
    }, []);

    const handleClear = () => setText('');

    // Text utilities
    const removeExtraSpaces = () => setText(text.replace(/\s+/g, ' ').trim());
    const removeLineBreaks = () => setText(text.replace(/\n+/g, ' '));
    const removeNumbers = () => setText(text.replace(/[0-9]/g, ''));
    const removePunctuation = () => setText(text.replace(/[^\w\s]/g, ''));

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-500/5">
            <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
                {/* Header */}
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500">
                            Text Formatter
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Transform your text instantly. Convert cases, remove extras, and format with one click.
                    </p>
                </header>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Text Area */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <h2 className="font-semibold text-lg">Your Text</h2>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={handlePaste}>Paste</Button>
                                <Button variant="outline" size="sm" onClick={handleCopy}>
                                    {copied ? '✓ Copied!' : 'Copy'}
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleClear}>Clear</Button>
                            </div>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type or paste your text here to transform it..."
                            className="w-full h-[350px] p-4 rounded-2xl bg-card border border-border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-base leading-relaxed font-mono"
                        />
                        <div className="text-sm text-muted-foreground text-right">
                            {text.length} characters
                        </div>
                    </div>

                    {/* Transformations Panel */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-5 p-6 rounded-2xl bg-gradient-to-br from-card via-card to-blue-500/5 border border-border shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-blue-500/10">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg">Case Transforms</h3>
                            </div>

                            {/* Case Transformations */}
                            <div className="grid grid-cols-2 gap-2">
                                {TRANSFORMATIONS.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => applyTransformation(t.fn)}
                                        disabled={!text}
                                        className="px-3 py-2.5 text-sm font-medium rounded-xl bg-secondary/50 hover:bg-blue-500/20 hover:text-blue-500 border border-transparent hover:border-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>

                            {/* Utilities */}
                            <div className="pt-4 border-t border-border space-y-3">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Utilities</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    <button
                                        onClick={removeExtraSpaces}
                                        disabled={!text}
                                        className="px-3 py-2.5 text-sm font-medium rounded-xl bg-secondary/50 hover:bg-violet-500/20 hover:text-violet-500 transition-all text-left disabled:opacity-50"
                                    >
                                        Remove Extra Spaces
                                    </button>
                                    <button
                                        onClick={removeLineBreaks}
                                        disabled={!text}
                                        className="px-3 py-2.5 text-sm font-medium rounded-xl bg-secondary/50 hover:bg-violet-500/20 hover:text-violet-500 transition-all text-left disabled:opacity-50"
                                    >
                                        Remove Line Breaks
                                    </button>
                                    <button
                                        onClick={removeNumbers}
                                        disabled={!text}
                                        className="px-3 py-2.5 text-sm font-medium rounded-xl bg-secondary/50 hover:bg-violet-500/20 hover:text-violet-500 transition-all text-left disabled:opacity-50"
                                    >
                                        Remove Numbers
                                    </button>
                                    <button
                                        onClick={removePunctuation}
                                        disabled={!text}
                                        className="px-3 py-2.5 text-sm font-medium rounded-xl bg-secondary/50 hover:bg-violet-500/20 hover:text-violet-500 transition-all text-left disabled:opacity-50"
                                    >
                                        Remove Punctuation
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
