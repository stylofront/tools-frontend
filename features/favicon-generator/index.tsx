"use client"

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    Download,
    Upload,
    Check,
    Zap,
    Globe,
    Trash2,
    ImageIcon,
    Shield,
    FileImage
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function FaviconGeneratorContent() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [isDone, setIsDone] = useState(false)
    const [fileName, setFileName] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) return

        setFileName(file.name.replace(/\.[^/.]+$/, ""))
        setIsGenerating(true)

        const reader = new FileReader()
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string)
            setTimeout(() => {
                setIsGenerating(false)
                setIsDone(true)
            }, 800)
        }
        reader.readAsDataURL(file)
    }

    const handleDownload = () => {
        if (!previewUrl) return

        // Simulating multiple downloads or a zip
        const sizes = [16, 32, 48, 64, 128, 256]
        const img = new Image()
        img.onload = () => {
            sizes.forEach(size => {
                const canvas = document.createElement('canvas')
                canvas.width = size
                canvas.height = size
                const ctx = canvas.getContext('2d')
                if (ctx) {
                    ctx.drawImage(img, 0, 0, size, size)
                    const link = document.createElement('a')
                    link.download = `favicon-${size}x${size}.png`
                    link.href = canvas.toDataURL('image/png')
                    link.click()
                }
            })
        }
        img.src = previewUrl
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
            <div className="container relative z-10 max-w-5xl mx-auto px-4 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2"
                    >
                        <Globe className="h-4 w-4" />
                        Professional Branding
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight tracking-tight">Favicon Generator</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Generate high-quality favicons for your website.
                        Exports all standard sizes (16x16 to 256x256) in a single click.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-12">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-[2.5rem] blur opacity-50" />
                            <div className="relative bg-card border-2 border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden">
                                {!previewUrl ? (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="h-72 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center space-y-4 cursor-pointer hover:border-primary/50 transition-colors group"
                                    >
                                        <div className="p-4 rounded-2xl bg-primary/10 group-hover:scale-110 transition-transform">
                                            <Upload className="h-8 w-8 text-primary" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold">Select Logo or Image</p>
                                            <p className="text-xs text-muted-foreground mt-1">Sqaure images work best</p>
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
                                        <div className="flex flex-wrap items-center justify-center gap-8 p-8 bg-muted/30 rounded-3xl">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-16 h-16 rounded shadow-xl overflow-hidden border border-border">
                                                    <img src={previewUrl} alt="16" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Icon View</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-8 h-8 rounded shadow-lg overflow-hidden border border-border">
                                                    <img src={previewUrl} alt="32" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">32x32</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-4 h-4 rounded shadow-sm overflow-hidden border border-border">
                                                    <img src={previewUrl} alt="16" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">16x16</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-primary/5 rounded-3xl border border-primary/10">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                                                    <FileImage className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">Bundle Ready</p>
                                                    <p className="text-xs text-muted-foreground">Standard 6-icon PNG bundle prepared.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 w-full md:w-auto">
                                                <Button variant="ghost" className="flex-1 md:flex-none h-12 rounded-xl text-red-500 hover:bg-red-500/10" onClick={() => setPreviewUrl(null)}>
                                                    <Trash2 className="h-4 w-4 mr-2" /> Reset
                                                </Button>
                                                <Button onClick={handleDownload} className="flex-1 md:flex-none h-12 px-8 rounded-xl shadow-lg shadow-primary/20">
                                                    <Download className="h-4 w-4 mr-2" /> Download Bundle
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-muted/30 border border-border rounded-3xl space-y-2">
                        <h4 className="font-bold text-sm">Universal Format</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                            We export in high-density PNG format which is compatible with all modern browsers and devices.
                        </p>
                    </div>
                    <div className="p-6 bg-muted/30 border border-border rounded-3xl space-y-2">
                        <h4 className="font-bold text-sm">Transparency</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                            Alpha transparency is preserved perfectly for logos with transparent backgrounds.
                        </p>
                    </div>
                    <div className="p-6 bg-muted/30 border border-border rounded-3xl space-y-2">
                        <h4 className="font-bold text-sm">Privacy</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                            Processing happens entirely in your browser memory. No data is stored on our servers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
