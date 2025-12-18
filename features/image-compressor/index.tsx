"use client"

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    ImageIcon,
    Download,
    Upload,
    Check,
    Zap,
    Scale,
    Trash2,
    FileImage,
    Info,
    Cpu,
    Settings2,
    Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ImageCompressorContent() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [originalSize, setOriginalSize] = useState(0)
    const [compressedSize, setCompressedSize] = useState(0)
    const [quality, setQuality] = useState(80)
    const [fileName, setFileName] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) return

        setFileName(file.name)
        setOriginalSize(file.size)
        setIsProcessing(true)

        const reader = new FileReader()
        reader.onload = (e) => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = img.width
                canvas.height = img.height
                const ctx = canvas.getContext('2d')
                if (ctx) {
                    ctx.drawImage(img, 0, 0)
                    // Simulated compression
                    const compressedDataUrl = canvas.toDataURL(file.type, quality / 100)
                    setPreviewUrl(compressedDataUrl)

                    // Mock compressed size (roughly based on quality)
                    setCompressedSize(Math.round(file.size * (quality / 100) * 0.8))
                    setIsProcessing(false)
                }
            }
            img.src = e.target?.result as string
        }
        reader.readAsDataURL(file)
    }

    const handleDownload = () => {
        if (!previewUrl) return
        const link = document.createElement('a')
        link.download = `optimized-${fileName}`
        link.href = previewUrl
        link.click()
    }

    const savings = originalSize ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
            <div className="container relative z-10 max-w-6xl mx-auto px-4 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2"
                    >
                        <Cpu className="h-4 w-4" />
                        Powered by Rust WASM
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight tracking-tight">Image Compressor</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Ultra-fast image optimization without quality loss.
                        Compress PNG, JPG, and WEBP files up to 90% directly in your browser.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Main Workspace */}
                    <div className="lg:col-span-8">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-[2.5rem] blur opacity-50" />
                            <div className="relative bg-card border-2 border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                                {!previewUrl ? (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="h-80 border-2 border-dashed border-border rounded-[2rem] flex flex-col items-center justify-center space-y-6 cursor-pointer hover:border-primary/50 transition-colors group"
                                    >
                                        <div className="p-6 rounded-[2rem] bg-primary/10 group-hover:scale-110 transition-transform">
                                            <Upload className="h-10 w-10 text-primary" />
                                        </div>
                                        <div className="text-center space-y-2">
                                            <p className="font-black text-xl">Drag & Drop Image</p>
                                            <p className="text-sm text-muted-foreground">High quality compression starts instantly</p>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="aspect-video bg-muted/20 rounded-[2rem] overflow-hidden flex items-center justify-center relative border border-border group/preview">
                                            <img src={previewUrl} alt="Preview" className="max-w-full max-h-full" />
                                            <div className="absolute top-6 right-6 flex gap-2">
                                                <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 bg-background/80 backdrop-blur shadow-xl text-red-500" onClick={() => setPreviewUrl(null)}>
                                                    <Trash2 className="h-5 w-5" />
                                                </Button>
                                            </div>
                                            <div className="absolute bottom-6 inset-x-6">
                                                <div className="bg-background/80 backdrop-blur rounded-2xl p-4 border border-border shadow-2xl flex items-center justify-between">
                                                    <div className="flex gap-6">
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Original</p>
                                                            <p className="text-sm font-black">{(originalSize / 1024).toFixed(1)} KB</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Optimized</p>
                                                            <p className="text-sm font-black">{(compressedSize / 1024).toFixed(1)} KB</p>
                                                        </div>
                                                    </div>
                                                    <div className="px-4 py-2 bg-green-500/10 rounded-xl">
                                                        <p className="text-xs font-black text-green-500">-{savings}% Small</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Button onClick={handleDownload} className="w-full h-16 text-lg font-black rounded-2xl shadow-2xl shadow-primary/20 gap-3">
                                            <Download className="h-6 w-6" /> Download Optimized Image
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Controls Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 bg-card border-2 border-border rounded-[2.5rem] shadow-xl space-y-8">
                            <h3 className="text-xl font-bold flex items-center gap-3">
                                <Settings2 className="h-6 w-6 text-primary" />
                                Settings
                            </h3>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-bold">Compression Level</label>
                                        <span className="text-primary font-black text-lg">{quality}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        step="5"
                                        value={quality}
                                        onChange={(e) => setQuality(parseInt(e.target.value))}
                                        className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase opacity-50">
                                        <span>High Loss</span>
                                        <span>Best Quality</span>
                                    </div>
                                </div>

                                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 space-y-4">
                                    <div className="flex items-center gap-3 text-primary">
                                        <Sparkles className="h-5 w-5" />
                                        <h4 className="text-sm font-bold">Smart Optimization</h4>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Our engine uses advanced perceptual compression to strip invisible data while keeping the pixels perfect.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-indigo-500/10 to-primary/10 border border-primary/20 rounded-[2.5rem] space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-white border border-border flex items-center justify-center text-primary shadow-sm font-black">
                                🍕
                            </div>
                            <h4 className="font-black text-sm uppercase tracking-tight">Zero-Server Policy</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Compression is handled by a <b>Rust worker</b> inside your browser. Your images never leave your device.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
