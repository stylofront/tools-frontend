"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleToggle = () => {
        if (!mounted) return
        setIsAnimating(true)
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
        setTimeout(() => setIsAnimating(false), 600)
    }

    if (!mounted) {
        return <Button variant="ghost" size="icon" className="h-9 w-9" />
    }

    const currentTheme = resolvedTheme || theme

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="group relative h-9 w-9 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20"
        >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Icons with enhanced animations */}
            <Sun className={`h-5 w-5 transition-all duration-500 ${currentTheme === "dark"
                    ? "rotate-90 scale-0"
                    : isAnimating
                        ? "rotate-180 scale-125"
                        : "rotate-0 scale-100"
                } ${currentTheme === "light" ? "text-amber-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" : ""}`} />

            <Moon className={`absolute h-5 w-5 transition-all duration-500 ${currentTheme === "light"
                    ? "rotate-90 scale-0"
                    : isAnimating
                        ? "rotate-12 scale-125"
                        : "rotate-0 scale-100"
                } ${currentTheme === "dark" ? "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" : ""}`} />

            {/* Click ripple effect */}
            {isAnimating && (
                <span className="absolute inset-0 animate-ping rounded-md bg-primary/30" style={{ animationDuration: '600ms' }} />
            )}

            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
