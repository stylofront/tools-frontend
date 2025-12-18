"use client"

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    FileCode,
    Copy,
    Check,
    Trash2,
    Plus,
    Globe,
    Zap,
    Download,
    RefreshCw,
    X,
    Clock,
    Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils'

interface SitemapURL {
    id: string
    url: string
    priority: string
    changefreq: string
}

export default function SitemapGeneratorContent() {
    const [urls, setUrls] = useState<SitemapURL[]>([
        { id: '1', url: 'https://example.com/', priority: '1.0', changefreq: 'daily' }
    ])
    const [copied, setCopied] = useState(false)

    const xmlResult = useMemo(() => {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

        urls.forEach(u => {
            if (!u.url) return
            xml += `  <url>\n`
            xml += `    <loc>${u.url}</loc>\n`
            xml += `    <changefreq>${u.changefreq}</changefreq>\n`
            xml += `    <priority>${u.priority}</priority>\n`
            xml += `  </url>\n`
        })

        xml += `</urlset>`
        return xml
    }, [urls])

    const addUrl = () => {
        setUrls([...urls, {
            id: Math.random().toString(36).substring(7),
            url: '',
            priority: '0.8',
            changefreq: 'weekly'
        }])
    }

    const updateUrl = (id: string, field: keyof SitemapURL, value: string) => {
        setUrls(urls.map(u => u.id === id ? { ...u, [field]: value } : u))
    }

    const removeUrl = (id: string) => {
        setUrls(urls.filter(u => u.id !== id))
    }

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(xmlResult)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [xmlResult])

    const handleDownload = () => {
        const blob = new Blob([xmlResult], { type: 'application/xml' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'sitemap.xml'
        link.click()
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
                        <Search className="h-4 w-4" />
                        Search Engine Optimization
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight tracking-tight">Sitemap Generator</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Create high-quality XML sitemaps for Google, Bing, and other search engines.
                        Help crawlers understand your site structure effortlessly.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Builder */}
                    <div className="lg:col-span-12">
                        <div className="p-8 bg-card border-2 border-border rounded-[2.5rem] shadow-2xl space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Plus className="h-5 w-5 text-primary" />
                                    URL Mapping
                                </h3>
                                <Button onClick={addUrl} variant="outline" className="rounded-xl border-primary/30 text-primary hover:bg-primary/5">
                                    Add New URL
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <AnimatePresence>
                                    {urls.map((u) => (
                                        <motion.div
                                            key={u.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="grid lg:grid-cols-12 gap-4 items-end p-6 bg-muted/20 border border-transparent hover:border-border rounded-3xl transition-all"
                                        >
                                            <div className="lg:col-span-6">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-2 block">Location (URL)</label>
                                                <input
                                                    value={u.url}
                                                    onChange={(e) => updateUrl(u.id, 'url', e.target.value)}
                                                    placeholder="https://example.com/page"
                                                    className="w-full bg-background border border-border px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                            <div className="lg:col-span-3">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-2 block">Frequency</label>
                                                <Select
                                                    value={u.changefreq}
                                                    onValueChange={(val: string) => updateUrl(u.id, 'changefreq', val)}
                                                >
                                                    <SelectTrigger className="rounded-xl h-12">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="always">Always</SelectItem>
                                                        <SelectItem value="hourly">Hourly</SelectItem>
                                                        <SelectItem value="daily">Daily</SelectItem>
                                                        <SelectItem value="weekly">Weekly</SelectItem>
                                                        <SelectItem value="monthly">Monthly</SelectItem>
                                                        <SelectItem value="yearly">Yearly</SelectItem>
                                                        <SelectItem value="never">Never</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="lg:col-span-2">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-2 block">Priority</label>
                                                <Select
                                                    value={u.priority}
                                                    onValueChange={(val: string) => updateUrl(u.id, 'priority', val)}
                                                >
                                                    <SelectTrigger className="rounded-xl h-12">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1.0">1.0 (Highest)</SelectItem>
                                                        <SelectItem value="0.9">0.9</SelectItem>
                                                        <SelectItem value="0.8">0.8</SelectItem>
                                                        <SelectItem value="0.5">0.5 (Default)</SelectItem>
                                                        <SelectItem value="0.1">0.1 (Lowest)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="lg:col-span-1 flex justify-end">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeUrl(u.id)}
                                                    disabled={urls.length === 1}
                                                    className="h-12 w-12 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl"
                                                >
                                                    <X className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Output Area */}
                    <div className="lg:col-span-12">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur opacity-50 transition duration-500" />
                            <div className="relative bg-[#1e1e1e] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                                <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <FileCode className="h-4 w-4 text-primary" />
                                        </div>
                                        <span className="text-xs font-bold text-white uppercase tracking-widest">sitemap.xml</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-white hover:bg-white/10 rounded-xl h-9">
                                            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                            {copied ? 'Copied' : 'Copy XML'}
                                        </Button>
                                        <Button size="sm" onClick={handleDownload} className="rounded-xl h-9 shadow-lg shadow-primary/20">
                                            <Download className="h-4 w-4 mr-2" /> Download
                                        </Button>
                                    </div>
                                </div>
                                <pre className="p-8 text-blue-300 font-mono text-xs leading-relaxed overflow-x-auto custom-scrollbar min-h-[300px]">
                                    {xmlResult}
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-12 grid md:grid-cols-3 gap-6">
                        <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
                            <Clock className="h-6 w-6 text-primary" />
                            <h4 className="font-bold">Fresher Content</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Use high change frequencies (hourly/daily) for your homepage and news sections to encourage re-indexing.
                            </p>
                        </div>
                        <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
                            <Globe className="h-6 w-6 text-primary" />
                            <h4 className="font-bold">Index Everything</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                A sitemap acts as a map for search engines, ensuring your deep pages are reachable by crawlers.
                            </p>
                        </div>
                        <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl space-y-4">
                            <Zap className="h-6 w-6 text-primary" />
                            <h4 className="font-bold">Lightning Fast</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Our generator handles hundreds of URLs instantly in-memory, ensuring a smooth SEO workflow.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
