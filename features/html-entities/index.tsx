'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, ArrowDownUp, Copy, Check, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function HtmlEntitiesContent() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [copied, setCopied] = useState(false);

    const handleProcess = useCallback(() => {
        if (!input) {
            setOutput('');
            return;
        }

        try {
            if (mode === 'encode') {
                const el = document.createElement('div');
                el.innerText = input;
                setOutput(el.innerHTML);
            } else {
                const el = document.createElement('div');
                el.innerHTML = input;
                setOutput(el.innerText || el.textContent || '');
            }
        } catch (e) {
            toast.error("Failed to process HTML entities");
            console.error(e);
        }
    }, [input, mode]);

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        toast.success("Result copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSwap = () => {
        setInput(output);
        setOutput('');
        setMode(mode === 'encode' ? 'decode' : 'encode');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-emerald-500/5">
            <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
                            HTML Entities
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Encode special characters to HTML entities or decode entities back to plain text.
                    </p>
                </header>

                <div className="flex justify-center gap-3">
                    <Button
                        variant={mode === 'encode' ? 'default' : 'secondary'}
                        onClick={() => setMode('encode')}
                        className={`h-12 px-8 rounded-xl font-bold transition-all ${mode === 'encode' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20' : ''}`}
                    >
                        Encode
                    </Button>
                    <Button
                        variant={mode === 'decode' ? 'default' : 'secondary'}
                        onClick={() => setMode('decode')}
                        className={`h-12 px-8 rounded-xl font-bold transition-all ${mode === 'decode' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20' : ''}`}
                    >
                        Decode
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-emerald-500/10 shadow-xl overflow-hidden">
                        <CardHeader className="bg-emerald-500/5 py-4">
                            <CardTitle className="text-sm flex items-center gap-2">
                                <Info className="w-4 h-4 text-emerald-500" />
                                Input {mode === 'encode' ? 'Text' : 'Entities'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={mode === 'encode' ? "Paste your text here (e.g. < & >)..." : "Paste HTML entities here (e.g. &lt; &amp; &gt;)..."}
                                className="min-h-[300px] font-mono text-sm resize-none border-none focus-visible:ring-0 p-0"
                            />
                        </CardContent>
                    </Card>

                    <Card className="border-emerald-500/10 shadow-xl overflow-hidden relative group">
                        <CardHeader className="bg-emerald-500/5 py-4 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm flex items-center gap-2">
                                <Code2 className="w-4 h-4 text-emerald-500" />
                                Result
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCopy}
                                disabled={!output}
                                className="h-8 hover:bg-emerald-500/10 hover:text-emerald-600"
                            >
                                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="min-h-[300px] font-mono text-sm break-all whitespace-pre-wrap">
                                {output || <span className="text-muted-foreground italic">Result will appear here...</span>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-center gap-4">
                    <Button
                        onClick={handleProcess}
                        disabled={!input}
                        className="h-14 px-12 rounded-2xl text-lg font-bold bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
                    >
                        {mode === 'encode' ? 'Encode Now' : 'Decode Now'}
                    </Button>
                    {output && (
                        <Button
                            variant="outline"
                            onClick={handleSwap}
                            className="h-14 px-6 rounded-2xl border-2 hover:bg-emerald-50"
                        >
                            <ArrowDownUp className="w-5 h-5 mr-2" />
                            Swap
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
