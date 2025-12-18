'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Palette,
    Copy,
    Check,
    Plus,
    X,
    RotateCw,
    MoveRight,
    Zap,
    Download,
    Eye,
    Code,
    Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ColorStop {
    color: string;
    pos: number;
    id: string;
}

export default function GradientGeneratorContent() {
    const [stops, setStops] = useState<ColorStop[]>([
        { color: '#6366f1', pos: 0, id: '1' },
        { color: '#a855f7', pos: 100, id: '2' }
    ]);
    const [angle, setAngle] = useState(135);
    const [type, setType] = useState<'linear' | 'radial'>('linear');
    const [copied, setCopied] = useState(false);

    const gradientCss = useMemo(() => {
        const sortedStops = [...stops].sort((a, b) => a.pos - b.pos);
        const stopsStr = sortedStops.map(s => `${s.color} ${s.pos}%`).join(', ');
        return type === 'linear'
            ? `linear-gradient(${angle}deg, ${stopsStr})`
            : `radial-gradient(circle, ${stopsStr})`;
    }, [stops, angle, type]);

    const addStop = () => {
        if (stops.length >= 5) {
            toast.error("Max 5 stops for simplicity");
            return;
        }
        const newStop = {
            color: '#ec4899',
            pos: Math.min(100, stops[stops.length - 1].pos + 20),
            id: Math.random().toString(36)
        };
        setStops([...stops, newStop]);
    };

    const removeStop = (id: string) => {
        if (stops.length <= 2) return;
        setStops(stops.filter(s => s.id !== id));
    };

    const updateStop = (id: string, field: keyof ColorStop, value: any) => {
        setStops(stops.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`background: ${gradientCss};`);
        setCopied(true);
        toast.success("CSS Copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    const reverseColors = () => {
        const reversed = [...stops].reverse().map((s, i) => ({
            ...s,
            pos: stops[i].pos
        }));
        setStops(reversed);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            <div className="container max-w-7xl mx-auto px-4 py-12 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2"
                    >
                        <Palette className="h-4 w-4" />
                        VISUAL STYLE BUILDER
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                        Gradient Generator
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Design stunning linear and radial gradients visually.
                        Fine-tune colors, angles, and transparency for your CSS backgrounds.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Visual Preview */}
                    <div className="lg:col-span-12">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[3rem] blur-2xl opacity-20" />
                            <div className="relative h-[300px] md:h-[400px] rounded-[2.5rem] shadow-2xl overflow-hidden flex items-center justify-center group">
                                <div
                                    className="absolute inset-0 transition-all duration-500"
                                    style={{ background: gradientCss }}
                                />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-white text-center">
                                    <h4 className="font-bold text-2xl drop-shadow-lg mb-2">Visual Playground</h4>
                                    <p className="text-sm opacity-80 uppercase tracking-widest font-medium">Real-time Preview</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Builder Controls */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="p-8 bg-white dark:bg-slate-900 border-2 border-border rounded-[2.5rem] shadow-2xl space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black flex items-center gap-3">
                                    <Code className="h-5 w-5 text-indigo-500" />
                                    Color Stops
                                </h3>
                                <Button onClick={addStop} variant="outline" className="rounded-xl border-indigo-500/20 text-indigo-600 hover:bg-indigo-50">
                                    <Plus className="w-4 h-4 mr-2" /> Add Stop
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {stops.map((stop, i) => (
                                    <motion.div
                                        key={stop.id}
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex gap-4 items-center p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-border group"
                                    >
                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-md">
                                            <input
                                                type="color"
                                                value={stop.color}
                                                onChange={(e) => updateStop(stop.id, 'color', e.target.value)}
                                                className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex-grow space-y-1">
                                            <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                                                <span>Position</span>
                                                <span>{stop.pos}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={stop.pos}
                                                onChange={(e) => updateStop(stop.id, 'pos', parseInt(e.target.value))}
                                                className="w-full h-1.5 accent-indigo-500"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs font-bold w-16 px-2 py-1 bg-white dark:bg-slate-800 rounded border border-border">{stop.color}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeStop(stop.id)}
                                                disabled={stops.length <= 2}
                                                className="h-8 w-8 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex justify-center">
                                <Button variant="ghost" onClick={reverseColors} className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-indigo-600">
                                    <RotateCw className="w-3 h-3 mr-2" /> Reverse colors
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Type Controls */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="p-8 bg-white dark:bg-slate-900 border-2 border-border rounded-[2.5rem] shadow-2xl space-y-8">
                            <h3 className="text-xl font-black flex items-center gap-3">
                                <Zap className="h-5 w-5 text-purple-500" />
                                Configuration
                            </h3>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase text-muted-foreground">Gradient Type</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            variant={type === 'linear' ? 'default' : 'outline'}
                                            onClick={() => setType('linear')}
                                            className="rounded-xl h-12"
                                        >
                                            Linear
                                        </Button>
                                        <Button
                                            variant={type === 'radial' ? 'default' : 'outline'}
                                            onClick={() => setType('radial')}
                                            className="rounded-xl h-12"
                                        >
                                            Radial
                                        </Button>
                                    </div>
                                </div>

                                {type === 'linear' && (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground">
                                            <Label>Angle ({angle}°)</Label>
                                            <div className="flex gap-1">
                                                {[0, 90, 135, 180].map(a => (
                                                    <button key={a} onClick={() => setAngle(a)} className="px-1.5 py-0.5 border rounded hover:bg-slate-50">{a}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="relative h-12 flex items-center justify-center p-2 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-border">
                                            <input
                                                type="range"
                                                min="0"
                                                max="360"
                                                value={angle}
                                                onChange={(e) => setAngle(parseInt(e.target.value))}
                                                className="w-full h-1.5 accent-indigo-500"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 border-t space-y-4">
                                    <Label className="text-[10px] font-black uppercase text-muted-foreground">Generated CSS</Label>
                                    <div className="relative">
                                        <pre className="p-4 bg-slate-950 text-indigo-300 rounded-2xl text-[10px] whitespace-pre-wrap font-mono border-2 border-white/5 shadow-inner leading-relaxed">
                                            background: {gradientCss};
                                        </pre>
                                        <Button
                                            size="sm"
                                            onClick={handleCopy}
                                            className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg h-8 text-[10px] font-bold"
                                        >
                                            {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                                            {copied ? 'COPIED' : 'COPY'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tip Card */}
                        <div className="p-6 bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-[2rem] shadow-2xl space-y-3">
                            <Eye className="h-6 w-6 text-pink-400" />
                            <h4 className="font-bold">Designer Tip</h4>
                            <p className="text-xs text-white/70 leading-relaxed font-inter">
                                Try using adjacent colors on the color wheel for a smooth, natural-looking gradient.
                                High contrast gradients work best for call-to-action buttons.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
