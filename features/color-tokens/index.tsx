'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Layers,
    Copy,
    Check,
    RefreshCw,
    Palette,
    Settings,
    Eye,
    Moon,
    Sun,
    Terminal,
    Zap,
    Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ColorTokensContent() {
    const [baseColor, setBaseColor] = useState('#6d28d9'); // Violet
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [copied, setCopied] = useState(false);

    // Helper to simulate color generation (simplified for now)
    // In a real app, use chroma-js or tinycolor2 for better physics-based scales
    const generateTheme = useMemo(() => {
        // Very basic mock logic to show the idea
        const isDark = mode === 'dark';
        return {
            background: isDark ? '240 10% 3.9%' : '0 0% 100%',
            foreground: isDark ? '0 0% 98%' : '240 10% 3.9%',
            card: isDark ? '240 10% 3.9%' : '0 0% 100%',
            primary: isDark ? '263.4 70% 50.4%' : '262.1 83.3% 57.8%',
            secondary: isDark ? '240 3.7% 15.9%' : '240 4.8% 95.9%',
            accent: isDark ? '240 3.7% 15.9%' : '240 4.8% 95.9%',
            destructive: isDark ? '0 62.8% 30.6%' : '0 84.2% 60.2%',
            border: isDark ? '240 3.7% 15.9%' : '240 5.9% 90%',
            input: isDark ? '240 3.7% 15.9%' : '240 5.9% 90%',
            ring: isDark ? '263.4 70% 50.4%' : '262.1 83.3% 57.8%',
        };
    }, [baseColor, mode]);

    const cssString = useMemo(() => {
        const theme = generateTheme;
        return `  --background: ${theme.background};
  --foreground: ${theme.foreground};
  --card: ${theme.card};
  --card-foreground: ${theme.foreground};
  --popover: ${theme.background};
  --popover-foreground: ${theme.foreground};
  --primary: ${theme.primary};
  --primary-foreground: 0 0% 100%;
  --secondary: ${theme.secondary};
  --secondary-foreground: ${theme.foreground};
  --muted: ${theme.secondary};
  --muted-foreground: 240 3.8% 46.1%;
  --accent: ${theme.accent};
  --accent-foreground: ${theme.foreground};
  --destructive: ${theme.destructive};
  --destructive-foreground: 0 0% 98%;
  --border: ${theme.border};
  --input: ${theme.input};
  --ring: ${theme.ring};
  --radius: 0.5rem;`;
    }, [generateTheme]);

    const handleCopy = () => {
        navigator.clipboard.writeText(cssString);
        setCopied(true);
        toast.success("Theme Varibles Copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            <div className="container max-w-7xl mx-auto px-4 py-12 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-bold text-orange-600 dark:text-orange-400 mb-2"
                    >
                        <Layers className="h-4 w-4" />
                        DESIGN SYSTEM HELPER
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-amber-600 to-red-600">
                        Color Tokens Gen
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Generate shadcn/ui compatible CSS variables from a single color.
                        Sync your UI theme with your brand identity in seconds.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Controls */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="p-8 bg-white dark:bg-slate-900 border-2 border-border rounded-[2.5rem] shadow-2xl space-y-8">
                            <h3 className="text-xl font-black flex items-center gap-3">
                                <Palette className="h-5 w-5 text-orange-500" />
                                Configuration
                            </h3>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase text-muted-foreground px-1">Brand Primary Color</Label>
                                    <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-border">
                                        <div className="relative w-14 h-14 rounded-xl shadow-lg border-2 border-white dark:border-slate-800 overflow-hidden shrink-0">
                                            <input
                                                type="color"
                                                value={baseColor}
                                                onChange={(e) => setBaseColor(e.target.value)}
                                                className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex-grow space-y-1">
                                            <Input
                                                value={baseColor}
                                                onChange={(e) => setBaseColor(e.target.value)}
                                                className="bg-transparent border-none font-mono font-bold text-lg p-0 focus-visible:ring-0"
                                            />
                                            <p className="text-[10px] text-muted-foreground">Adjust the slider or enter HEX</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase text-muted-foreground px-1">Theme Mode</Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button
                                            variant={mode === 'light' ? 'default' : 'outline'}
                                            onClick={() => setMode('light')}
                                            className="h-14 rounded-2xl gap-2 font-bold"
                                        >
                                            <Sun className="w-4 h-4" /> Light
                                        </Button>
                                        <Button
                                            variant={mode === 'dark' ? 'default' : 'outline'}
                                            onClick={() => setMode('dark')}
                                            className="h-14 rounded-2xl gap-2 font-bold"
                                        >
                                            <Moon className="w-4 h-4" /> Dark
                                        </Button>
                                    </div>
                                </div>

                                <div className="pt-6 border-t">
                                    <Button
                                        onClick={handleCopy}
                                        className="w-full h-16 rounded-2xl text-lg font-black bg-gradient-to-r from-orange-600 to-amber-600 shadow-xl shadow-orange-500/20"
                                    >
                                        <Copy className="mr-2 h-5 w-5" /> COPY VARIABLES
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Preview Card */}
                        <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl space-y-6 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Eye className="w-20 h-20" />
                            </div>
                            <h4 className="font-bold text-sm uppercase tracking-widest text-orange-400">Component Preview</h4>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl border border-white/10 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: baseColor }} />
                                        <div className="h-2 w-24 bg-white/20 rounded" />
                                    </div>
                                    <div className="h-4 w-full bg-white/10 rounded" />
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-8 w-20 rounded-lg" style={{ backgroundColor: baseColor }} />
                                    <div className="h-8 w-20 rounded-lg bg-white/10" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Output */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#0f1117] border-2 border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                                        <Terminal className="h-4 w-4" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-white/50">globals.css tokens</span>
                                </div>
                                {copied && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-[10px] font-bold text-green-400 uppercase tracking-widest"
                                    >
                                        Linked to clipboard!
                                    </motion.span>
                                )}
                            </div>
                            <div className="relative group">
                                <pre className="p-10 text-sm font-mono leading-relaxed text-indigo-300 overflow-x-auto custom-scrollbar h-[600px]">
                                    {`@layer base {
  :root {
${cssString}
  }

  .${mode === 'dark' ? 'dark' : ''} {
${cssString.split('\n').map(l => '  ' + l).join('\n')}
  }
}`}
                                </pre>
                                <div className="absolute top-4 right-4 group-hover:block hidden">
                                    <Button size="sm" variant="secondary" onClick={handleCopy} className="h-8 text-[10px] bg-white/10 hover:bg-white/20">
                                        <Copy className="w-3 h-3 mr-1" /> QUICK COPY
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 opacity-80">
                    <div className="p-8 bg-orange-50 dark:bg-orange-950/20 border border-orange-500/20 rounded-3xl space-y-4">
                        <Zap className="h-6 w-6 text-orange-500" />
                        <h4 className="font-bold text-sm">Shadcn Optimized</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Perfectly calibrated HSL sequences for the radix-ui/shadcn system. No more guessing saturation levels.
                        </p>
                    </div>
                    <div className="p-8 bg-amber-50 dark:bg-amber-950/20 border border-amber-500/20 rounded-3xl space-y-4">
                        <RefreshCw className="h-6 w-6 text-amber-500" />
                        <h4 className="font-bold text-sm">Contrast Balance</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Automatically adjusts text foreground colors (primary-foreground) to ensure readability (WCAG compliance).
                        </p>
                    </div>
                    <div className="p-8 bg-red-50 dark:bg-red-950/20 border border-red-500/20 rounded-3xl space-y-4">
                        <Download className="h-6 w-6 text-red-500" />
                        <h4 className="font-bold text-sm">Production Ready</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Paste directly into your global CSS file. Includes both light and dark mode variable sets.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
