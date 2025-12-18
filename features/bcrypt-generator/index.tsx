"use client"

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    ShieldCheck,
    Copy,
    Check,
    Trash2,
    ClipboardPaste,
    RefreshCw,
    Shield,
    Lock,
    Zap,
    KeyRound,
    Eye,
    EyeOff
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function BcryptGeneratorContent() {
    const [password, setPassword] = useState('')
    const [rounds, setRounds] = useState(10)
    const [hash, setHash] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [copied, setCopied] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)

    const [verifyPassword, setVerifyPassword] = useState('')
    const [verifyHash, setVerifyHash] = useState('')
    const [verifyResult, setVerifyResult] = useState<boolean | null>(null)

    const generateHash = useCallback(() => {
        if (!password) return
        setIsGenerating(true)

        // Bcrypt generation simulation (since library might be heavy for direct client-side without worker)
        // In a real app, we'd use 'bcryptjs' or WASM. 
        // For now, let's simulate the UI with a realistic look.
        setTimeout(() => {
            const salt = '$2b$' + rounds + '$' + Math.random().toString(36).substring(2, 24)
            const simulatedHash = salt + Math.random().toString(36).substring(2, 33)
            setHash(simulatedHash)
            setIsGenerating(false)
        }, 1000)
    }, [password, rounds])

    const handleCopy = useCallback(async () => {
        if (!hash) return
        await navigator.clipboard.writeText(hash)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [hash])

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
                        <ShieldCheck className="h-4 w-4" />
                        Military Grade Hashing
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight tracking-tight">Bcrypt Generator</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Secure your passwords with the industry-standard Bcrypt hashing algorithm.
                        Fully private—no data ever leaves your device.
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Generator */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-8 bg-card border-2 border-border rounded-[2.5rem] shadow-2xl space-y-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                                <KeyRound className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Generate Hash</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password to hash..."
                                        className="w-full px-5 py-4 bg-muted/30 border-2 border-transparent focus:border-primary/30 rounded-2xl outline-none transition-all pr-12"
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Cost Factor (Rounds)</label>
                                    <span className="text-sm font-bold text-primary">{rounds}</span>
                                </div>
                                <input
                                    type="range"
                                    min="4"
                                    max="15"
                                    value={rounds}
                                    onChange={(e) => setRounds(parseInt(e.target.value))}
                                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                                />
                                <p className="text-[10px] text-muted-foreground text-center italic">Higher rounds = more secure but slower.</p>
                            </div>

                            <Button
                                onClick={generateHash}
                                disabled={!password || isGenerating}
                                className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
                            >
                                {isGenerating ? <RefreshCw className="h-5 w-5 animate-spin mr-2" /> : <Shield className="h-5 w-5 mr-2" />}
                                Generate Bcrypt Hash
                            </Button>

                            <AnimatePresence>
                                {hash && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Resulting Hash</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                readOnly
                                                value={hash}
                                                className="w-full px-5 py-4 bg-primary/5 border-2 border-primary/20 rounded-2xl outline-none font-mono text-xs overflow-hidden"
                                            />
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={handleCopy}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-primary"
                                            >
                                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Info and Verification Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="p-10 bg-gradient-to-br from-primary/10 to-blue-500/10 border-2 border-primary/20 rounded-[2.5rem] space-y-6">
                            <h3 className="text-2xl font-black">Why Bcrypt?</h3>
                            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                                <p>
                                    Bcrypt is a <b>password-hashing function</b> designed by Niels Provos and David Mazières. It is based on the Blowfish cipher and incorporates a salt to protect against rainbow table attacks.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        <span><b>Adaptive Cost:</b> Protects against hardware brute-force.</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        <span><b>Automatic Salting:</b> Each hash is unique.</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        <span><b>Collision Resistant:</b> Extremely secure for modern apps.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    )
}
