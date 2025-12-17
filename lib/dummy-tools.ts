import { LucideIcon, ImageIcon } from "lucide-react"

export interface Tool {
    id: string
    name: string
    description: string
    category: string
    icon: LucideIcon
    route: string
    tags: string[]
    isAvailable: boolean
}

export const TOOL_CATEGORIES = [
    "Image Tools",
] as const

export const TOOLS: Tool[] = [
    // Image Tools
    {
        id: "image-compressor",
        name: "Image Compressor",
        description: "Compress images instantly with Rust + WebAssembly. 100% private, runs in your browser.",
        category: "Image Tools",
        icon: ImageIcon,
        route: "/image-compressor",
        tags: ["image", "compress", "optimize", "resize", "wasm", "rust"],
        isAvailable: true
    },
]

// Search function for autocomplete
export function searchTools(query: string): Tool[] {
    if (!query.trim()) return TOOLS

    const lowerQuery = query.toLowerCase()

    return TOOLS.filter((tool) => {
        return (
            tool.name.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery) ||
            tool.category.toLowerCase().includes(lowerQuery) ||
            tool.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        )
    })
}

// Backward compatibility
export const DUMMY_TOOLS = TOOLS
