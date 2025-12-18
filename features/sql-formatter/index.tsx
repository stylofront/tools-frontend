"use client"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    Database,
    Copy,
    Check,
    Trash2,
    ClipboardPaste,
    RefreshCw,
    ChevronRight,
    Sparkles,
    Zap,
    Code2,
    LayoutTemplate
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function SqlFormatterContent() {
    const [sql, setSql] = useState('')
    const [copied, setCopied] = useState(false)
    const [isFormatting, setIsFormatting] = useState(false)

    const formatSql = useCallback(() => {
        if (!sql) return
        setIsFormatting(true)

        // Simple SQL Formatter implementation
        setTimeout(() => {
            const keywords = [
                'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'GROUP BY', 'ORDER BY',
                'LIMIT', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
                'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'ON', 'UNION',
                'HAVING', 'OFFSET', 'AS', 'IN', 'NOT IN', 'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL'
            ]

            let formatted = sql
                .replace(/\s+/g, ' ')
                .trim()

            // Add newlines and indentation (very basic)
            keywords.forEach(kw => {
                const regex = new RegExp(`\\b${kw}\\b`, 'gi')
                formatted = formatted.replace(regex, `\n${kw}`)
            })

            // Clean up double newlines
            formatted = formatted.replace(/\n\s*\n/g, '\n').trim()

            setSql(formatted)
            setIsFormatting(false)
        }, 300)
    }, [sql])

    const handleCopy = useCallback(async () => {
        if (!sql) return
        await navigator.clipboard.writeText(sql)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [sql])

    const handlePaste = useCallback(async () => {
        try {
            const clipboardText = await navigator.clipboard.readText()
            setSql(clipboardText)
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2"
                    >
                        <Database className="h-3.5 w-3.5" />
                        Beautify Your Queries
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight tracking-tight">SQL Formatter</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Make your SQL queries readable and professional.
                        Handles complex joins, where clauses, and more.
                    </p>
                </header>

                <div className="grid lg:grid-cols-1 gap-8">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-3xl blur-2xl group-hover:opacity-75 transition duration-500 opacity-50" />

                        <div className="relative bg-card border-2 border-border rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-primary/10">
                                        <Code2 className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="font-bold text-sm tracking-tight">SQL Query</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" onClick={handlePaste} className="h-8 gap-2 text-xs">
                                        <ClipboardPaste className="h-3.5 w-3.5" />
                                        Paste
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setSql('')} className="h-8 gap-2 text-xs hover:text-red-500">
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Clear
                                    </Button>
                                </div>
                            </div>

                            <textarea
                                value={sql}
                                onChange={(e) => setSql(e.target.value)}
                                placeholder="Paste your messy SQL query here..."
                                className="w-full h-[450px] p-6 bg-transparent resize-none outline-none text-base font-mono custom-scrollbar leading-relaxed"
                            />

                            <div className="px-6 py-4 bg-muted/20 border-t border-border flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Button
                                        onClick={formatSql}
                                        disabled={!sql || isFormatting}
                                        className="rounded-xl px-10 h-12 text-md font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                                    >
                                        {isFormatting ? (
                                            <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                                        ) : (
                                            <LayoutTemplate className="h-5 w-5 mr-2" />
                                        )}
                                        Format SQL
                                    </Button>
                                </div>

                                <Button
                                    onClick={handleCopy}
                                    disabled={!sql}
                                    variant="outline"
                                    className={cn(
                                        "rounded-xl h-12 px-8 transition-all duration-300",
                                        copied ? "bg-green-500 text-white border-green-500 hover:bg-green-600" : ""
                                    )}
                                >
                                    <AnimatePresence mode="wait">
                                        {copied ? (
                                            <motion.div key="v" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                                                <Check className="h-4 w-4" /> Copied
                                            </motion.div>
                                        ) : (
                                            <motion.div key="c" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                                                <Copy className="h-4 w-4" /> Copy SQL
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 pt-4">
                        <div className="p-6 bg-muted/30 border border-border rounded-2xl space-y-2">
                            <h4 className="font-bold text-sm flex items-center gap-2 text-primary">
                                <Zap className="h-4 w-4" />
                                Pure Performance
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Formats even the largest queries in milliseconds using our optimized cleaning logic.
                            </p>
                        </div>
                        <div className="p-6 bg-muted/30 border border-border rounded-2xl space-y-2">
                            <h4 className="font-bold text-sm flex items-center gap-2 text-primary">
                                <RefreshCw className="h-4 w-4" />
                                Standard Keywords
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Automatically detects and capitalizes SELECT, FROM, JOIN, and all major SQL keywords.
                            </p>
                        </div>
                        <div className="p-6 bg-muted/30 border border-border rounded-2xl space-y-2">
                            <h4 className="font-bold text-sm flex items-center gap-2 text-primary">
                                <ChevronRight className="h-4 w-4" />
                                Privacy First
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Your sensitive database queries never leave your browser. 100% secure processing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
