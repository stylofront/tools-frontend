"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { searchTools, type Tool } from "@/lib/tools"
import { cn } from "@/lib/utils"

export function ToolSearch() {
    const [query, setQuery] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [results, setResults] = useState<Tool[]>([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    useEffect(() => {
        if (query.trim()) {
            const searchResults = searchTools(query)
            setResults(searchResults)
            setSelectedIndex(0)
        } else {
            setResults(searchTools(""))
        }
    }, [query])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault()
            setSelectedIndex((prev) => (prev + 1) % results.length)
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
        } else if (e.key === "Enter" && results[selectedIndex]) {
            e.preventDefault()
            router.push(results[selectedIndex].route)
        } else if (e.key === "Escape") {
            setIsOpen(false)
            inputRef.current?.blur()
        }
    }

    const handleToolClick = (tool: Tool) => {
        router.push(tool.route)
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            {/* Search Input */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-2xl blur-lg opacity-20 group-hover:opacity-30 group-focus-within:opacity-40 transition-all duration-500" />

                <div className="relative flex items-center bg-background/80 backdrop-blur-xl border-2 border-primary/20 rounded-2xl overflow-hidden shadow-2xl group-focus-within:border-primary/40 transition-all duration-300">
                    <Search className="absolute left-5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />

                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search for any tool... (try 'image', 'json', 'password')"
                        className="w-full pl-14 pr-6 py-5 bg-transparent text-base md:text-lg outline-none placeholder:text-muted-foreground/60"
                    />

                    <div className="pr-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <kbd className="px-2 py-1 bg-muted rounded font-mono hidden sm:inline-block">↑↓</kbd>
                        <kbd className="px-2 py-1 bg-muted rounded font-mono hidden sm:inline-block">Enter</kbd>
                    </div>
                </div>
            </div>

            {/* Results Dropdown */}
            <AnimatePresence>
                {isOpen && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-3 w-full bg-background/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {results.map((tool, index) => {
                                const Icon = tool.icon
                                return (
                                    <motion.button
                                        key={tool.id}
                                        onClick={() => handleToolClick(tool)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className={cn(
                                            "w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200",
                                            selectedIndex === index
                                                ? "bg-primary/10 border-l-4 border-primary"
                                                : "hover:bg-muted/50 border-l-4 border-transparent"
                                        )}
                                    >
                                        <div className={cn(
                                            "flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all shrink-0",
                                            selectedIndex === index
                                                ? "bg-primary/20 border-primary scale-110"
                                                : "bg-muted/50 border-muted"
                                        )}>
                                            <Icon className={cn(
                                                "h-6 w-6 transition-colors",
                                                selectedIndex === index ? "text-primary" : "text-muted-foreground"
                                            )} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-foreground mb-0.5 truncate">
                                                {tool.name}
                                            </div>
                                            <div className="text-sm text-muted-foreground truncate">
                                                {tool.description}
                                            </div>
                                            <div className="text-xs text-primary/70 mt-1">
                                                {tool.category}
                                            </div>
                                        </div>

                                        <ArrowRight className={cn(
                                            "h-5 w-5 shrink-0 transition-all",
                                            selectedIndex === index
                                                ? "text-primary translate-x-1"
                                                : "text-muted-foreground opacity-0 group-hover:opacity-100"
                                        )} />
                                    </motion.button>
                                )
                            })}
                        </div>

                        {query && (
                            <div className="px-5 py-3 bg-muted/30 border-t border-border text-xs text-muted-foreground">
                                {results.length} {results.length === 1 ? 'tool' : 'tools'} found
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
