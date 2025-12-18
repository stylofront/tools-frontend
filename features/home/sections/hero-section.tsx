"use client"

import { TypingAnimation } from "@/components/ui/typing-animation"
import { motion } from "motion/react"
import { DotPattern } from "@/components/ui/dot-pattern"
import { ToolSearch } from "./tool-search"
import { Sparkles, Zap, Cpu } from "lucide-react"
import { VelocityScroll } from "@/components/ui/scroll-based-velocity"

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-background overflow-x-hidden">
            {/* Background Wrapper with overflow hidden */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Dot Pattern Background */}
                <DotPattern
                    id="hero-pattern"
                    className="opacity-40 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
                    width={20}
                    height={20}
                    cx={1}
                    cy={1}
                    cr={1}
                // glow={true}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />

                {/* Bottom Gradient Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-1 flex flex-col justify-center">
                <div className="text-center space-y-8">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                            <span className="text-sm font-medium text-primary">All tools in one place</span>
                        </div>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                            <span className="inline-block bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                                40+ Powerful Tools
                            </span>
                            <br />
                            <TypingAnimation
                                className="inline-block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient leading-tight"
                                duration={100}
                                startOnView={true}
                                words={[
                                    "Powered by Rust",
                                    "Lighting Fast",
                                    "Privacy First",
                                    "Always Free",
                                    "WASM Powered",
                                    "Open Source"
                                ]}
                                loop={true}
                            />
                        </h1>
                    </motion.div>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    >
                        The ultimate developer collection. Blazing fast, no sign-ups,
                        and built with modern technology like Rust + WebAssembly.
                    </motion.p>

                    {/* Search Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="pt-8"
                    >
                        <ToolSearch />
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-8 pb-12 text-sm"
                    >
                        <div className="flex items-center gap-2 text-muted-foreground group">
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Zap className="h-4 w-4 text-primary" />
                            </div>
                            <span><span className="font-bold text-foreground">40+</span> Tools</span>
                        </div>
                        <div className="hidden sm:block w-px h-4 bg-border" />
                        <div className="flex items-center gap-2 text-muted-foreground group">
                            <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                                <Sparkles className="h-4 w-4 text-green-500" />
                            </div>
                            <span><span className="font-bold text-foreground">100%</span> Private</span>
                        </div>
                        <div className="hidden sm:block w-px h-4 bg-border" />
                        <div className="flex items-center gap-2 text-muted-foreground group">
                            <div className="p-2 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                                <Cpu className="h-4 w-4 text-orange-500" />
                            </div>
                            <span><span className="font-bold text-foreground">Rust</span> Engine</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Velocity Text */}
            <div className="w-full pb-8 max-w-7xl mx-auto opacity-40 hover:opacity-100 font-heading transition-opacity duration-500">
                <VelocityScroll
                    text="Modern Tools • Blazing Fast • Privacy First • Open Source •"
                    default_velocity={4}
                    className="font-display mb-6  text-center text-3xl font-bold tracking-[-0.02em] text-foreground drop-shadow-sm dark:text-foreground md:text-5xl md:leading-[5rem]"
                />
                <VelocityScroll
                    text="Made Simple • Made Faster • Made Beautiful • For Everyone •"
                    default_velocity={2}
                    className="font-display mb-6 text-center text-3xl font-bold tracking-[-0.02em] text-foreground drop-shadow-sm dark:text-foreground md:text-5xl md:leading-[5rem]"
                />
                <VelocityScroll
                    text="Made with Rust • Made with Love • Made with Care •"
                    default_velocity={3}
                    className="font-display mb-6 text-center text-4xl font-bold tracking-[-0.02em] text-foreground drop-shadow-sm dark:text-foreground md:text-5xl md:leading-[5rem]"
                />
            </div>
        </section>
    )
}
