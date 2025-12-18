'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Key, Copy, Check, RefreshCw, Layers } from 'lucide-react';
import { toast } from 'sonner';

export default function SecureTokenContent() {
    const [length, setLength] = useState(32);
    const [token, setToken] = useState('');
    const [copied, setCopied] = useState(false);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });

    const generateToken = useCallback(() => {
        const charSets = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        };

        let characters = '';
        if (options.uppercase) characters += charSets.uppercase;
        if (options.lowercase) characters += charSets.lowercase;
        if (options.numbers) characters += charSets.numbers;
        if (options.symbols) characters += charSets.symbols;

        if (characters.length === 0) {
            setToken('');
            return;
        }

        let result = '';
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            result += characters.charAt(array[i] % characters.length);
        }

        setToken(result);
    }, [length, options]);

    useEffect(() => {
        generateToken();
    }, [generateToken]);

    const handleCopy = () => {
        if (!token) return;
        navigator.clipboard.writeText(token);
        setCopied(true);
        toast.success("Token copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-amber-500/5">
            <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500">
                            Secure Token Generator
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Generate cryptographically secure random tokens for your APIs, secrets, or passwords.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Configuration */}
                    <Card className="lg:col-span-1 border-amber-500/10 shadow-xl self-start">
                        <CardHeader className="bg-amber-500/5">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Layers className="w-5 h-5 text-amber-500" />
                                Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <Label>Token Length</Label>
                                    <span className="font-mono font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded">{length}</span>
                                </div>
                                <input
                                    type="range"
                                    min="4"
                                    max="128"
                                    value={length}
                                    onChange={(e) => setLength(parseInt(e.target.value))}
                                    className="w-full h-2 bg-amber-500/20 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                                    <Switch
                                        id="uppercase"
                                        checked={options.uppercase}
                                        onCheckedChange={(val: boolean) => setOptions({ ...options, uppercase: val })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                                    <Switch
                                        id="lowercase"
                                        checked={options.lowercase}
                                        onCheckedChange={(val: boolean) => setOptions({ ...options, lowercase: val })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="numbers">Numbers (0-9)</Label>
                                    <Switch
                                        id="numbers"
                                        checked={options.numbers}
                                        onCheckedChange={(val: boolean) => setOptions({ ...options, numbers: val })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="symbols">Symbols (!@#$%^&*)</Label>
                                    <Switch
                                        id="symbols"
                                        checked={options.symbols}
                                        onCheckedChange={(val: boolean) => setOptions({ ...options, symbols: val })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <Button
                                onClick={generateToken}
                                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold h-11"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Re-generate
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Result */}
                    <Card className="lg:col-span-2 border-amber-500/10 shadow-xl overflow-hidden flex flex-col">
                        <CardHeader className="bg-amber-500/5">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Key className="w-5 h-5 text-amber-500" />
                                Generated Token
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 flex-grow flex items-center justify-center">
                            <div className="w-full space-y-6">
                                <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-dashed border-amber-500/30 text-center break-all relative group transition-all hover:bg-amber-500/5">
                                    <code className="text-2xl sm:text-3xl font-mono font-bold text-amber-600 dark:text-amber-400">
                                        {token || "Select at least one option"}
                                    </code>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        onClick={handleCopy}
                                        disabled={!token}
                                        className="h-14 flex-grow text-lg font-bold rounded-2xl bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/20"
                                    >
                                        {copied ? (
                                            <><Check className="mr-2 h-5 w-5" /> Copied!</>
                                        ) : (
                                            <><Copy className="mr-2 h-5 w-5" /> Copy Token</>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/30 border-t p-4 text-xs text-muted-foreground flex justify-between">
                            <span>Entropy: {token ? Math.floor(Math.log2(Math.pow(72, length))) : 0} bits (estimated)</span>
                            <span className="font-mono">CRYPTO_SECURE</span>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
