"use client"

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    Search,
    Copy,
    Check,
    Globe,
    Zap,
    Share2,
    Eye,
    Facebook,
    Twitter,
    Info,
    Layout,
    RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function MetaTagGeneratorContent() {
    const [meta, setMeta] = useState({
        title: '',
        description: '',
        keywords: '',
        author: '',
        ogType: 'website',
        ogUrl: '',
        ogImage: '',
        twitterCard: 'summary_large_image'
    })
    const [copied, setCopied] = useState(false)

    const generatedCode = useMemo(() => {
        let code = `<!-- Primary Meta Tags -->\n`
        if (meta.title) code += `<title>${meta.title}</title>\n`
        code += `<meta name="title" content="${meta.title}">\n`
        code += `<meta name="description" content="${meta.description}">\n`
        if (meta.keywords) code += `<meta name="keywords" content="${meta.keywords}">\n`
        if (meta.author) code += `<meta name="author" content="${meta.author}">\n\n`

        code += `<!-- Open Graph / Facebook -->\n`
        code += `<meta property="og:type" content="${meta.ogType}">\n`
        code += `<meta property="og:url" content="${meta.ogUrl}">\n`
        code += `<meta property="og:title" content="${meta.title}">\n`
        code += `<meta property="og:description" content="${meta.description}">\n`
        if (meta.ogImage) code += `<meta property="og:image" content="${meta.ogImage}">\n\n`

        code += `<!-- Twitter -->\n`
        code += `<meta property="twitter:card" content="${meta.twitterCard}">\n`
        code += `<meta property="twitter:url" content="${meta.ogUrl}">\n`
        code += `<meta property="twitter:title" content="${meta.title}">\n`
        code += `<meta property="twitter:description" content="${meta.description}">\n`
        if (meta.ogImage) code += `<meta property="twitter:image" content="${meta.ogImage}">`

        return code
    }, [meta])

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(generatedCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [generatedCode])

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
            <div className="container relative z-10 max-w-6xl mx-auto px-4 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-2"
                    >
                        <Share2 className="h-4 w-4" />
                        Social Media Optimization
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight tracking-tight">Meta Tag Generator</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Generate SEO-friendly meta tags for your website.
                        Optimize how your site appears on Google, Facebook, and Twitter.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Inputs */}
                    <div className="lg:col-span-12">
                        <div className="p-8 md:p-12 bg-card border-2 border-border rounded-[2.5rem] shadow-2xl space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                        <Info className="h-4 w-4" /> Basic Info
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-muted-foreground">Page Title</label>
                                            <input
                                                value={meta.title}
                                                onChange={(e) => setMeta({ ...meta, title: e.target.value })}
                                                placeholder="e.g. StyloFront - Modern Web Tools"
                                                className="w-full bg-muted/20 border border-border px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-muted-foreground">Description</label>
                                            <textarea
                                                value={meta.description}
                                                onChange={(e) => setMeta({ ...meta, description: e.target.value })}
                                                placeholder="A brief summary of your page..."
                                                className="w-full bg-muted/20 border border-border px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all h-24 resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                        <Globe className="h-4 w-4" /> Social Graph
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-muted-foreground">Site URL</label>
                                            <input
                                                value={meta.ogUrl}
                                                onChange={(e) => setMeta({ ...meta, ogUrl: e.target.value })}
                                                placeholder="https://example.com"
                                                className="w-full bg-muted/20 border border-border px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-muted-foreground">Preview Image URL</label>
                                            <input
                                                value={meta.ogImage}
                                                onChange={(e) => setMeta({ ...meta, ogImage: e.target.value })}
                                                placeholder="https://example.com/og-image.png"
                                                className="w-full bg-muted/20 border border-border px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview & Code */}
                    <div className="lg:col-span-12 grid md:grid-cols-2 gap-8">
                        {/* Visual Preview */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Eye className="h-5 w-5 text-primary" />
                                Google Preview
                            </h3>
                            <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-2 h-fit">
                                <p className="text-[#1a0dab] text-xl font-medium hover:underline cursor-pointer truncate">
                                    {meta.title || "Your Page Title Goes Here"}
                                </p>
                                <p className="text-[#006621] text-sm truncate">
                                    {meta.ogUrl || "https://example.com"}
                                </p>
                                <p className="text-[#4d5156] text-sm line-clamp-2">
                                    {meta.description || "Enter a description to see how your website will appear in Google search results. Make it catchy to improve click-through rates."}
                                </p>
                            </div>
                        </div>

                        {/* Code Output */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Layout className="h-5 w-5 text-primary" />
                                    Generated HTML
                                </h3>
                                <Button onClick={handleCopy} size="sm" className="rounded-xl h-9 gap-2">
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    {copied ? 'Copied' : 'Copy Tags'}
                                </Button>
                            </div>
                            <div className="bg-[#1e1e1e] border border-white/5 rounded-3xl p-6 overflow-x-auto shadow-2xl">
                                <pre className="text-xs font-mono text-blue-300 leading-relaxed custom-scrollbar">
                                    {generatedCode}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl space-y-3">
                        <Facebook className="h-5 w-5 text-primary" />
                        <h4 className="font-bold text-sm">Open Graph</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Open Graph tags ensure your content looks great when shared on Facebook and LinkedIn.
                        </p>
                    </div>
                    <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl space-y-3">
                        <Twitter className="h-5 w-5 text-primary" />
                        <h4 className="font-bold text-sm">Twitter Cards</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Rich media cards increase engagement when your site is mentioned in tweets.
                        </p>
                    </div>
                    <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl space-y-3">
                        <Search className="h-5 w-5 text-primary" />
                        <h4 className="font-bold text-sm">SEO Ready</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Standard meta tags tell search engines exactly what your content is about.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
