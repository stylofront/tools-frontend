'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

export default function UrlEncoderContent() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleConvert = useCallback(() => {
        setError('');
        try {
            if (mode === 'encode') {
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-sky-500/5">
            <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500">
                            URL Encoder
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Encode and decode URL strings. Handle special characters safely.
                    </p>
                </header>

                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => setMode('encode')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${mode === 'encode' ? 'bg-sky-500 text-white shadow-lg' : 'bg-secondary hover:bg-sky-500/20'
                            }`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${mode === 'decode' ? 'bg-sky-500 text-white shadow-lg' : 'bg-secondary hover:bg-sky-500/20'
                            }`}
                    >
                        Decode
                    </button>
                </div>

                <div className="space-y-3">
                    <label className="font-semibold">{mode === 'encode' ? 'URL to Encode' : 'URL to Decode'}</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? 'Enter URL or text with special characters...' : 'Enter encoded URL...'}
                        className="w-full h-32 p-4 rounded-2xl bg-card border border-border resize-none focus:outline-none focus:ring-2 focus:ring-sky-500/50 font-mono text-sm"
                    />
                </div>

                <div className="flex justify-center">
                    <Button
                        onClick={handleConvert}
                        disabled={!input}
                        className="px-8 h-12 rounded-xl font-bold bg-gradient-to-r from-sky-500 to-blue-500"
                    >
                        {mode === 'encode' ? 'Encode →' : 'Decode →'}
                    </Button>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center">{error}</div>
                )}

                {output && (
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold">Result</label>
                            <Button variant="outline" size="sm" onClick={handleCopy}>
                                {copied ? '✓ Copied!' : 'Copy'}
                            </Button>
                        </div>
                        <div className="p-4 rounded-2xl bg-card border border-sky-500/30">
                            <code className="font-mono text-sm whitespace-pre-wrap break-all">{output}</code>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
