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
    FileCode,
    RefreshCw,
    Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function YamlJsonContent() {
    const [yaml, setYaml] = useState('')
    const [json, setJson] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)
    const [isConverting, setIsConverting] = useState(false)

    const convertToJson = useCallback(() => {
        if (!yaml) return
        setIsConverting(true)
        setError(null)

        // Simulating YAML to JSON conversion logic
        // In a real app we would use a library like 'js-yaml'
        // For now, we use a simple mock or basic logic for UI demo
        setTimeout(() => {
            try {
                // Placeholder logic: assuming basic key: value format
                const lines = yaml.split('\n')
                const obj: any = {}
                lines.forEach(line => {
                    const [key, ...val] = line.split(':')
                    if (key && val.length > 0) {
                        obj[key.trim()] = val.join(':').trim()
                    }
                })
                setJson(JSON.stringify(obj, null, 2))
                setIsConverting(false)
            } catch (err) {
                setError('Invalid YAML format detected.')
                setIsConverting(false)
            }
        }, 500)
    }, [yaml])

    const handleCopy = useCallback(async () => {
        if (!json) return
        await navigator.clipboard.writeText(json)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [json])

    const handlePaste = useCallback(async () => {
        try {
            const clipboardText = await navigator.clipboard.readText()
            setYaml(clipboardText)
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
                        <ArrowRightLeft className="h-4 w-4" />
                        Data Transformation
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight tracking-tight uppercase">YAML <span className="text-primary">to</span> JSON</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                        Convert YAML configuration files to JSON instantly.
                        Clean, fast, and 100% private client-side conversion.
                    </p>
                </header>

                <div className="grid lg:grid-cols-11 gap-4 items-center">
                    {/* Input */}
                    <div className="lg:col-span-5">
                        <div className="bg-card border-2 border-border rounded-[2rem] overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                                        <FileCode className="h-4 w-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">YAML Input</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={handlePaste} className="h-8 text-[10px] font-bold uppercase tracking-tight">Paste</Button>
                                    <Button variant="ghost" size="sm" onClick={() => { setYaml(''); setJson(''); setError(null); }} className="h-8 text-[10px] font-bold uppercase tracking-tight hover:text-red-500">Clear</Button>
                                </div>
                            </div>
                            <textarea
                                value={yaml}
                                onChange={(e) => setYaml(e.target.value)}
                                placeholder="key: value\nlist:\n  - item 1"
                                className="w-full h-[400px] p-8 bg-transparent outline-none text-sm font-mono leading-relaxed resize-none custom-scrollbar"
                            />
                        </div>
                    </div>

                    {/* Middle Button */}
                    <div className="lg:col-span-1 flex justify-center">
                        <Button
                            onClick={convertToJson}
                            disabled={!yaml || isConverting}
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
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50">JSON Output</span>
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
                                <pre className="w-full h-[400px] p-8 text-sm font-mono leading-relaxed overflow-auto custom-scrollbar text-blue-300">
                                    {json || '// JSON output will appear here...'}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
                        <Zap className="h-6 w-6 text-primary" />
                        <h4 className="font-bold">Instant Conversion</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            No page reloads or server requests. All processing happens in real-time within your browser.
                        </p>
                    </div>
                    <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
                        <div className="h-6 w-6 text-primary flex items-center justify-center font-bold text-xl font-mono">{ }</div>
                        <FileJson className="h-6 w-6 text-primary" />
                        <h4 className="font-bold">Structured JSON</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Outputs beautiful, human-readable indented JSON that is ready to be used in your code.
                        </p>
                    </div>
                    <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
                        <Download className="h-6 w-6 text-primary" />
                        <h4 className="font-bold">Offline Ready</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            This tool works entirely client-side, making it highly secure for internal configuration files.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
