"use client"

import { motion } from "motion/react"
import { Sparkles, ArrowLeft, Cog } from "lucide-react"
import Link from "next/link"

interface ToolComingSoonProps {
    name: string
    description: string
}

export default function ToolComingSoon({ name, description }: ToolComingSoonProps) {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full text-center space-y-8"
            >
                <div className="relative inline-block">
                    <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                    <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-background border-2 border-primary/20 shadow-2xl mx-auto">
                        <Cog className="h-12 w-12 text-primary animate-[spin_4s_linear_infinite]" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">{name}</h1>
                    <p className="text-muted-foreground">{description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                        <Sparkles className="h-3 w-3" />
                        Coming Soon - Built with Rust + WASM
                    </div>
                </div>

                <div className="pt-8">
                    <Link
                        href="/search"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Browse Other Tools
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
