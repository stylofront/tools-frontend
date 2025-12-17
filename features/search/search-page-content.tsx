"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Search, Filter, X, ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { DUMMY_TOOLS, TOOL_CATEGORIES, type Tool } from "@/lib/dummy-tools"

export default function SearchPageContent() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>("All")
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const router = useRouter()

    // Filter tools based on search and category
    const filteredTools = useMemo(() => {
        let tools = DUMMY_TOOLS

        // Filter by category
        if (selectedCategory !== "All") {
            tools = tools.filter((tool) => tool.category === selectedCategory)
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase()
            tools = tools.filter(
                (tool) =>
                    tool.name.toLowerCase().includes(lowerQuery) ||
                    tool.description.toLowerCase().includes(lowerQuery) ||
                    tool.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
            )
        }

        return tools
    }, [searchQuery, selectedCategory])

    const handleToolClick = (tool: Tool) => {
        router.push(tool.route)
    }

    const categories = ["All", ...TOOL_CATEGORIES]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6">
                            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                            <span className="text-sm font-medium text-primary">Discover Tools</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Find Your Perfect Tool
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                            Search through our collection of developer tools
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="max-w-3xl mx-auto mb-8"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-2xl blur-lg opacity-20 group-hover:opacity-30 group-focus-within:opacity-40 transition-all duration-500" />

                            <div className="relative flex items-center bg-background/80 backdrop-blur-xl border-2 border-primary/20 rounded-2xl overflow-hidden shadow-2xl group-focus-within:border-primary/40 transition-all duration-300">
                                <Search className="absolute left-5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />

                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name, description, or tags..."
                                    className="w-full pl-14 pr-14 py-5 bg-transparent text-base md:text-lg outline-none placeholder:text-muted-foreground/60"
                                />

                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-5 p-1 hover:bg-muted rounded-full transition-colors"
                                    >
                                        <X className="h-4 w-4 text-muted-foreground" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center justify-center gap-4 mb-4"
                    >
                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="md:hidden flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                        >
                            <Filter className="h-4 w-4" />
                            <span className="text-sm font-medium">Filter</span>
                        </button>

                        {/* Desktop Category Pills */}
                        <div className="hidden md:flex flex-wrap items-center justify-center gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                                        selectedCategory === category
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                                            : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Mobile Category Filter Dropdown */}
                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden mb-4 overflow-hidden"
                            >
                                <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-xl">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                setSelectedCategory(category)
                                                setIsFilterOpen(false)
                                            }}
                                            className={cn(
                                                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                                                selectedCategory === category
                                                    ? "bg-primary text-primary-foreground shadow-lg"
                                                    : "bg-muted text-muted-foreground"
                                            )}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Results Count */}
                    <div className="text-center text-sm text-muted-foreground mb-8">
                        Showing <span className="font-semibold text-foreground">{filteredTools.length}</span> {filteredTools.length === 1 ? 'tool' : 'tools'}
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        {filteredTools.length > 0 ? (
                            <motion.div
                                key="tools-grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredTools.map((tool, index) => {
                                    const Icon = tool.icon
                                    return (
                                        <motion.button
                                            key={tool.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            onClick={() => handleToolClick(tool)}
                                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                            className="group relative text-left"
                                        >
                                            {/* Card Glow */}
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Card */}
                                            <div className="relative h-full bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 rounded-2xl p-6 transition-all duration-300">
                                                {/* Icon */}
                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                                                    <Icon className="h-6 w-6 text-primary" />
                                                </div>

                                                {/* Content */}
                                                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                                                    {tool.name}
                                                </h3>

                                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                                    {tool.description}
                                                </p>

                                                {/* Category Badge */}
                                                <div className="flex items-center justify-between">
                                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                                        {tool.category}
                                                    </span>

                                                    <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                </div>

                                                {/* Decorative Element */}
                                                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                                            </div>
                                        </motion.button>
                                    )
                                })}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="no-results"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-center py-20"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                                    <Search className="h-10 w-10 text-muted-foreground" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">No tools found</h3>
                                <p className="text-muted-foreground mb-6">
                                    Try adjusting your search or filter
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery("")
                                        setSelectedCategory("All")
                                    }}
                                    className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    )
}
