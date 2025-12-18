"use client"

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    Download,
    Upload,
    Layers,
    Check,
    RefreshCw,
    Maximize,
    ChevronRight,
    Sparkles,
    Zap,
    Image as ImageIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function SvgToPngContent() {
    const [svgContent, setSvgContent] = useState<string | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string>('')
    const [width, setWidth] = useState<number>(1024)
    const [isConverting, setIsConverting] = useState(false)
    const [isDownloaded, setIsDownloaded] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.type !== 'image/svg+xml') {
            alert('Please upload an SVG file')
            return
        }

        const reader = new FileReader()
        reader.onload = (event) => {
            const content = event.target?.result as string
            setSvgContent(content)
            setFileName(file.name.replace('.svg', ''))

            // Create a temporary URL for preview
            const blob = new Blob([content], { type: 'image/svg+xml' })
            const url = URL.createObjectURL(blob)
            setPreviewUrl(url)
        }
        reader.readAsText(file)
    }

    const convertToPng = useCallback(() => {
        if (!svgContent || !canvasRef.current) return

        setIsConverting(true)
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const img = new Image()
        const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
        const url = URL.createObjectURL(blob)

        img.onload = () => {
            const aspectRatio = img.height / img.width
            const height = Math.round(width * aspectRatio)

            canvas.width = width
            canvas.height = height

            ctx.clearRect(0, 0, width, height)
            ctx.drawImage(img, 0, 0, width, height)

            const pngUrl = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.download = `${fileName || 'converted'}.png`
            link.href = pngUrl
            link.click()

            setIsConverting(false)
            setIsDownloaded(true)
            setTimeout(() => setIsDownloaded(false), 3000)
            URL.revokeObjectURL(url)
        }

        img.src = url
    }, [svgContent, width, fileName])

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file && file.type === 'image/svg+xml') {
            const reader = new FileReader()
            reader.onload = (event) => {
                const content = event.target?.result as string
                setSvgContent(content)
                setFileName(file.name.replace('.svg', ''))
                const blob = new Blob([content], { type: 'image/svg+xml' })
                setPreviewUrl(URL.createObjectURL(blob))
            }
            reader.readAsText(file)
        }
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
            <div className="container relative z-10 max-w-6xl mx-auto px-4 space-y-12">
                {/* Header */}
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2"
                    >
                        <Layers className="h-4 w-4" />
                        Vector to Pixel Perfect
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">SVG to PNG</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Convert your SVG files to high-quality PNG images instantly.
                        No limits, no uploads, purely client-side.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Workspace */}
                    <div className="lg:col-span-8 space-y-6">
                        {!svgContent ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className="relative group cursor-pointer"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-[2.5rem] blur-2xl group-hover:opacity-100 transition duration-500 opacity-50" />
                                <div className="relative h-[450px] bg-background/50 backdrop-blur-xl border-2 border-dashed border-border group-hover:border-primary/50 rounded-[2rem] flex flex-col items-center justify-center space-y-6 transition-all duration-300">
                                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <Upload className="h-10 w-10 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold mb-2">Drop your SVG file here</h3>
                                        <p className="text-muted-foreground text-sm">or click to browse from your computer</p>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept=".svg"
                                        className="hidden"
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-3xl" />
                                    <div className="relative aspect-square md:aspect-video bg-muted/30 border-2 border-border rounded-[2rem] overflow-hidden flex items-center justify-center p-12">
                                        {/* Light/Dark Toggle background for preview could be added here */}
                                        <img
                                            src={previewUrl!}
                                            alt="SVG Preview"
                                            className="max-w-full max-h-full drop-shadow-2xl"
                                        />

                                        <div className="absolute top-6 right-6 flex gap-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => setSvgContent(null)}
                                                className="rounded-full bg-background/80 backdrop-blur-md border border-border"
                                            >
                                                Change File
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <canvas ref={canvasRef} className="hidden" />
                            </motion.div>
                        )}
                    </div>

                    {/* Controls Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 bg-card border-2 border-border rounded-[2rem] shadow-2xl space-y-8">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <RefreshCw className="h-5 w-5 text-primary" />
                                    Export Settings
                                </h3>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
                                            Target Width (px)
                                            <span className="text-primary">{width}px</span>
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range"
                                                min="100"
                                                max="4000"
                                                value={width}
                                                onChange={(e) => setWidth(parseInt(e.target.value))}
                                                className="flex-1 accent-primary"
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 mt-2">
                                            {[512, 1024, 2048].map(w => (
                                                <button
                                                    key={w}
                                                    onClick={() => setWidth(w)}
                                                    className={cn(
                                                        "py-1.5 text-[10px] font-bold rounded-lg border transition-all",
                                                        width === w ? "bg-primary/10 border-primary text-primary" : "bg-muted/50 border-transparent text-muted-foreground"
                                                    )}
                                                >
                                                    {w}px
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-4 border-t border-border">
                                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Format</label>
                                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50 border border-border">
                                            <ImageIcon className="h-4 w-4 text-primary" />
                                            <div className="flex-1 text-sm font-semibold">PNG Image</div>
                                            <Check className="h-4 w-4 text-green-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={convertToPng}
                                disabled={!svgContent || isConverting}
                                className={cn(
                                    "w-full h-16 rounded-2xl text-lg font-bold shadow-xl transition-all duration-300",
                                    isDownloaded ? "bg-green-500 hover:bg-green-600 shadow-green-500/20" : "shadow-primary/20"
                                )}
                            >
                                <AnimatePresence mode="wait">
                                    {isConverting ? (
                                        <motion.div key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                            <RefreshCw className="h-5 w-5 animate-spin" />
                                            Converting...
                                        </motion.div>
                                    ) : isDownloaded ? (
                                        <motion.div key="d" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                                            <Check className="h-5 w-5" />
                                            Done!
                                        </motion.div>
                                    ) : (
                                        <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                            <Download className="h-5 w-5" />
                                            Export to PNG
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </div>

                        {/* Pro Badge */}
                        <div className="group relative p-6 bg-gradient-to-br from-violet-600/10 to-blue-600/10 border border-primary/20 rounded-[2rem] overflow-hidden">
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            <div className="relative space-y-2">
                                <h4 className="flex items-center gap-2 text-sm font-bold">
                                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                                    Why PNG?
                                </h4>
                                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                                    PNGs are perfect for web assets that need transparent backgrounds.
                                    By increasing the width, your pixelated edges will remain sharp.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
