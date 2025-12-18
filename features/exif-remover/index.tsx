"use client"

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    EyeOff,
    Download,
    Upload,
    Check,
    Zap,
    Shield,
    Trash2,
    FileImage,
    Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ExifRemoverContent() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isDone, setIsDone] = useState(false)
    const [fileName, setFileName] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) return

        setFileName(file.name)
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
                    // Drawing to canvas naturally strips most EXIF data
                    ctx.drawImage(img, 0, 0)
                    const cleanDataUrl = canvas.toDataURL(file.type)
                    setPreviewUrl(cleanDataUrl)
                    setIsProcessing(false)
                    setIsDone(true)
                }
            }
            img.src = e.target?.result as string
        }
        reader.readAsDataURL(file)
    }

    const handleDownload = () => {
        if (!previewUrl) return
        const link = document.createElement('a')
        link.download = `clean-${fileName}`
        link.href = previewUrl
        link.click()
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
            <div className="container relative z-10 max-w-4xl mx-auto px-4 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2"
                    >
                        <Shield className="h-4 w-4" />
                        Privacy First Images
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">EXIF Remover</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Strip metadata, location tags, and camera info from your photos.
                        Keep your privacy intact before sharing online.
                    </p>
                </header>

                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-[2.5rem] blur opacity-50" />
                    <div className="relative bg-card border-2 border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                        {!previewUrl ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="h-64 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center space-y-4 cursor-pointer hover:border-primary/50 transition-colors group"
                            >
                                <div className="p-4 rounded-2xl bg-primary/10 group-hover:scale-110 transition-transform">
                                    <Upload className="h-8 w-8 text-primary" />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold">Drop image or click to upload</p>
                                    <p className="text-xs text-muted-foreground mt-1">Strips all sensitive metadata automatically</p>
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
                                <div className="aspect-video bg-muted/30 rounded-3xl overflow-hidden flex items-center justify-center relative">
                                    <img src={previewUrl} alt="Preview" className="max-w-full max-h-full" />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <Button size="icon" variant="secondary" className="rounded-full h-10 w-10 bg-background/80 backdrop-blur" onClick={() => setPreviewUrl(null)}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-muted/30 rounded-3xl">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-2xl bg-green-500/10 text-green-500">
                                            <Check className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Metadata Stripped</p>
                                            <p className="text-xs text-muted-foreground">Location, Camera, and Device data removed.</p>
                                        </div>
                                    </div>
                                    <Button onClick={handleDownload} className="w-full md:w-auto h-12 px-8 rounded-xl shadow-lg shadow-primary/20">
                                        <Download className="h-4 w-4 mr-2" /> Download Clean Image
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl space-y-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <EyeOff className="h-5 w-5" />
                        </div>
                        <h4 className="font-bold text-sm">Location Privacy</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Prevents people from finding your exact GPS coordinates where the photo was taken.
                        </p>
                    </div>
                    <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl space-y-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <FileImage className="h-5 w-5" />
                        </div>
                        <h4 className="font-bold text-sm">Smaller Size</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Exif data can take up to 64KB per image. Stripping it makes your files lean.
                        </p>
                    </div>
                    <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl space-y-3">
                        <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <Info className="h-5 w-5" />
                        </div>
                        <h4 className="font-bold text-sm">Tech Details</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Removes Camera model, lens settings, software version, and timestamps.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
