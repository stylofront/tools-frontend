import { LucideIcon, ImageIcon, QrCode, Palette, Type, FileText, GitCompare, Code2, FileCode, Globe, Calculator, Lock, Scissors } from "lucide-react"

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
    "Text Tools",
    "Code Tools",
    "Converters",
    "Security",
    "Utilities",
] as const

export const DUMMY_TOOLS: Tool[] = [
    // Image Tools
    {
        id: "image-compressor",
        name: "Image Compressor",
        description: "Compress images instantly with Rust + WebAssembly",
        category: "Image Tools",
        icon: ImageIcon,
        route: "/image-compressor",
        tags: ["image", "compress", "optimize", "wasm"],
        isAvailable: true
    },
    {
        id: "qr-generator",
        name: "QR Code Generator",
        description: "Generate custom QR codes instantly",
        category: "Image Tools",
        icon: QrCode,
        route: "/qr-generator",
        tags: ["qr", "code", "generate", "barcode"],
        isAvailable: true
    },
    {
        id: "color-picker",
        name: "Color Picker",
        description: "Pick and convert colors in any format",
        category: "Image Tools",
        icon: Palette,
        route: "/color-picker",
        tags: ["color", "picker", "hex", "rgb", "palette"],
        isAvailable: true
    },

    // Text Tools
    {
        id: "text-formatter",
        name: "Text Formatter",
        description: "Format and transform text with ease",
        category: "Text Tools",
        icon: Type,
        route: "/text-formatter",
        tags: ["text", "format", "case", "transform"],
        isAvailable: true
    },
    {
        id: "word-counter",
        name: "Word Counter",
        description: "Count words, characters, and lines",
        category: "Text Tools",
        icon: FileText,
        route: "/word-counter",
        tags: ["word", "count", "character", "line"],
        isAvailable: true
    },
    {
        id: "text-diff",
        name: "Text Diff Checker",
        description: "Compare two texts and find differences",
        category: "Text Tools",
        icon: GitCompare,
        route: "/text-diff",
        tags: ["diff", "compare", "text", "difference"],
        isAvailable: true
    },

    // Code Tools
    {
        id: "json-formatter",
        name: "JSON Formatter",
        description: "Format and validate JSON data",
        category: "Code Tools",
        icon: Code2,
        route: "/json-formatter",
        tags: ["json", "format", "validate", "prettify"],
        isAvailable: true
    },
    {
        id: "base64-encoder",
        name: "Base64 Encoder/Decoder",
        description: "Encode and decode Base64 strings",
        category: "Code Tools",
        icon: FileCode,
        route: "/base64",
        tags: ["base64", "encode", "decode", "convert"],
        isAvailable: true
    },
    {
        id: "url-encoder",
        name: "URL Encoder/Decoder",
        description: "Encode and decode URL strings",
        category: "Code Tools",
        icon: Globe,
        route: "/url-encoder",
        tags: ["url", "encode", "decode", "uri"],
        isAvailable: true
    },
    {
        id: "regex-tester",
        name: "Regex Tester",
        description: "Test and validate regular expressions",
        category: "Code Tools",
        icon: Code2,
        route: "/regex-tester",
        tags: ["regex", "pattern", "test", "match"],
        isAvailable: true
    },

    // Converters
    {
        id: "markdown-html",
        name: "Markdown to HTML",
        description: "Convert Markdown to HTML instantly",
        category: "Converters",
        icon: FileCode,
        route: "/markdown-html",
        tags: ["markdown", "html", "convert", "transform"],
        isAvailable: true
    },
    {
        id: "unit-converter",
        name: "Unit Converter",
        description: "Convert between different units",
        category: "Converters",
        icon: Calculator,
        route: "/unit-converter",
        tags: ["unit", "convert", "measure", "calculate"],
        isAvailable: true
    },

    // Security
    {
        id: "password-generator",
        name: "Password Generator",
        description: "Generate strong, secure passwords",
        category: "Security",
        icon: Lock,
        route: "/password-generator",
        tags: ["password", "generate", "secure", "random"],
        isAvailable: true
    },
    {
        id: "hash-generator",
        name: "Hash Generator",
        description: "Generate MD5, SHA hashes",
        category: "Security",
        icon: Lock,
        route: "/hash-generator",
        tags: ["hash", "md5", "sha", "encrypt"],
        isAvailable: true
    },

    // Utilities
    {
        id: "uuid-generator",
        name: "UUID Generator",
        description: "Generate unique identifiers",
        category: "Utilities",
        icon: FileText,
        route: "/uuid-generator",
        tags: ["uuid", "guid", "generate", "unique"],
        isAvailable: true
    },
    {
        id: "lorem-ipsum",
        name: "Lorem Ipsum Generator",
        description: "Generate placeholder text",
        category: "Utilities",
        icon: Type,
        route: "/lorem-ipsum",
        tags: ["lorem", "ipsum", "text", "placeholder"],
        isAvailable: true
    },
    {
        id: "string-trimmer",
        name: "String Trimmer",
        description: "Trim and clean text strings",
        category: "Utilities",
        icon: Scissors,
        route: "/string-trimmer",
        tags: ["trim", "clean", "string", "whitespace"],
        isAvailable: true
    },
]

// Alias for backward compatibility
export const TOOLS = DUMMY_TOOLS

// Search function for autocomplete
export function searchTools(query: string): Tool[] {
    if (!query.trim()) return DUMMY_TOOLS.slice(0, 8)

    const lowerQuery = query.toLowerCase()

    return DUMMY_TOOLS.filter((tool) => {
        return (
            tool.name.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery) ||
            tool.category.toLowerCase().includes(lowerQuery) ||
            tool.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        )
    }).slice(0, 8)
}

// Get available tools only
export function getAvailableTools(): Tool[] {
    return DUMMY_TOOLS.filter(t => t.isAvailable)
}
