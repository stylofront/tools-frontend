'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function QRGeneratorContent() {
    const [text, setText] = useState('https://stylofront.tools');
    const [size, setSize] = useState(256);
    const [bgColor, setBgColor] = useState('#ffffff');
    const [fgColor, setFgColor] = useState('#000000');
    const [qrUrl, setQrUrl] = useState('');
    const [copied, setCopied] = useState(false);

    // Generate QR using Google Charts API (simple, no WASM needed for now)
    useEffect(() => {
        if (text) {
            const encodedText = encodeURIComponent(text);
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&bgcolor=${bgColor.slice(1)}&color=${fgColor.slice(1)}`;
            setQrUrl(url);
        }
    }, [text, size, bgColor, fgColor]);

    const handleDownload = async () => {
        const response = await fetch(qrUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qr-code.png';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-500/5">
            <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500">
                            QR Generator
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Generate custom QR codes for URLs, text, or any data instantly.
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Controls */}
                    <div className="space-y-6 p-6 rounded-2xl bg-card border border-border shadow-lg">
                        <div className="space-y-3">
                            <label className="font-semibold">Content</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter URL or text..."
                                className="w-full h-24 p-4 rounded-xl bg-secondary border border-border resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <label className="font-semibold">Size</label>
                                <span className="font-bold text-purple-500">{size}px</span>
                            </div>
                            <input
                                type="range"
                                min="128"
                                max="512"
                                step="32"
                                value={size}
                                onChange={(e) => setSize(Number(e.target.value))}
                                className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-purple-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Background</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="w-12 h-10 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border font-mono text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Foreground</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={fgColor}
                                        onChange={(e) => setFgColor(e.target.value)}
                                        className="w-12 h-10 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={fgColor}
                                        onChange={(e) => setFgColor(e.target.value)}
                                        className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border font-mono text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="flex flex-col items-center gap-6 p-6 rounded-2xl bg-card border border-border shadow-lg">
                        <h3 className="font-semibold">Preview</h3>
                        <div className="p-4 bg-white rounded-2xl shadow-inner" style={{ backgroundColor: bgColor }}>
                            {qrUrl && (
                                <img
                                    src={qrUrl}
                                    alt="QR Code"
                                    width={size}
                                    height={size}
                                    className="max-w-full"
                                />
                            )}
                        </div>
                        <Button
                            onClick={handleDownload}
                            disabled={!text}
                            className="w-full h-12 rounded-xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500"
                        >
                            ⬇️ Download QR Code
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
