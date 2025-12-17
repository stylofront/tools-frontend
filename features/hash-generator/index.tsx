'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

export default function HashGeneratorContent() {
    const [input, setInput] = useState('');
    const [hashes, setHashes] = useState<Record<string, string>>({});
    const [copied, setCopied] = useState<string | null>(null);

    const generateHashes = useCallback(async () => {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);

        const hashTypes = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
        const results: Record<string, string> = {};

        for (const type of hashTypes) {
            const hashBuffer = await crypto.subtle.digest(type, data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            results[type] = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        setHashes(results);
    }, [input]);

    const handleCopy = async (hash: string, type: string) => {
        await navigator.clipboard.writeText(hash);
        setCopied(type);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-emerald-500/5">
            <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500">
                            Hash Generator
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly.
                    </p>
                </header>

                {/* Input */}
                <div className="space-y-4">
                    <label className="font-semibold">Text to Hash</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text to generate hashes..."
                        className="w-full h-32 p-4 rounded-2xl bg-card border border-border resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                    <Button
                        onClick={generateHashes}
                        disabled={!input}
                        className="w-full h-12 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
                    >
                        Generate Hashes
                    </Button>
                </div>

                {/* Hash Results */}
                {Object.keys(hashes).length > 0 && (
                    <div className="space-y-4">
                        <h2 className="font-semibold">Generated Hashes</h2>
                        <div className="space-y-3">
                            {Object.entries(hashes).map(([type, hash]) => (
                                <div
                                    key={type}
                                    className="p-4 rounded-2xl bg-card border border-border hover:border-emerald-500/50 transition-colors group cursor-pointer"
                                    onClick={() => handleCopy(hash, type)}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-emerald-500">{type}</span>
                                        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                                            {copied === type ? '✓ Copied!' : 'Click to copy'}
                                        </span>
                                    </div>
                                    <code className="font-mono text-xs break-all text-muted-foreground">{hash}</code>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
