"use client"

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    Type,
    Copy,
    Check,
    Trash2,
    ClipboardPaste,
    RefreshCw,
    ChevronRight,
    Sparkles,
    Zap,
    Scale
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const TRANSFORMATIONS = [
    { id: 'uppercase', label: 'UPPERCASE', example: 'HELLO WORLD', fn: (s: string) => s.toUpperCase() },
    { id: 'lowercase', label: 'lowercase', example: 'hello world', fn: (s: string) => s.toLowerCase() },
    { id: 'titlecase', label: 'Title Case', example: 'Hello World', fn: (s: string) => s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()) },
    { id: 'sentencecase', label: 'Sentence case', example: 'Hello world.', fn: (s: string) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()) },
    { id: 'camelcase', label: 'camelCase', example: 'helloWorld', fn: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
    { id: 'pascalcase', label: 'PascalCase', example: 'HelloWorld', fn: (s: string) => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (w) => w.toUpperCase()).replace(/\s+/g, '') },
    { id: 'snakecase', label: 'snake_case', example: 'hello_world', fn: (s: string) => s.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') },
    { id: 'kebabcase', label: 'kebab-case', example: 'hello-world', fn: (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') },
    { id: 'constantcase', label: 'CONSTANT_CASE', example: 'HELLO_WORLD', fn: (s: string) => s.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '') },
    { id: 'alternating', label: 'aLtErNaTiNg', example: 'hElLo wOrLd', fn: (s: string) => s.split('').map((c, i) => i % 2 ? c.toUpperCase() : c.toLowerCase()).join('') },
]

export default function CaseConverterContent() {
    const [text, setText] = useState('')
    const [copied, setCopied] = useState(false)
    const [lastAction, setLastAction] = useState<string | null>(null)

    const stats = useMemo(() => {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0
        const chars = text.length
        const lines = text.trim() ? text.split('\n').length : 0
        return { words, chars, lines }
    }, [text])

    const applyTransformation = useCallback((id: string, fn: (s: string) => string) => {
        if (!text) return
        setText(fn(text))
        setLastAction(id)
        setTimeout(() => setLastAction(null), 2000)
    }, [text])

    const handleCopy = useCallback(async () => {
        if (!text) return
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [text])

    const handlePaste = useCallback(async () => {
        try {
            const clipboardText = await navigator.clipboard.readText()
            setText(clipboardText)
        } catch (err) {
            console.error('Failed to read clipboard', err)
        }
    }, [])

    const handleClear = () => setText('')

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container relative z-10 max-w-6xl mx-auto px-4 space-y-8">
                {/* Header */}
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2"
                    >
                        <Zap className="h-3 w-3 animate-pulse" />
                        Lighting Fast Case Converter
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent"
                    >
                        Case Converter
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground max-w-xl mx-auto"
                    >
                        Switch between UPPERCASE, lowercase, camelCase, and more in a blink.
                        Smart, smooth, and privacy-focused.
                    </motion.p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Main Input Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-8 space-y-4"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

                            <div className="relative bg-background/80 backdrop-blur-xl border-2 border-border group-focus-within:border-primary/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl">
                                {/* Toolbar */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5 px-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                                            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                                        </div>
                                        <span className="text-xs font-semibold text-muted-foreground ml-2 uppercase tracking-widest">Input Text</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handlePaste}
                                            className="h-8 gap-2 text-xs hover:bg-primary/10 hover:text-primary"
                                        >
                                            <ClipboardPaste className="h-3.5 w-3.5" />
                                            Paste
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleClear}
                                            disabled={!text}
                                            className="h-8 gap-2 text-xs hover:bg-red-500/10 hover:text-red-500"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                            Clear
                                        </Button>
                                    </div>
                                </div>

                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Enter your text here to transform it..."
                                    className="w-full h-[400px] p-6 bg-transparent resize-none outline-none text-lg leading-relaxed font-medium placeholder:text-muted-foreground/30 custom-scrollbar"
                                />

                                {/* Footer Stats */}
                                <div className="flex items-center justify-between px-6 py-4 bg-muted/20 border-t border-border">
                                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Type className="h-3.5 w-3.5" />
                                            <span>{stats.chars} <span className="opacity-50">Chars</span></span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Sparkles className="h-3.5 w-3.5" />
                                            <span>{stats.words} <span className="opacity-50">Words</span></span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Scale className="h-3.5 w-3.5" />
                                            <span>{stats.lines} <span className="opacity-50">Lines</span></span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleCopy}
                                        disabled={!text}
                                        className={cn(
                                            "rounded-xl px-6 transition-all duration-300 shadow-lg",
                                            copied
                                                ? "bg-green-500 hover:bg-green-600 text-white shadow-green-500/20"
                                                : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20"
                                        )}
                                    >
                                        <AnimatePresence mode="wait">
                                            {copied ? (
                                                <motion.div
                                                    key="check"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Check className="h-4 w-4" />
                                                    Copied
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="copy"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Copy className="h-4 w-4" />
                                                    Copy Text
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Controls Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-4"
                    >
                        <div className="sticky top-24 space-y-6">
                            <div className="p-6 bg-card border-2 border-border rounded-3xl shadow-xl space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <RefreshCw className="h-5 w-5 text-primary" />
                                        Transform
                                    </h3>
                                    {lastAction && (
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider animate-bounce">
                                            Applied!
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-2.5">
                                    {TRANSFORMATIONS.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => applyTransformation(t.id, t.fn)}
                                            disabled={!text}
                                            className={cn(
                                                "group flex flex-col items-start px-4 py-3 rounded-2xl border transition-all duration-200 text-left",
                                                lastAction === t.id
                                                    ? "bg-primary/10 border-primary/50 text-primary"
                                                    : "bg-muted/50 border-transparent hover:border-primary/30 hover:bg-primary/5"
                                            )}
                                        >
                                            <div className="w-full flex items-center justify-between mb-0.5">
                                                <span className="font-bold text-sm tracking-tight">{t.label}</span>
                                                <ChevronRight className={cn(
                                                    "h-4 w-4 transition-transform group-hover:translate-x-1",
                                                    lastAction === t.id ? "text-primary" : "text-muted-foreground/50"
                                                )} />
                                            </div>
                                            <span className="text-[10px] font-medium text-muted-foreground/60 group-hover:text-primary/60 transition-colors uppercase tracking-widest italic">
                                                {t.example}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Info Card */}
                            <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl">
                                <h4 className="flex items-center gap-2 text-sm font-bold mb-2">
                                    <Sparkles className="h-4 w-4 text-primary" />
                                    Pro Tip
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Use <b>camelCase</b> or <b>PascalCase</b> for programming variables, and <b>CONSTANT_CASE</b> for environment variables.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
