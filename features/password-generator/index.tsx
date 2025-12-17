'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

export default function PasswordGeneratorContent() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeLower, setIncludeLower] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copied, setCopied] = useState(false);

    const charsets = {
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lower: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    const generatePassword = useCallback(() => {
        let chars = '';
        if (includeUpper) chars += charsets.upper;
        if (includeLower) chars += charsets.lower;
        if (includeNumbers) chars += charsets.numbers;
        if (includeSymbols) chars += charsets.symbols;

        if (!chars) {
            setPassword('Select at least one option');
            return;
        }

        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        const pwd = Array.from(array, x => chars[x % chars.length]).join('');
        setPassword(pwd);
    }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStrength = () => {
        let score = 0;
        if (length >= 12) score++;
        if (length >= 16) score++;
        if (includeUpper && includeLower) score++;
        if (includeNumbers) score++;
        if (includeSymbols) score++;
        if (score <= 2) return { label: 'Weak', color: 'red' };
        if (score <= 3) return { label: 'Medium', color: 'yellow' };
        if (score <= 4) return { label: 'Strong', color: 'green' };
        return { label: 'Very Strong', color: 'emerald' };
    };

    const strength = getStrength();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-red-500/5">
            <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-500 to-pink-500">
                            Password Generator
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Generate strong, secure passwords with cryptographic randomness.
                    </p>
                </header>

                {/* Password Display */}
                <div className="p-6 rounded-2xl bg-card border border-border shadow-lg space-y-6">
                    <div className="relative">
                        <div className="p-4 rounded-xl bg-secondary/50 border border-border font-mono text-xl text-center break-all min-h-[60px] flex items-center justify-center">
                            {password || 'Click Generate to create a password'}
                        </div>
                        {password && (
                            <div className="absolute top-2 right-2 flex gap-2">
                                <Button size="sm" variant="ghost" onClick={handleCopy}>
                                    {copied ? '✓' : '📋'}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Strength Indicator */}
                    {password && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Strength</span>
                                <span className={`font-bold text-${strength.color}-500`}>{strength.label}</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all bg-${strength.color}-500`}
                                    style={{
                                        width: strength.label === 'Weak' ? '25%' :
                                            strength.label === 'Medium' ? '50%' :
                                                strength.label === 'Strong' ? '75%' : '100%',
                                        background: strength.color === 'red' ? '#ef4444' :
                                            strength.color === 'yellow' ? '#eab308' :
                                                strength.color === 'green' ? '#22c55e' : '#10b981'
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Length Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <label className="font-medium">Length</label>
                            <span className="font-bold text-red-500">{length}</span>
                        </div>
                        <input
                            type="range"
                            min="8"
                            max="64"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-red-500"
                        />
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { id: 'upper', label: 'Uppercase (A-Z)', checked: includeUpper, set: setIncludeUpper },
                            { id: 'lower', label: 'Lowercase (a-z)', checked: includeLower, set: setIncludeLower },
                            { id: 'numbers', label: 'Numbers (0-9)', checked: includeNumbers, set: setIncludeNumbers },
                            { id: 'symbols', label: 'Symbols (!@#$)', checked: includeSymbols, set: setIncludeSymbols },
                        ].map((opt) => (
                            <label
                                key={opt.id}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${opt.checked ? 'bg-red-500/10 border border-red-500/30' : 'bg-secondary/50 border border-transparent hover:border-border'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={opt.checked}
                                    onChange={(e) => opt.set(e.target.checked)}
                                    className="w-4 h-4 accent-red-500"
                                />
                                <span className="text-sm font-medium">{opt.label}</span>
                            </label>
                        ))}
                    </div>

                    {/* Generate Button */}
                    <Button
                        onClick={generatePassword}
                        className="w-full h-14 rounded-xl font-bold text-lg bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 hover:from-red-600 hover:via-rose-600 hover:to-pink-600 shadow-lg"
                    >
                        🔐 Generate Password
                    </Button>
                </div>
            </div>
        </div>
    );
}
