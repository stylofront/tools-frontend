'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Maximize2,
    Download,
    Upload,
    RefreshCw,
    Check,
    Lock,
    Unlock,
    Image as ImageIcon,
    Zap,
    Scale,
    RotateCw,
    Repeat,
    Save,
    Trash2,
    Monitor,
    Smartphone,
    Instagram
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ImageResizerContent() {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [originalDim, setOriginalDim] = useState({ width: 0, height: 0 });
    const [newDim, setNewDim] = useState({ width: 0, height: 0 });
    const [lockAspectRatio, setLockAspectRatio] = useState(true);
    const [rotation, setRotation] = useState(0);
    const [format, setFormat] = useState('image/png');
    const [quality, setQuality] = useState(0.92);
    const [isResizing, setIsResizing] = useState(false);
    const [fileName, setFileName] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processFile(file);
    };

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                setImage(img);
                setOriginalDim({ width: img.width, height: img.height });
                setNewDim({ width: img.width, height: img.height });
                setPreviewUrl(event.target?.result as string);
                setFileName(file.name.replace(/\.[^/.]+$/, ""));
                toast.success("Image loaded!");
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const handleWidthChange = (val: number) => {
        if (lockAspectRatio && image) {
            const ratio = image.height / image.width;
            setNewDim({ width: val, height: Math.round(val * ratio) });
        } else {
            setNewDim(prev => ({ ...prev, width: val }));
        }
    };

    const handleHeightChange = (val: number) => {
        if (lockAspectRatio && image) {
            const ratio = image.width / image.height;
            setNewDim({ width: Math.round(val * ratio), height: val });
        } else {
            setNewDim(prev => ({ ...prev, height: val }));
        }
    };

    const applyPreset = (w: number, h: number) => {
        if (lockAspectRatio) {
            handleWidthChange(w);
        } else {
            setNewDim({ width: w, height: h });
        }
    };

    const handleDownload = useCallback(() => {
        if (!image || !canvasRef.current) return;

        setIsResizing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Account for rotation in canvas size
        const isVertical = rotation % 180 !== 0;
        canvas.width = isVertical ? newDim.height : newDim.width;
        canvas.height = isVertical ? newDim.width : newDim.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            -newDim.width / 2,
            -newDim.height / 2,
            newDim.width,
            newDim.height
        );

        const extension = format.split('/')[1];
        const dataUrl = canvas.toDataURL(format, quality);
        const link = document.createElement('a');
        link.download = `${fileName}-stylo-tools.${extension}`;
        link.href = dataUrl;
        link.click();

        setIsResizing(false);
        toast.success("Image resized and downloaded!");
    }, [image, newDim, fileName, rotation, format, quality]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            <div className="container max-w-7xl mx-auto px-4 py-12 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-bold text-violet-600 dark:text-violet-400 mb-2"
                    >
                        <Maximize2 className="h-4 w-4" />
                        PIXEL PERFECT PRECISION
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600">
                        Image Resizer
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Scale, rotate, and convert your images with high-quality algorithms.
                        Professional results, instantly, in your browser.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Workspace */}
                    <div className="lg:col-span-8 space-y-6">
                        {!previewUrl ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => fileInputRef.current?.click()}
                                className="relative group cursor-pointer"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                                <div className="relative h-[500px] bg-white dark:bg-slate-900/50 backdrop-blur-xl border-4 border-dashed border-slate-200 dark:border-slate-800 group-hover:border-violet-500/50 rounded-[2.5rem] flex flex-col items-center justify-center space-y-6 transition-all duration-300">
                                    <div className="w-24 h-24 rounded-[2rem] bg-violet-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <Upload className="h-12 w-12 text-violet-500" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-black mb-2">Drop your image here</h3>
                                        <p className="text-muted-foreground">Click to browse • Supports PNG, JPG, WebP</p>
                                    </div>
                                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="relative group overflow-hidden bg-white dark:bg-slate-900 border-2 border-border rounded-[2.5rem] shadow-2xl">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
                                    <div className="relative h-[500px] flex items-center justify-center p-8 overflow-hidden bg-slate-100 dark:bg-slate-950/50">
                                        <div
                                            className="relative transition-transform duration-300 shadow-2xl"
                                            style={{ transform: `rotate(${rotation}deg)` }}
                                        >
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="max-w-full max-h-[400px] object-contain rounded-lg"
                                            />
                                            <div className="absolute -top-4 -right-4 bg-violet-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
                                                {newDim.width} x {newDim.height}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border-t flex justify-between bg-white dark:bg-slate-900">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => setRotation(r => (r - 90) % 360)} className="rounded-xl">
                                                <RotateCw className="w-4 h-4 mr-2 rotate-180" /> -90°
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => setRotation(r => (r + 90) % 360)} className="rounded-xl">
                                                <RotateCw className="w-4 h-4 mr-2" /> +90°
                                            </Button>
                                        </div>
                                        <Button variant="destructive" size="sm" onClick={() => setPreviewUrl(null)} className="rounded-xl">
                                            <Trash2 className="w-4 h-4 mr-2" /> Replace Image
                                        </Button>
                                    </div>
                                </div>

                                {/* Presets */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Button variant="outline" onClick={() => applyPreset(1920, 1080)} className="h-16 flex flex-col gap-1 rounded-2xl">
                                        <Monitor className="w-4 h-4" />
                                        <span className="text-[10px] font-bold">1080p Full HD</span>
                                    </Button>
                                    <Button variant="outline" onClick={() => applyPreset(1080, 1080)} className="h-16 flex flex-col gap-1 rounded-2xl">
                                        <Instagram className="w-4 h-4" />
                                        <span className="text-[10px] font-bold">Insta Post</span>
                                    </Button>
                                    <Button variant="outline" onClick={() => applyPreset(1080, 1920)} className="h-16 flex flex-col gap-1 rounded-2xl">
                                        <Smartphone className="w-4 h-4" />
                                        <span className="text-[10px] font-bold">Insta Story</span>
                                    </Button>
                                    <Button variant="outline" onClick={() => applyPreset(1200, 630)} className="h-16 flex flex-col gap-1 rounded-2xl">
                                        <Zap className="w-4 h-4" />
                                        <span className="text-[10px] font-bold">OG Image</span>
                                    </Button>
                                </div>
                                <canvas ref={canvasRef} className="hidden" />
                            </motion.div>
                        )}
                    </div>

                    {/* Controls Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 bg-white dark:bg-slate-900 border-2 border-border rounded-[2.5rem] shadow-2xl space-y-8">
                            <h3 className="text-xl font-black flex items-center gap-3">
                                <Scale className="h-5 w-5 text-violet-500" />
                                Adjust Pixels
                            </h3>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground px-1">
                                            <Label>Width (px)</Label>
                                            <span className="text-violet-500">Orig: {originalDim.width}</span>
                                        </div>
                                        <Input
                                            type="number"
                                            value={newDim.width}
                                            onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                                            className="h-12 rounded-xl font-mono"
                                        />
                                    </div>

                                    <div className="flex justify-center -my-2">
                                        <Button
                                            variant="ghost"
                                            onClick={() => setLockAspectRatio(!lockAspectRatio)}
                                            className={cn(
                                                "rounded-full h-10 px-4 transition-all",
                                                lockAspectRatio ? "bg-violet-500/10 text-violet-600" : "bg-slate-100 text-slate-400"
                                            )}
                                        >
                                            {lockAspectRatio ? <Lock className="h-4 w-4 mr-2" /> : <Unlock className="h-4 w-4 mr-2" />}
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Aspect Ratio</span>
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground px-1">
                                            <Label>Height (px)</Label>
                                            <span className="text-violet-500">Orig: {originalDim.height}</span>
                                        </div>
                                        <Input
                                            type="number"
                                            value={newDim.height}
                                            onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                                            className="h-12 rounded-xl font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-muted-foreground px-1">Output Format</Label>
                                        <Select value={format} onValueChange={setFormat}>
                                            <SelectTrigger className="h-12 rounded-xl">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="image/png">PNG (Lossless)</SelectItem>
                                                <SelectItem value="image/jpeg">JPEG (Standard)</SelectItem>
                                                <SelectItem value="image/webp">WebP (Optimized)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {format !== 'image/png' && (
                                        <div className="space-y-4 pt-2">
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground px-1">
                                                <Label>Quality ({Math.round(quality * 100)}%)</Label>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.1"
                                                max="1"
                                                step="0.01"
                                                value={quality}
                                                onChange={(e) => setQuality(parseFloat(e.target.value))}
                                                className="w-full accent-violet-600 h-1"
                                            />
                                        </div>
                                    )}
                                </div>

                                <Button
                                    onClick={handleDownload}
                                    disabled={!image || isResizing}
                                    className="w-full h-16 rounded-2xl text-lg font-black bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-[1.02] transition-all shadow-xl shadow-violet-500/20"
                                >
                                    {isResizing ? <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                                    {isResizing ? "PROCESSING..." : "DOWNLOAD RESIZED"}
                                </Button>
                            </div>
                        </div>

                        {/* Stats Card */}
                        {image && (
                            <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[2.5rem] shadow-2xl space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <Repeat className="w-4 h-4 text-violet-400" />
                                    </div>
                                    <h4 className="font-bold text-sm">Optimization Info</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[9px] text-white/50 uppercase tracking-widest">Original Pixels</p>
                                        <p className="font-mono text-sm">{(originalDim.width * originalDim.height / 1000000).toFixed(1)}MP</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] text-white/50 uppercase tracking-widest">New Pixels</p>
                                        <p className="font-mono text-sm">{(newDim.width * newDim.height / 1000000).toFixed(1)}MP</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
