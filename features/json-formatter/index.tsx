'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

export default function JsonFormatterContent() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [indent, setIndent] = useState(2);

    const formatJson = useCallback(() => {
        setError('');
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, indent));
        } catch (e) {
            setError((e as Error).message);
            setOutput('');
        }
    }, [input, indent]);

    const minifyJson = useCallback(() => {
        setError('');
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
        } catch (e) {
            setError((e as Error).message);
            setOutput('');
        }
    }, [input]);

    const validateJson = useCallback(() => {
        setError('');
        try {
            JSON.parse(input);
            setError('');
            setOutput('✓ Valid JSON');
        } catch (e) {
            setError((e as Error).message);
            setOutput('');
        }
    }, [input]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-amber-500/5">
            <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500">
                            JSON Formatter
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Format, validate, and minify JSON data. Make your JSON readable.
                    </p>
                </header>

                {/* Controls */}
                <div className="flex flex-wrap justify-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary">
                        <label className="text-sm">Indent:</label>
                        <select
                            value={indent}
                            onChange={(e) => setIndent(Number(e.target.value))}
                            className="px-2 py-1 rounded bg-background border border-border"
                        >
                            <option value={2}>2 spaces</option>
                            <option value={4}>4 spaces</option>
                        </select>
                    </div>
                    <Button onClick={formatJson} className="bg-amber-500 hover:bg-amber-600">
                        Format
                    </Button>
                    <Button onClick={minifyJson} variant="outline">
                        Minify
                    </Button>
                    <Button onClick={validateJson} variant="outline">
                        Validate
                    </Button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 font-mono text-sm">
                        ❌ {error}
                    </div>
                )}

                {/* Editor Grid */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Input */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold">Input JSON</label>
                            <Button size="sm" variant="ghost" onClick={() => setInput('')}>Clear</Button>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='{"key": "value"}'
                            className="w-full h-[400px] p-4 rounded-2xl bg-card border border-border resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-mono text-sm"
                            spellCheck={false}
                        />
                    </div>

                    {/* Output */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold">Output</label>
                            {output && (
                                <Button size="sm" variant="outline" onClick={handleCopy}>
                                    {copied ? '✓ Copied!' : 'Copy'}
                                </Button>
                            )}
                        </div>
                        <div className="w-full h-[400px] p-4 rounded-2xl bg-card border border-amber-500/30 overflow-auto font-mono text-sm whitespace-pre">
                            {output || <span className="text-muted-foreground">Formatted JSON will appear here...</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
