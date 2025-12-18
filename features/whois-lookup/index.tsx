"use client"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    Search,
    Copy,
    Check,
    Globe,
    Zap,
    ShieldAlert,
    ShieldCheck,
    Cpu,
    Database,
    History,
    RefreshCw,
    X,
    ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function WhoisLookupContent() {
    const [domain, setDomain] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [result, setResult] = useState<any | null>(null)
    const [history, setHistory] = useState<string[]>([])
    const [copied, setCopied] = useState(false)

    const performLookup = useCallback(() => {
        if (!domain) return
        setIsSearching(true)

        // Simulating WHOIS lookup
        setTimeout(() => {
            const mockResult = {
                domain: domain.toLowerCase(),
                registrar: "StyloFront Global Domains",
                registeredAt: "2015-06-12",
                expiresAt: "2026-06-12",
                status: "ClientTransferProhibited",
                nameservers: ["ns1.stylofront.com", "ns2.stylofront.com"],
                owner: "REDACTED FOR PRIVACY",
                email: "admin@" + domain.toLowerCase(),
                ip: "104.26.12.31"
            }
            setResult(mockResult)
            setHistory(prev => [domain, ...prev.filter(d => d !== domain)].slice(0, 5))
            setIsSearching(false)
        }, 1200)
    }, [domain])

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(JSON.stringify(result, null, 2))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [result])

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
                        <Search className="h-4 w-4" />
                        Domain Intelligence
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight tracking-tight">WHOIS Lookup</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Discover domain registration details instantly.
                        Uncover registrar information, expiry dates, and nameservers.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Search Bar */}
                    <div className="lg:col-span-12">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur opacity-50" />
                            <div className="relative flex items-center bg-card border-2 border-border rounded-2xl p-2 gap-2 shadow-2xl">
                                <div className="pl-4">
                                    <Globe className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <input
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && performLookup()}
                                    placeholder="Enter domain name (e.g. google.com)..."
                                    className="flex-1 bg-transparent px-4 py-4 outline-none font-bold text-lg"
                                />
                                <Button
                                    onClick={performLookup}
                                    disabled={!domain || isSearching}
                                    className="rounded-xl h-14 px-8 shadow-lg shadow-primary/20 transition-all active:scale-95"
                                >
                                    {isSearching ? <RefreshCw className="h-5 w-5 animate-spin" /> : "Lookup"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="p-8 bg-card border-2 border-border rounded-[2.5rem] shadow-xl space-y-8"
                                >
                                    <div className="flex items-center justify-between border-b border-border pb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-4 rounded-3xl bg-primary/10 text-primary">
                                                <Globe className="h-8 w-8" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black uppercase">{result.domain}</h2>
                                                <span className="text-xs font-bold text-green-500 flex items-center gap-1 mt-1">
                                                    <ShieldCheck className="h-3 w-3" /> Registered & Active
                                                </span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={handleCopy} className="rounded-xl">
                                            {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                                        </Button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Registrar</p>
                                                <p className="text-lg font-bold">{result.registrar}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Expiry Date</p>
                                                <p className="text-lg font-bold text-red-500">{result.expiresAt}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Registered At</p>
                                                <p className="text-lg font-bold">{result.registeredAt}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Nameservers</p>
                                                <div className="space-y-1">
                                                    {result.nameservers.map((ns: string) => (
                                                        <p key={ns} className="text-sm font-mono bg-muted/50 px-3 py-1 rounded-lg border border-border">{ns}</p>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">IP Address</p>
                                                <p className="text-lg font-bold font-mono">{result.ip}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border flex items-center justify-between">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full border border-border">
                                            <Database className="h-4 w-4 text-primary" />
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Lookup Database 4.0</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="rounded-xl h-10 gap-2">
                                                <ExternalLink className="h-3.5 w-3.5" /> Registry Info
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="h-[400px] bg-muted/10 border-2 border-dashed border-border rounded-[2.5rem] flex flex-col items-center justify-center space-y-6 text-center"
                                >
                                    <div className="p-6 rounded-[2rem] bg-background border border-border shadow-xl">
                                        <Database className="h-12 w-12 text-muted-foreground/30 animate-pulse" />
                                    </div>
                                    <div className="max-w-xs space-y-2">
                                        <p className="font-bold">Awaiting Input</p>
                                        <p className="text-xs text-muted-foreground">Search for a domain to start the intelligence gathering process.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-6 bg-card border-2 border-border rounded-3xl shadow-xl space-y-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <History className="h-5 w-5 text-primary" />
                                Recent Requests
                            </h3>
                            <div className="space-y-3">
                                {history.length > 0 ? history.map(d => (
                                    <button
                                        key={d}
                                        onClick={() => { setDomain(d); performLookup(); }}
                                        className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group text-sm font-bold"
                                    >
                                        <span className="truncate">{d}</span>
                                        <Search className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                )) : (
                                    <p className="text-xs text-muted-foreground text-center py-4">No recent history</p>
                                )}
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-indigo-500/10 to-primary/10 border border-primary/20 rounded-[2rem] space-y-4">
                            <h4 className="flex items-center gap-2 font-black text-sm">
                                <ShieldAlert className="h-4 w-4 text-primary" />
                                Privacy Shield
                            </h4>
                            <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                                We respect WHOIS privacy protocols. If a domain has privacy protection, we display "REDACTED" to comply with GDPR.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
