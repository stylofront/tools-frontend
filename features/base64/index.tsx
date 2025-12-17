'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

export default function Base64Content() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleConvert = useCallback(() => {
        setError('');
        try {
            if (mode === 'encode') {
                setOutput(btoa(unescape(encodeURIComponent(input))));
            } else {
                setOutput(decodeURIComponent(escape(atob(input))));
            }
        } catch (e) {
            setError('Invalid input for ' + mode + ' operation');
            setOutput('');
        }
    }, [input, mode]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSwap = () => {
        setInput(output);
        setOutput('');
        setMode(mode === 'encode' ? 'decode' : 'encode');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-lime-500/5">
            <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500">
                            Base64 Encoder
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Encode and decode Base64 strings instantly. Handles UTF-8 characters.
                    </p>
                </header>

                {/* Mode Toggle */}
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => setMode('encode')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${mode === 'encode'
                                ? 'bg-lime-500 text-white shadow-lg'
                                : 'bg-secondary hover:bg-lime-500/20'
                            }`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${mode === 'decode'
                                ? 'bg-lime-500 text-white shadow-lg'
                                : 'bg-secondary hover:bg-lime-500/20'
                            }`}
                    >
                        Decode
                    </button>
                </div>

                {/* Input */}
                <div className="space-y-3">
                    <label className="font-semibold">
                        {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
                        className="w-full h-40 p-4 rounded-2xl bg-card border border-border resize-none focus:outline-none focus:ring-2 focus:ring-lime-500/50 font-mono text-sm"
                    />
                </div>

                {/* Convert Button */}
                <div className="flex justify-center gap-4">
                    <Button
                        onClick={handleConvert}
                        disabled={!input}
                        className="px-8 h-12 rounded-xl font-bold bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600"
                    >
                        {mode === 'encode' ? 'Encode →' : 'Decode →'}
                    </Button>
                    {output && (
                        <Button variant="outline" onClick={handleSwap}>
                            ↕ Swap
                        </Button>
                    )}
                </div>

                {/* Error */}
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center">
                        {error}
                    </div>
                )}

                {/* Output */}
                {output && (
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold">Result</label>
                            <Button variant="outline" size="sm" onClick={handleCopy}>
                                {copied ? '✓ Copied!' : 'Copy'}
                            </Button>
                        </div>
                        <div className="p-4 rounded-2xl bg-card border border-lime-500/30 min-h-40">
                            <code className="font-mono text-sm whitespace-pre-wrap break-all">{output}</code>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
