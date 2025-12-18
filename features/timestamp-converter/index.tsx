"use client"

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    Clock,
    Copy,
    Check,
    RefreshCw,
    Calendar,
    Globe,
    Zap,
    Hash,
    ArrowRightLeft,
    Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function TimestampConverterContent() {
    const [timestamp, setTimestamp] = useState<string>('')
    const [readableDate, setReadableDate] = useState<string>('')
    const [copied, setCopied] = useState<string | null>(null)
    const [now, setNow] = useState<number>(Math.floor(Date.now() / 1000))

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(Math.floor(Date.now() / 1000))
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const convertFromTimestamp = useCallback((ts: string) => {
        if (!ts) {
            setReadableDate('')
            return
        }
        try {
            const val = parseInt(ts)
            // Handle both seconds and milliseconds
            const date = ts.length > 11 ? new Date(val) : new Date(val * 1000)
            if (isNaN(date.getTime())) throw new Error()
            setReadableDate(date.toISOString())
        } catch (e) {
            setReadableDate('Invalid Timestamp')
        }
    }, [])

    const convertFromDate = useCallback((dateStr: string) => {
        if (!dateStr) {
            setTimestamp('')
            return
        }
        try {
            const date = new Date(dateStr)
            if (isNaN(date.getTime())) throw new Error()
            setTimestamp(Math.floor(date.getTime() / 1000).toString())
        } catch (e) {
            setTimestamp('Invalid Date')
        }
    }, [])

    const handleCopy = async (text: string, id: string) => {
        await navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(null), 2000)
    }

    const setNowAsTimestamp = () => {
        const current = Math.floor(Date.now() / 1000).toString()
        setTimestamp(current)
        convertFromTimestamp(current)
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
            <div className="container relative z-10 max-w-6xl mx-auto px-4 space-y-12">
                {/* Header */}
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2"
                    >
                        <Clock className="h-3.5 w-3.5" />
                        Time Travel for Developers
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">Timestamp Converter</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Effortlessly convert between Unix timestamps and human-readable dates.
                        Supports seconds and milliseconds automatically.
                    </p>
                </header>

                {/* Current Time Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative group max-w-2xl mx-auto"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-500" />
                    <div className="relative flex items-center justify-between px-6 py-4 bg-muted/50 backdrop-blur-xl border border-border rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Zap className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Current Unix Timestamp</p>
                                <p className="text-xl font-mono font-black text-primary">{now}</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={setNowAsTimestamp} className="rounded-lg h-9">
                            Use Current
                        </Button>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Timestamp to Date */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 bg-card border-2 border-border rounded-[2.5rem] shadow-2xl space-y-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                                <Hash className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Timestamp to Date</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Unix Timestamp</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={timestamp}
                                        onChange={(e) => {
                                            setTimestamp(e.target.value)
                                            convertFromTimestamp(e.target.value)
                                        }}
                                        placeholder="e.g. 1734532800"
                                        className="w-full px-5 py-4 bg-muted/30 border-2 border-transparent focus:border-primary/30 rounded-2xl outline-none font-mono text-lg transition-all"
                                    />
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => handleCopy(timestamp, 'ts')}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-primary"
                                    >
                                        {copied === 'ts' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <ArrowRightLeft className="h-6 w-6 text-muted-foreground/30 rotate-90 lg:rotate-0" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Readable Date (ISO)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={readableDate}
                                        readOnly
                                        className="w-full px-5 py-4 bg-primary/5 border-2 border-primary/20 rounded-2xl outline-none font-mono text-lg text-primary"
                                    />
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => handleCopy(readableDate, 'rd')}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-primary"
                                    >
                                        {copied === 'rd' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Date to Timestamp */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 bg-card border-2 border-border rounded-[2.5rem] shadow-2xl space-y-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Date to Timestamp</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Date String</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={readableDate}
                                        onChange={(e) => {
                                            setReadableDate(e.target.value)
                                            convertFromDate(e.target.value)
                                        }}
                                        placeholder="e.g. 2024-12-18T14:40:00Z"
                                        className="w-full px-5 py-4 bg-muted/30 border-2 border-transparent focus:border-green-500/30 rounded-2xl outline-none font-mono text-lg transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <ArrowRightLeft className="h-6 w-6 text-muted-foreground/30 rotate-90 lg:rotate-0" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Resulting Timestamp</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={timestamp}
                                        readOnly
                                        className="w-full px-5 py-4 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-2xl outline-none font-mono text-lg text-emerald-500"
                                    />
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => handleCopy(timestamp, 'res-ts')}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-emerald-500"
                                    >
                                        {copied === 'res-ts' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-muted/30 border border-border rounded-2xl space-y-2">
                        <h4 className="font-bold text-sm flex items-center gap-2">
                            <Globe className="h-4 w-4 text-primary" />
                            Timezones
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            All conversions are processed in UTC by default. Use ISO 8601 strings for best accuracy.
                        </p>
                    </div>
                    <div className="p-6 bg-muted/30 border border-border rounded-2xl space-y-2">
                        <h4 className="font-bold text-sm flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            Smart Detection
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            We automatically detect if you provided seconds (10 digits) or milliseconds (13 digits).
                        </p>
                    </div>
                    <div className="p-6 bg-muted/30 border border-border rounded-2xl space-y-2">
                        <h4 className="font-bold text-sm flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 text-primary" />
                            Real-time
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Results update instantly as you type. No need to click "Convert" or "Format".
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
