"use client"

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    Image as ImageIcon,
    Copy,
    Check,
    Trash2,
    Upload,
    Code,
    Zap,
    Download,
    RefreshCw,
    X,
    FileImage,
    FileCode
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Base64ImageContent() {
    const [base64, setBase64] = useState('')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [copied, setCopied] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileUpload = (file: File) => {
        if (!file.type.startsWith('image/')) return
        setIsProcessing(true)

        const reader = new FileReader()
        reader.onload = (e) => {
            const b64 = e.target?.result as string
            setBase64(b64)
            setPreviewUrl(b64)
            setIsProcessing(false)
        }
        reader.readAsDataURL(file)
    }

    const handleBase64Change = (val: string) => {
        setBase64(val)
        if (val.startsWith('data:image')) {
            setPreviewUrl(val)
        } else {
            setPreviewUrl(null)
        }
    }

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(base64)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [base64])

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
            <div className="container relative z-10 max-w-6xl mx-auto px-4 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2"
                    >
                        <FileCode className="h-4 w-4" />
                        Code-First Images
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight tracking-tight uppercase">Base64 <span className="text-primary">Image</span></h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                        Convert images to Base64 data URIs or decode Base64 strings back to images.
                        Useful for embedding small icons and assets directly in CSS/HTML.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Side: Upload & Preview */}
                    <div className="lg:col-span-12">
                        <div className="bg-card border-2 border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-8">
                            {!previewUrl ? (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="h-64 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center space-y-4 cursor-pointer hover:border-primary/50 transition-colors group"
                                >
                                    <div className="p-4 rounded-2xl bg-primary/10 group-hover:scale-110 transition-transform">
                                        <Upload className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold">Drop image or click to convert</p>
                                        <p className="text-xs text-muted-foreground mt-1">Supports PNG, JPG, WEBP, SVG</p>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                                    />
                                </div>
                            ) : (
                                <div className="grid lg:grid-cols-2 gap-8 items-center">
                                    <div className="aspect-square bg-muted/30 rounded-3xl overflow-hidden flex items-center justify-center relative border border-border">
                                        <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="absolute top-4 right-4 rounded-full h-10 w-10 bg-background/80 backdrop-blur"
                                            onClick={() => { setPreviewUrl(null); setBase64(''); }}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-black uppercase tracking-widest text-primary">Data URI</h4>
                                                <Button size="sm" onClick={handleCopy} className="rounded-xl h-9 gap-2">
                                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                    {copied ? 'Copied' : 'Copy String'}
                                                </Button>
                                            </div>
                                            <div className="bg-[#1e1e1e] border-2 border-white/5 rounded-2xl p-4 overflow-hidden shadow-xl">
                                                <textarea
                                                    value={base64}
                                                    onChange={(e) => handleBase64Change(e.target.value)}
                                                    className="w-full h-48 bg-transparent outline-none text-[10px] font-mono leading-tight text-blue-300 resize-none custom-scrollbar break-all"
                                                />
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="flex-1 p-4 bg-muted/30 rounded-2xl">
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">String Length</p>
                                                    <p className="text-lg font-black font-mono">{base64.length.toLocaleString()}</p>
                                                </div>
                                                <div className="flex-1 p-4 bg-muted/30 rounded-2xl">
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Est. Size</p>
                                                    <p className="text-lg font-black font-mono">{(base64.length / 1024).toFixed(1)} KB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
                        <FileCode className="h-6 w-6 text-primary" />
                        <h4 className="font-bold text-sm">Inline Assets</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Reduce HTTP requests by embedding small images directly in your CSS or HTML via data URIs.
                        </p>
                    </div>
                    <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
                        <Zap className="h-6 w-6 text-primary" />
                        <h4 className="font-bold text-sm">Universal Support</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Base64 is supported by all modern browsers and is perfect for small SVG icons or tiny logos.
                        </p>
                    </div>
                    <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
                        <ImageIcon className="h-6 w-6 text-primary" />
                        <h4 className="font-bold text-sm">Reverse Decode</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Paste a Base64 string into the box to instantly visualize and download the corresponding image.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
