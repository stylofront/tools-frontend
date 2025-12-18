"use client"

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    Key,
    ShieldCheck,
    ShieldAlert,
    Zap,
    Eye,
    EyeOff,
    Check,
    X,
    Lock,
    RefreshCw,
    Clock,
    Copy,
    Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function PasswordStrengthContent() {
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [copied, setCopied] = useState(false)

    const analysis = useMemo(() => {
        if (!password) return null

        const checks = {
            length: password.length >= 10,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        }

        const score = Object.values(checks).filter(Boolean).length
        let label = 'Very Weak'
        let color = 'bg-red-500'
        let textColor = 'text-red-500'

        if (score === 2) { label = 'Weak'; color = 'bg-orange-500'; textColor = 'text-orange-500' }
        if (score === 3) { label = 'Medium'; color = 'bg-yellow-500'; textColor = 'text-yellow-500' }
        if (score === 4) { label = 'Strong'; color = 'bg-green-500'; textColor = 'text-green-500' }
        if (score === 5) { label = 'Exceptional'; color = 'bg-primary'; textColor = 'text-primary' }

        return { checks, score, label, color, textColor }
    }, [password])

    const handleCopy = async () => {
        await navigator.clipboard.writeText(password)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
            <div className="container relative z-10 max-w-5xl mx-auto px-4 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2"
                    >
                        <ShieldCheck className="h-4 w-4" />
                        Security Audit
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight tracking-tight uppercase">Password <span className="text-primary">Strength</span></h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                        Test your passwords against modern security benchmarks.
                        Uncover vulnerabilities and get tips for better account protection.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-card border-2 border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            <div className="space-y-8">
                                <div className="relative">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 block">Test Your Password</label>
                                    <div className="relative group/input">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Type or paste your password..."
                                            className="w-full bg-muted/20 border-2 border-border p-6 rounded-2xl text-2xl font-mono focus:border-primary outline-none transition-all pr-32"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => setShowPassword(!showPassword)} className="rounded-xl h-12 w-12 text-muted-foreground">
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={handleCopy} disabled={!password} className="rounded-xl h-12 w-12 text-muted-foreground">
                                                {copied ? <Check className="h-5 w-5 text-primary" /> : <Copy className="h-5 w-5" />}
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold">Security Score</span>
                                        <span className={cn("text-sm font-black uppercase tracking-widest", analysis?.textColor)}>
                                            {analysis?.label || 'Awaiting Input'}
                                        </span>
                                    </div>
                                    <div className="h-3 bg-muted rounded-full overflow-hidden flex gap-1">
                                        {[1, 2, 3, 4, 5].map((lvl) => (
                                            <div
                                                key={lvl}
                                                className={cn(
                                                    "h-full flex-1 transition-all duration-500",
                                                    analysis && analysis.score >= lvl ? analysis.color : "bg-transparent opacity-10"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {Object.entries({
                                        '10+ Characters': analysis?.checks.length,
                                        'Uppercase Letters': analysis?.checks.upper,
                                        'Lowercase Letters': analysis?.checks.lower,
                                        'Numbers': analysis?.checks.number,
                                        'Special Symbols': analysis?.checks.special
                                    }).map(([label, active]) => (
                                        <div key={label} className={cn(
                                            "flex items-center gap-3 p-4 rounded-xl border transition-all",
                                            active ? "bg-green-500/5 border-green-500/20 text-green-600" : "bg-muted/10 border-border text-muted-foreground/50"
                                        )}>
                                            {active ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                                            <span className="text-xs font-bold">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 bg-card border-2 border-border rounded-[2.5rem] shadow-xl space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" />
                                Entropy Data
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-2xl bg-primary/5 space-y-1">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Brute Force Time</p>
                                    <p className="text-lg font-black">{password.length > 12 ? 'Over 100 years' : password.length > 8 ? 'Weeks' : 'Seconds'}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-primary/5 space-y-1">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Complexity Rank</p>
                                    <p className="text-lg font-black">{analysis?.score || 0}/5</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-[1.5rem] border border-primary/20 bg-primary/5 flex items-start gap-4">
                                <Zap className="h-5 w-5 text-primary shrink-0 mt-1" />
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    The best passwords aren't complex, they are <b>long</b>. Use 4-5 random words for high security.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
