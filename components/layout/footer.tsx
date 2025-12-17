"use client"

import Link from "next/link"
import Image from "next/image"
import { Sparkles, Zap, Rocket, Code, Github, Twitter, Mail } from "lucide-react"
import { motion } from "motion/react"

export function Footer() {
    return (
        <footer className="border-t bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
                <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Image
                                    src="/tools-logo-t.png"
                                    alt="StyloFront Tools"
                                    width={32}
                                    height={32}
                                    className="h-8 w-8 object-contain"
                                />
                                <h3 className="font-bold font-heading text-lg">StyloFront Tools</h3>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                All-in-one developer toolbox. Lightning-fast utilities built with Rust for modern developers.
                            </p>
                            <div className="flex items-center gap-2 pt-2">
                                <Zap className="h-4 w-4 text-primary" />
                                <span className="text-xs text-muted-foreground">Free Forever</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Tools Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-3"
                    >
                        <h4 className="font-semibold font-heading text-base mb-4">Popular Tools</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/tools/image-compressor"
                                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <Rocket className="h-4 w-4 text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all shrink-0" />
                                    <span>Image Compressor</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tools/json-formatter"
                                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <Code className="h-4 w-4 text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all shrink-0" />
                                    <span>JSON Formatter</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tools/password-generator"
                                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <Sparkles className="h-4 w-4 text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all shrink-0" />
                                    <span>Password Generator</span>
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Resources Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-3"
                    >
                        <h4 className="font-semibold font-heading text-base mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/#"
                                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <Zap className="h-4 w-4 text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all shrink-0" />
                                    <span>All Tools</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#feedback"
                                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <Sparkles className="h-4 w-4 text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all shrink-0" />
                                    <span>Feedback</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#"
                                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <Rocket className="h-4 w-4 text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all shrink-0" />
                                    <span>Documentation</span>
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Social & Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-3"
                    >
                        <h4 className="font-semibold font-heading text-base mb-4">Connect</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <Github className="h-4 w-4 text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all shrink-0" />
                                    <span>GitHub</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <Twitter className="h-4 w-4 text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all shrink-0" />
                                    <span>Twitter</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:hello@stylofronttools.com"
                                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <Mail className="h-4 w-4 text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all shrink-0" />
                                    <span>Email Us</span>
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <p className="text-sm text-muted-foreground text-center sm:text-left">
                        © {new Date().getFullYear()} StyloFront Tools. Built with ❤️ and StyloFront.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <Link
                            href="/about"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            Terms
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}
