"use client"

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    Minimize,
    Copy,
    Check,
    Trash2,
    ClipboardPaste,
    Zap,
    Code2,
    Hash,
    Sparkles,
    FileCode,
    RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Language = 'javascript' | 'css' | 'html'

export default function CodeMinifierContent() {
    const [code, setCode] = useState('')
    const [type, setType] = useState<Language>('javascript')
    const [copied, setCopied] = useState(false)
    const [isMinifying, setIsMinifying] = useState(false)

    const minify = useCallback(() => {
        if (!code) return
        setIsMinifying(true)

        setTimeout(() => {
            let result = code
            if (type === 'javascript' || type === 'css') {
                // Simple regex-based minifier
                result = result
                    .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '') // Remove comments
                    .replace(/\s+/g, ' ') // Collapse whitespace
                    .replace(/\s*([\{\}\[\]\(\):;,\+\-\*\/=><!&\|])\s*/g, '$1') // Remove spaces around operators
                    .trim()
            } else if (type === 'html') {
                result = result
                    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
                    .replace(/\s+/g, ' ') // Collapse whitespace
                    .replace(/>\s+</g, '><') // Remove spaces between tags
                    .trim()
            }
            setCode(result)
            setIsMinifying(false)
        }, 300)
    }, [code, type])

    const stats = useMemo(() => {
        if (!code) return { size: 0, lines: 0 }
        return {
            size: new Blob([code]).size,
            lines: code.split('\n').length
        }
    }, [code])

    const handleCopy = useCallback(async () => {
        if (!code) return
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [code])

    const handlePaste = useCallback(async () => {
        try {
            const clipboardText = await navigator.clipboard.readText()
            setCode(clipboardText)
        } catch (err) {
            console.error('Failed to read clipboard', err)
        }
    }, [])

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
            <div className="container relative z-10 max-w-6xl mx-auto px-4 space-y-12">
                {/* Header */}
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2"
                    >
                        <Minimize className="h-4 w-4" />
                        Extreme Code Compression
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight tracking-tight">Code Minifier</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Compress your JavaScript, CSS, and HTML instantly.
                        Optimize your web assets for production without any external dependencies.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Main Area */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="relative bg-card border-2 border-border rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                                <div className="flex items-center gap-4">
                                    {(['javascript', 'css', 'html'] as const).map(l => (
                                        <button
                                            key={l}
                                            onClick={() => setType(l)}
                                            className={cn(
                                                "text-xs font-bold uppercase tracking-widest transition-colors",
                                                type === l ? "text-primary" : "text-muted-foreground/50 hover:text-muted-foreground"
                                            )}
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" onClick={handlePaste} className="h-8 gap-2 text-xs">
                                        <ClipboardPaste className="h-3.5 w-3.5" /> Paste
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setCode('')} className="h-8 gap-2 text-xs hover:text-red-500">
                                        <Trash2 className="h-3.5 w-3.5" /> Clear
                                    </Button>
                                </div>
                            </div>

                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder={`Paste your ${type.toUpperCase()} code here...`}
                                className="w-full h-[400px] p-6 bg-transparent resize-none outline-none text-sm font-mono custom-scrollbar leading-relaxed"
                            />

                            <div className="px-6 py-4 bg-muted/20 border-t border-border flex items-center justify-between">
                                <div className="flex items-center gap-6 text-xs font-bold text-muted-foreground">
                                    <div className="flex flex-col">
                                        <span className="opacity-50 uppercase tracking-widest text-[9px]">Size</span>
                                        <span className="text-primary font-mono">{(stats.size / 1024).toFixed(2)} KB</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="opacity-50 uppercase tracking-widest text-[9px]">Lines</span>
                                        <span className="text-foreground font-mono">{stats.lines}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        onClick={minify}
                                        disabled={!code || isMinifying}
                                        className="rounded-xl px-6"
                                    >
                                        {isMinifying ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4 mr-2" />}
                                        Minify Now
                                    </Button>
                                    <Button
                                        onClick={handleCopy}
                                        disabled={!code}
                                        variant="outline"
                                        className={cn(
                                            "rounded-xl px-4",
                                            copied ? "bg-green-500 text-white" : ""
                                        )}
                                    >
                                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-6 bg-card border-2 border-border rounded-3xl shadow-xl space-y-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                Features
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30">
                                    <Hash className="h-5 w-5 text-primary shrink-0" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold">Comment Removal</p>
                                        <p className="text-xs text-muted-foreground">Strips all block and line comments to save bandwidth.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30">
                                    <Code2 className="h-5 w-5 text-primary shrink-0" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold">Whitespace Compression</p>
                                        <p className="text-xs text-muted-foreground">Flattens code and removes unnecessary indentation.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30">
                                    <FileCode className="h-5 w-5 text-primary shrink-0" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold">Multi-format</p>
                                        <p className="text-xs text-muted-foreground">Supports JS, CSS, and HTML with specialized routines.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl">
                            <h4 className="flex items-center gap-2 text-sm font-bold mb-2">
                                <Zap className="h-4 w-4 text-primary" />
                                Pro Optimization
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Minifying assets can reduce page load times by up to <b>30%</b>. Use this tool before shipping to production.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
