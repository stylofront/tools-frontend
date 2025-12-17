'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ColorPickerContent() {
    const [color, setColor] = useState('#6366f1');
    const [copied, setCopied] = useState<string | null>(null);

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    };

    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    };

    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const formats = [
        { label: 'HEX', value: color.toUpperCase() },
        { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
        { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
        { label: 'CSS', value: `--color: ${color};` },
    ];

    const handleCopy = async (value: string, label: string) => {
        await navigator.clipboard.writeText(value);
        setCopied(label);
        setTimeout(() => setCopied(null), 1500);
    };

    const randomColor = () => {
        setColor('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
    };

    return (
        <div className="min-h-screen" style={{ background: `linear-gradient(135deg, var(--background) 0%, ${color}10 100%)` }}>
            <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span style={{
                            backgroundImage: `linear-gradient(135deg, ${color}, ${color}88, ${color}55)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Color Picker
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Pick any color and get it in HEX, RGB, HSL, and CSS formats.
                    </p>
                </header>

                {/* Color Preview */}
                <div className="flex flex-col items-center gap-6">
                    <div
                        className="w-48 h-48 rounded-3xl shadow-2xl border-4 border-white/20 transition-all duration-300"
                        style={{ backgroundColor: color, boxShadow: `0 25px 50px -12px ${color}50` }}
                    />
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-16 h-16 rounded-xl cursor-pointer border-0 bg-transparent"
                        />
                        <input
                            type="text"
                            value={color}
                            onChange={(e) => /^#[0-9a-f]{0,6}$/i.test(e.target.value) && setColor(e.target.value)}
                            className="w-32 px-4 py-3 rounded-xl bg-card border border-border font-mono text-lg text-center uppercase"
                        />
                        <Button variant="outline" onClick={randomColor}>
                            🎲 Random
                        </Button>
                    </div>
                </div>

                {/* Color Formats */}
                <div className="grid sm:grid-cols-2 gap-4">
                    {formats.map((f) => (
                        <div
                            key={f.label}
                            onClick={() => handleCopy(f.value, f.label)}
                            className="p-4 rounded-2xl bg-card border border-border hover:border-primary/50 cursor-pointer transition-all group"
                        >
                            <div className="text-xs font-bold text-muted-foreground uppercase mb-2">{f.label}</div>
                            <code className="font-mono text-lg">{f.value}</code>
                            <div className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {copied === f.label ? '✓ Copied!' : 'Click to copy'}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Color Shades */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-center">Color Shades</h3>
                    <div className="flex rounded-xl overflow-hidden">
                        {[0.9, 0.7, 0.5, 0.3, 0.1, 0, -0.1, -0.2, -0.3, -0.4].map((adj, i) => {
                            const lighten = adj > 0;
                            const factor = Math.abs(adj);
                            const shade = lighten
                                ? `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * factor)}, ${Math.min(255, rgb.g + (255 - rgb.g) * factor)}, ${Math.min(255, rgb.b + (255 - rgb.b) * factor)})`
                                : `rgb(${rgb.r * (1 + adj)}, ${rgb.g * (1 + adj)}, ${rgb.b * (1 + adj)})`;
                            return (
                                <div
                                    key={i}
                                    className="flex-1 h-12 cursor-pointer hover:scale-110 transition-transform"
                                    style={{ backgroundColor: shade }}
                                    onClick={() => handleCopy(shade, `shade-${i}`)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
