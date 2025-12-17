'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

export default function UUIDGeneratorContent() {
    const [uuids, setUuids] = useState<string[]>([]);
    const [count, setCount] = useState(5);
    const [format, setFormat] = useState<'standard' | 'uppercase' | 'nohyphens'>('standard');
    const [copied, setCopied] = useState<number | null>(null);

    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const formatUUID = (uuid: string) => {
        switch (format) {
            case 'uppercase': return uuid.toUpperCase();
            case 'nohyphens': return uuid.replace(/-/g, '');
            default: return uuid;
        }
    };

    const generate = useCallback(() => {
        const newUuids = Array.from({ length: count }, () => formatUUID(generateUUID()));
        setUuids(newUuids);
    }, [count, format]);

    const copyOne = async (uuid: string, index: number) => {
        await navigator.clipboard.writeText(uuid);
        setCopied(index);
        setTimeout(() => setCopied(null), 1500);
    };

    const copyAll = async () => {
        await navigator.clipboard.writeText(uuids.join('\n'));
        setCopied(-1);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-cyan-500/5">
            <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500">
                            UUID Generator
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Generate unique identifiers (UUID v4) for your applications.
                    </p>
                </header>

                {/* Controls */}
                <div className="p-6 rounded-2xl bg-card border border-border shadow-lg space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium">Count</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={count}
                                onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                                className="w-20 px-3 py-2 rounded-xl bg-secondary border border-border text-center font-bold"
                            />
                        </div>
                        <div className="flex gap-2">
                            {([
                                { id: 'standard', label: 'Standard' },
                                { id: 'uppercase', label: 'UPPERCASE' },
                                { id: 'nohyphens', label: 'No Hyphens' },
                            ] as const).map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setFormat(f.id)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${format === f.id
                                            ? 'bg-cyan-500 text-white'
                                            : 'bg-secondary hover:bg-cyan-500/20'
                                        }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <Button
                        onClick={generate}
                        className="w-full h-12 rounded-xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600"
                    >
                        Generate UUIDs
                    </Button>
                </div>

                {/* Output */}
                {uuids.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold">Generated UUIDs ({uuids.length})</h2>
                            <Button variant="outline" size="sm" onClick={copyAll}>
                                {copied === -1 ? '✓ All Copied!' : 'Copy All'}
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {uuids.map((uuid, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-cyan-500/50 transition-colors group"
                                >
                                    <code className="flex-1 font-mono text-sm select-all">{uuid}</code>
                                    <button
                                        onClick={() => copyOne(uuid, i)}
                                        className="px-3 py-1 text-xs font-medium rounded-lg bg-secondary hover:bg-cyan-500/20 hover:text-cyan-500 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        {copied === i ? '✓' : 'Copy'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
