import { LucideIcon, ImageIcon, Type, Code2, FileCode, Palette, Lock, QrCode, Calculator, FileText, Globe, Scissors, GitCompare } from "lucide-react"

export interface Tool {
    id: string
    name: string
    description: string
    category: string
    icon: LucideIcon
    route: string
    tags: string[]
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
        description: "Compress images without losing quality",
        category: "Image Tools",
        icon: ImageIcon,
        route: "/tools/image-compressor",
        tags: ["image", "compress", "optimize", "resize"]
    },
    {
        id: "image-converter",
        name: "Image Converter",
        description: "Convert images between different formats",
        category: "Image Tools",
        icon: ImageIcon,
        route: "/tools/image-converter",
        tags: ["image", "convert", "png", "jpg", "webp"]
    },
    {
        id: "qr-generator",
        name: "QR Code Generator",
        description: "Generate custom QR codes instantly",
        category: "Image Tools",
        icon: QrCode,
        route: "/tools/qr-generator",
        tags: ["qr", "code", "generate", "barcode"]
    },
    {
        id: "color-picker",
        name: "Color Picker",
        description: "Pick and convert colors in any format",
        category: "Image Tools",
        icon: Palette,
        route: "/tools/color-picker",
        tags: ["color", "picker", "hex", "rgb", "palette"]
    },

    // Text Tools
    {
        id: "text-formatter",
        name: "Text Formatter",
        description: "Format and transform text with ease",
        category: "Text Tools",
        icon: Type,
        route: "/tools/text-formatter",
        tags: ["text", "format", "case", "transform"]
    },
    {
        id: "word-counter",
        name: "Word Counter",
        description: "Count words, characters, and lines",
        category: "Text Tools",
        icon: FileText,
        route: "/tools/word-counter",
        tags: ["word", "count", "character", "line"]
    },
    {
        id: "text-diff",
        name: "Text Diff Checker",
        description: "Compare two texts and find differences",
        category: "Text Tools",
        icon: GitCompare,
        route: "/tools/text-diff",
        tags: ["diff", "compare", "text", "difference"]
    },

    // Code Tools
    {
        id: "json-formatter",
        name: "JSON Formatter",
        description: "Format and validate JSON data",
        category: "Code Tools",
        icon: Code2,
        route: "/tools/json-formatter",
        tags: ["json", "format", "validate", "prettify"]
    },
    {
        id: "base64-encoder",
        name: "Base64 Encoder/Decoder",
        description: "Encode and decode Base64 strings",
        category: "Code Tools",
        icon: FileCode,
        route: "/tools/base64",
        tags: ["base64", "encode", "decode", "convert"]
    },
    {
        id: "url-encoder",
        name: "URL Encoder/Decoder",
        description: "Encode and decode URL strings",
        category: "Code Tools",
        icon: Globe,
        route: "/tools/url-encoder",
        tags: ["url", "encode", "decode", "uri"]
    },
    {
        id: "regex-tester",
        name: "Regex Tester",
        description: "Test and validate regular expressions",
        category: "Code Tools",
        icon: Code2,
        route: "/tools/regex-tester",
        tags: ["regex", "pattern", "test", "match"]
    },

    // Converters
    {
        id: "markdown-html",
        name: "Markdown to HTML",
        description: "Convert Markdown to HTML instantly",
        category: "Converters",
        icon: FileCode,
        route: "/tools/markdown-html",
        tags: ["markdown", "html", "convert", "transform"]
    },
    {
        id: "unit-converter",
        name: "Unit Converter",
        description: "Convert between different units",
        category: "Converters",
        icon: Calculator,
        route: "/tools/unit-converter",
        tags: ["unit", "convert", "measure", "calculate"]
    },

    // Security
    {
        id: "password-generator",
        name: "Password Generator",
        description: "Generate strong, secure passwords",
        category: "Security",
        icon: Lock,
        route: "/tools/password-generator",
        tags: ["password", "generate", "secure", "random"]
    },
    {
        id: "hash-generator",
        name: "Hash Generator",
        description: "Generate MD5, SHA hashes",
        category: "Security",
        icon: Lock,
        route: "/tools/hash-generator",
        tags: ["hash", "md5", "sha", "encrypt"]
    },

    // Utilities
    {
        id: "uuid-generator",
        name: "UUID Generator",
        description: "Generate unique identifiers",
        category: "Utilities",
        icon: FileText,
        route: "/tools/uuid-generator",
        tags: ["uuid", "guid", "generate", "unique"]
    },
    {
        id: "lorem-ipsum",
        name: "Lorem Ipsum Generator",
        description: "Generate placeholder text",
        category: "Utilities",
        icon: Type,
        route: "/tools/lorem-ipsum",
        tags: ["lorem", "ipsum", "text", "placeholder"]
    },
    {
        id: "string-trimmer",
        name: "String Trimmer",
        description: "Trim and clean text strings",
        category: "Utilities",
        icon: Scissors,
        route: "/tools/string-trimmer",
        tags: ["trim", "clean", "string", "whitespace"]
    },
]

// Search function for autocomplete
export function searchTools(query: string): Tool[] {
    if (!query.trim()) return DUMMY_TOOLS.slice(0, 8) // Return first 8 tools if empty query

    const lowerQuery = query.toLowerCase()

    return DUMMY_TOOLS.filter((tool) => {
        return (
            tool.name.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery) ||
            tool.category.toLowerCase().includes(lowerQuery) ||
            tool.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        )
    }).slice(0, 8) // Limit to 8 results
}
