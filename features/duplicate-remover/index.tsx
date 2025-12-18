"use client"

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    Scissors,
    Copy,
    Check,
    Trash2,
    ClipboardPaste,
    SortAsc,
    SortDesc,
    Filter,
    FileText,
    Zap,
    Settings2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function DuplicateRemoverContent() {
    const [text, setText] = useState('')
    const [copied, setCopied] = useState(false)
    const [options, setOptions] = useState({
        caseSensitive: true,
        trimLines: true,
        removeEmpty: true,
    })

    const result = useMemo(() => {
        if (!text) return { lines: [], count: 0, originalCount: 0 }

        let lines = text.split('\n')
        const originalCount = lines.length

        if (options.trimLines) {
            lines = lines.map(l => l.trim())
        }

        if (options.removeEmpty) {
            lines = lines.filter(l => l.length > 0)
        }

        const seen = new Set<string>()
        const uniqueLines: string[] = []

        for (const line of lines) {
            const compareLine = options.caseSensitive ? line : line.toLowerCase()
            if (!seen.has(compareLine)) {
                seen.add(compareLine)
                uniqueLines.push(line)
            }
        }

        return {
            lines: uniqueLines,
            count: uniqueLines.length,
            originalCount
        }
    }, [text, options])

    const handleCopy = useCallback(async () => {
        if (result.lines.length === 0) return
        await navigator.clipboard.writeText(result.lines.join('\n'))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [result])

    const handleSort = (direction: 'asc' | 'desc') => {
        const sorted = [...result.lines].sort((a, b) => {
            return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
        })
        setText(sorted.join('\n'))
    }

    const handlePaste = useCallback(async () => {
        try {
            const clipboardText = await navigator.clipboard.readText()
            setText(clipboardText)
        } catch (err) {
            console.error('Failed to read clipboard', err)
        }
    }, [])

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
            <div className="container relative z-10 max-w-6xl mx-auto px-4 space-y-8">
                {/* Header */}
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2"
                    >
                        <Scissors className="h-3.5 w-3.5" />
                        Clean & Precise
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">Duplicate Remover</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Remove identical lines from your text lists instantly. Perfect for cleaning up logs, lists, and code.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Input side */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="relative bg-card border-2 border-border rounded-3xl overflow-hidden shadow-2xl group focus-within:border-primary/30 transition-all duration-300">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-primary/10">
                                        <FileText className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="font-bold text-sm tracking-tight">Your Lines</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" onClick={handlePaste} className="h-8 gap-2 text-xs">
                                        <ClipboardPaste className="h-3.5 w-3.5" />
                                        Paste
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setText('')} className="h-8 gap-2 text-xs hover:text-red-500">
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Clear
                                    </Button>
                                </div>
                            </div>

                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Paste your lines here, one per line..."
                                className="w-full h-[450px] p-6 bg-transparent resize-none outline-none text-base font-mono custom-scrollbar"
                            />

                            <div className="px-6 py-4 bg-muted/20 border-t border-border flex flex-wrap gap-4 items-center justify-between">
                                <div className="flex gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Original</span>
                                        <span className="text-lg font-black">{result.originalCount}</span>
                                    </div>
                                    <div className="w-px h-8 bg-border" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Unique</span>
                                        <span className="text-lg font-black text-primary">{result.count}</span>
                                    </div>
                                    <div className="w-px h-8 bg-border" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Removed</span>
                                        <span className="text-lg font-black text-red-500">{result.originalCount - result.count}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleCopy}
                                    disabled={result.count === 0}
                                    className={cn(
                                        "rounded-xl px-8 shadow-lg transition-all duration-300",
                                        copied ? "bg-green-500 hover:bg-green-600 shadow-green-500/20" : "shadow-primary/20"
                                    )}
                                >
                                    <AnimatePresence mode="wait">
                                        {copied ? (
                                            <motion.div key="v" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                                                <Check className="h-4 w-4" /> Copied {result.count} Lines
                                            </motion.div>
                                        ) : (
                                            <motion.div key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                                                <Copy className="h-4 w-4" /> Copy Result
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Controls */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-6 bg-card border-2 border-border rounded-3xl shadow-xl space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Settings2 className="h-5 w-5 text-primary" />
                                    Parameters
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/50">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-bold">Case Sensitive</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">A != a</p>
                                        </div>
                                        <button
                                            onClick={() => setOptions(prev => ({ ...prev, caseSensitive: !prev.caseSensitive }))}
                                            className={cn(
                                                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                                options.caseSensitive ? "bg-primary" : "bg-muted"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out",
                                                    options.caseSensitive ? "translate-x-5" : "translate-x-0"
                                                )}
                                            />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/50">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-bold">Trim Whitespace</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Remove surrounding spaces</p>
                                        </div>
                                        <button
                                            onClick={() => setOptions(prev => ({ ...prev, trimLines: !prev.trimLines }))}
                                            className={cn(
                                                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                                options.trimLines ? "bg-primary" : "bg-muted"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out",
                                                    options.trimLines ? "translate-x-5" : "translate-x-0"
                                                )}
                                            />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/50">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-bold">Ignore Empty</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Remove blank lines</p>
                                        </div>
                                        <button
                                            onClick={() => setOptions(prev => ({ ...prev, removeEmpty: !prev.removeEmpty }))}
                                            className={cn(
                                                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                                options.removeEmpty ? "bg-primary" : "bg-muted"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out",
                                                    options.removeEmpty ? "translate-x-5" : "translate-x-0"
                                                )}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-primary" />
                                    Actions
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="outline"
                                        className="rounded-xl h-12 gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                                        onClick={() => handleSort('asc')}
                                    >
                                        <SortAsc className="h-4 w-4" />
                                        Sort A-Z
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="rounded-xl h-12 gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                                        onClick={() => handleSort('desc')}
                                    >
                                        <SortDesc className="h-4 w-4" />
                                        Sort Z-A
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl flex items-start gap-4">
                            <Zap className="h-6 w-6 text-primary shrink-0 animate-pulse" />
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold">Lightning Processing</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Our cleaning engine processes thousands of lines instantly right in your browser. No data leaves your machine.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
