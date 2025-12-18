"use client"

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    FileJson,
    Copy,
    Check,
    Trash2,
    ClipboardPaste,
    ArrowRightLeft,
    Zap,
    AlertCircle,
    Table,
    RefreshCw,
    Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function CsvJsonContent() {
    const [csv, setCsv] = useState('')
    const [json, setJson] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)
    const [isConverting, setIsConverting] = useState(false)

    const convertToJson = useCallback(() => {
        if (!csv) return
        setIsConverting(true)
        setError(null)

        setTimeout(() => {
            try {
                const lines = csv.split('\n').filter(line => line.trim() !== '')
                if (lines.length < 2) {
                    setError('CSV must have at least a header and one row of data.')
                    setIsConverting(false)
                    return
                }

                const headers = lines[0].split(',').map(h => h.trim())
                const result = lines.slice(1).map(line => {
                    const obj: any = {}
                    const currentLine = line.split(',')
                    headers.forEach((header, i) => {
                        obj[header] = currentLine[i]?.trim() || ''
                    })
                    return obj
                })

                setJson(JSON.stringify(result, null, 2))
                setIsConverting(false)
            } catch (err) {
                setError('Invalid CSV format. Please ensure it is comma-separated.')
                setIsConverting(false)
            }
        }, 500)
    }, [csv])

    const handleCopy = useCallback(async () => {
        if (!json) return
        await navigator.clipboard.writeText(json)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [json])

    const handlePaste = useCallback(async () => {
        try {
            const clipboardText = await navigator.clipboard.readText()
            setCsv(clipboardText)
        } catch (err) {
            console.error('Failed to read clipboard', err)
        }
    }, [])

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
            <div className="container relative z-10 max-w-7xl mx-auto px-4 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2"
                    >
                        <Table className="h-4 w-4" />
                        Data Structuring
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight tracking-tight uppercase">CSV <span className="text-primary">to</span> JSON</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                        Cleanly parse CSV data into structured JSON objects.
                        Perfect for developers needing to import spreadsheet data into applications.
                    </p>
                </header>

                <div className="grid lg:grid-cols-11 gap-4 items-center">
                    {/* Input */}
                    <div className="lg:col-span-5">
                        <div className="bg-card border-2 border-border rounded-[2rem] overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                                        <Table className="h-4 w-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">CSV Data</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={handlePaste} className="h-8 text-[10px] font-bold uppercase tracking-tight">Paste</Button>
                                    <Button variant="ghost" size="sm" onClick={() => { setCsv(''); setJson(''); setError(null); }} className="h-8 text-[10px] font-bold uppercase tracking-tight hover:text-red-500">Clear</Button>
                                </div>
                            </div>
                            <textarea
                                value={csv}
                                onChange={(e) => setCsv(e.target.value)}
                                placeholder="name, email, role\nJohn Doe, john@example.com, Admin"
                                className="w-full h-[400px] p-8 bg-transparent outline-none text-sm font-mono leading-relaxed resize-none custom-scrollbar"
                            />
                        </div>
                    </div>

                    {/* Middle Button */}
                    <div className="lg:col-span-1 flex justify-center">
                        <Button
                            onClick={convertToJson}
                            disabled={!csv || isConverting}
                            className="rounded-full w-14 h-14 shadow-2xl shadow-primary/40 rotate-90 lg:rotate-0"
                        >
                            {isConverting ? <RefreshCw className="h-6 w-6 animate-spin" /> : <ArrowRightLeft className="h-6 w-6" />}
                        </Button>
                    </div>

                    {/* Output */}
                    <div className="lg:col-span-5">
                        <div className="bg-[#1e1e1e] border-2 border-white/5 rounded-[2rem] overflow-hidden shadow-2xl relative">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                        <FileJson className="h-4 w-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Modern JSON</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!json} className="h-8 text-[10px] font-bold uppercase tracking-tight text-white/50 hover:bg-white/10">
                                        {copied ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </Button>
                                </div>
                            </div>
                            {error ? (
                                <div className="h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-4">
                                    <div className="p-4 rounded-3xl bg-red-500/10">
                                        <AlertCircle className="h-8 w-8 text-red-500" />
                                    </div>
                                    <p className="text-red-400 font-bold text-sm">{error}</p>
                                </div>
                            ) : (
                                <pre className="w-full h-[400px] p-8 text-sm font-mono leading-relaxed overflow-auto custom-scrollbar text-white/80">
                                    {json || '// JSON array will appear here...'}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-8 bg-muted/20 border border-border rounded-3xl space-y-4">
                        <Zap className="h-6 w-6 text-primary" />
                        <h4 className="font-bold">Lightning Fast</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Process thousands of rows in milliseconds. Optimized for large dataset handling in-browser.
                        </p>
                    </div>
                    <div className="p-8 bg-muted/20 border border-border rounded-3xl space-y-4">
                        <Table className="h-6 w-6 text-primary" />
                        <h4 className="font-bold">Header Detection</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Automatically uses the first row as object keys, ensuring your JSON is immediately ready for use.
                        </p>
                    </div>
                    <div className="p-8 bg-muted/20 border border-border rounded-3xl space-y-4">
                        <Download className="h-6 w-6 text-primary" />
                        <h4 className="font-bold">Secure Workflows</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            No data ever leaves your computer. We believe in 100% privacy for your sensitive CSV data.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
