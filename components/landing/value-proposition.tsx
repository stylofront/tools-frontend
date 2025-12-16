"use client"

import { motion } from "motion/react"
import { Zap, Wrench, Search, Shield, Sparkles, Globe } from "lucide-react"

const features = [
    {
        icon: Zap,
        title: "Blazing Fast Performance",
        description: "Built with Rust for unmatched speed. Process millions of operations in milliseconds.",
        gradient: "from-orange-500/20 to-red-500/20",
        iconColor: "text-orange-500"
    },
    {
        icon: Wrench,
        title: "All Tools, One Place",
        description: "Stop hunting across multiple websites. Every developer tool you need, right here.",
        gradient: "from-blue-500/20 to-cyan-500/20",
        iconColor: "text-blue-500"
    },
    {
        icon: Search,
        title: "Instant Search & Use",
        description: "Find what you need in seconds. Start using tools immediately—no tutorials needed.",
        gradient: "from-purple-500/20 to-pink-500/20",
        iconColor: "text-purple-500"
    },
    {
        icon: Shield,
        title: "100% Free Forever",
        description: "No hidden fees, no premium tiers, no credit card required. Just pure value.",
        gradient: "from-green-500/20 to-emerald-500/20",
        iconColor: "text-green-500"
    },
    {
        icon: Sparkles,
        title: "No Sign-Up Required",
        description: "Jump right in. No registration, no email verification, no waiting. Just tools.",
        gradient: "from-yellow-500/20 to-amber-500/20",
        iconColor: "text-yellow-500"
    },
    {
        icon: Globe,
        title: "Works Everywhere",
        description: "Browser-based tools that work on any device. Desktop, mobile, tablet—anywhere.",
        gradient: "from-indigo-500/20 to-violet-500/20",
        iconColor: "text-indigo-500"
    }
]

export function ValueProposition() {
    return (
        <section className="relative py-24 sm:py-32 bg-background overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Why Choose Us</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            The Issue? Other Sites Give
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            One Tool at a Time
                        </span>
                    </h2>

                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        We bring everything together. Search once, find everything, use instantly.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                className="group relative"
                            >
                                {/* Card glow effect */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Card */}
                                <div className="relative h-full bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 rounded-2xl p-6 sm:p-8 transition-all duration-300">
                                    {/* Icon */}
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} border-2 border-primary/20 mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`h-7 w-7 ${feature.iconColor}`} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Decorative element */}
                                    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
