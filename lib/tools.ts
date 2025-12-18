import {
    ImageIcon,
    QrCode,
    Palette,
    Type,
    FileText,
    GitCompare,
    Code2,
    FileCode,
    Globe,
    Calculator,
    Lock,
    Scissors,
    FileJson,
    Database,
    RefreshCw,
    Search as SearchIcon,
    Layers,
    ShieldCheck,
    FileSignature,
    Cpu,
    Clock,
    Terminal,
    Hash,
    Maximize,
    FolderTree,
    FileDigit,
    Layout,
    Key,
    Shield,
    Binary,
    LucideIcon
} from "lucide-react"

export interface Tool {
    id: string
    name: string
    description: string
    category: ToolCategory
    icon: LucideIcon
    route: string
    tags: string[]
    isAvailable: boolean
    isNew?: boolean
    isWasm?: boolean
}

export type ToolCategory =
    | "Image Tools"
    | "Text Tools"
    | "Code Tools"
    | "Converters"
    | "Security"
    | "Utility"
    | "SEO Tools"

export const TOOL_CATEGORIES: ToolCategory[] = [
    "Image Tools",
    "Text Tools",
    "Code Tools",
    "Converters",
    "Security",
    "Utility",
    "SEO Tools",
]

export const TOOLS: Tool[] = [
    // --- Image Tools ---
    {
        id: "image-compressor",
        name: "Image Compressor",
        description: "Compress images instantly with Rust + WebAssembly",
        category: "Image Tools",
        icon: ImageIcon,
        route: "/image-compressor",
        tags: ["image", "compress", "optimize", "wasm"],
        isAvailable: true,
        isWasm: true,
    },
    {
        id: "qr-generator",
        name: "QR Code Generator",
        description: "Generate custom QR codes instantly",
        category: "Image Tools",
        icon: QrCode,
        route: "/qr-generator",
        tags: ["qr", "code", "generate", "barcode"],
        isAvailable: true,
    },
    {
        id: "color-picker",
        name: "Color Picker",
        description: "Pick and convert colors in any format",
        category: "Image Tools",
        icon: Palette,
        route: "/color-picker",
        tags: ["color", "picker", "hex", "rgb", "palette"],
        isAvailable: true,
    },
    {
        id: "svg-to-png",
        name: "SVG to PNG",
        description: "Convert SVG vectors to PNG images",
        category: "Image Tools",
        icon: Layers,
        route: "/svg-to-png",
        tags: ["svg", "png", "convert", "image"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "image-resizer",
        name: "Image Resizer",
        description: "Resize and crop images with precision",
        category: "Image Tools",
        icon: Maximize,
        route: "/image-resizer",
        tags: ["resize", "crop", "image", "dimensions"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "exif-remover",
        name: "EXIF Remover",
        description: "Remove metadata from images for privacy",
        category: "Image Tools",
        icon: Shield,
        route: "/exif-remover",
        tags: ["exif", "metadata", "privacy", "image"],
        isAvailable: true,
        isNew: true,
    },

    // --- Text Tools ---
    {
        id: "text-formatter",
        name: "Text Formatter",
        description: "Format and transform text with ease",
        category: "Text Tools",
        icon: Type,
        route: "/text-formatter",
        tags: ["text", "format", "case", "transform"],
        isAvailable: true,
    },
    {
        id: "word-counter",
        name: "Word Counter",
        description: "Count words, characters, and lines",
        category: "Text Tools",
        icon: FileText,
        route: "/word-counter",
        tags: ["word", "count", "character", "line"],
        isAvailable: true,
    },
    {
        id: "text-diff",
        name: "Text Diff Checker",
        description: "Compare two texts and find differences",
        category: "Text Tools",
        icon: GitCompare,
        route: "/text-diff",
        tags: ["diff", "compare", "text", "difference"],
        isAvailable: true,
        isWasm: true,
    },
    {
        id: "case-converter",
        name: "Case Converter",
        description: "Convert text between upper, lower, camel cases",
        category: "Text Tools",
        icon: RefreshCw,
        route: "/case-converter",
        tags: ["case", "uppercase", "lowercase", "camelcase"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "duplicate-remover",
        name: "Duplicate Remover",
        description: "Remove duplicate lines from your text",
        category: "Text Tools",
        icon: Scissors,
        route: "/duplicate-remover",
        tags: ["duplicate", "lines", "clean", "text"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "lorem-ipsum",
        name: "Lorem Ipsum",
        description: "Generate placeholder text for layouts",
        category: "Text Tools",
        icon: Type,
        route: "/lorem-ipsum",
        tags: ["lorem", "ipsum", "placeholder", "text"],
        isAvailable: true,
    },

    // --- Code Tools ---
    {
        id: "json-formatter",
        name: "JSON Formatter",
        description: "Format and validate JSON data",
        category: "Code Tools",
        icon: FileJson,
        route: "/json-formatter",
        tags: ["json", "format", "validate", "prettify"],
        isAvailable: true,
        isWasm: true,
    },
    {
        id: "code-minifier",
        name: "Code Minifier",
        description: "Minify JS, CSS, and HTML code",
        category: "Code Tools",
        icon: Binary,
        route: "/code-minifier",
        tags: ["minify", "js", "css", "html", "code"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "sql-formatter",
        name: "SQL Formatter",
        description: "Beautify and format SQL queries",
        category: "Code Tools",
        icon: Database,
        route: "/sql-formatter",
        tags: ["sql", "query", "format", "beautify"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "regex-tester",
        name: "Regex Tester",
        description: "Test and validate regular expressions",
        category: "Code Tools",
        icon: Code2,
        route: "/regex-tester",
        tags: ["regex", "pattern", "test", "match"],
        isAvailable: true,
        isWasm: true,
    },
    {
        id: "base64",
        name: "Base64 Encoder",
        description: "Encode/Decode Base64 strings",
        category: "Code Tools",
        icon: FileCode,
        route: "/base64",
        tags: ["base64", "encode", "decode", "convert"],
        isAvailable: true,
    },
    {
        id: "url-encoder",
        name: "URL Encoder",
        description: "Encode/Decode URL strings",
        category: "Code Tools",
        icon: Globe,
        route: "/url-encoder",
        tags: ["url", "encode", "decode", "uri"],
        isAvailable: true,
    },

    // --- Converters ---
    {
        id: "markdown-html",
        name: "Markdown to HTML",
        description: "Convert Markdown to clean HTML",
        category: "Converters",
        icon: FileDigit,
        route: "/markdown-html",
        tags: ["markdown", "html", "convert", "transform"],
        isAvailable: true,
        isWasm: true,
    },
    {
        id: "yaml-json",
        name: "YAML to JSON",
        description: "Convert between YAML and JSON formats",
        category: "Converters",
        icon: RefreshCw,
        route: "/yaml-json",
        tags: ["yaml", "json", "convert"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "csv-json",
        name: "CSV to JSON",
        description: "Convert CSV data to JSON objects",
        category: "Converters",
        icon: FileJson,
        route: "/csv-json",
        tags: ["csv", "json", "convert", "data"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "unit-converter",
        name: "Unit Converter",
        description: "Convert between common units",
        category: "Converters",
        icon: Calculator,
        route: "/unit-converter",
        tags: ["unit", "convert", "measure", "calculate"],
        isAvailable: true,
    },

    // --- Security ---
    {
        id: "password-generator",
        name: "Password Generator",
        description: "Generate strong, secure passwords",
        category: "Security",
        icon: Key,
        route: "/password-generator",
        tags: ["password", "generate", "secure", "random"],
        isAvailable: true,
        isWasm: true,
    },
    {
        id: "hash-generator",
        name: "Hash Generator",
        description: "Generate MD5, SHA-256 hashes",
        category: "Security",
        icon: Hash,
        route: "/hash-generator",
        tags: ["hash", "md5", "sha", "encrypt"],
        isAvailable: true,
        isWasm: true,
    },
    {
        id: "bcrypt-generator",
        name: "Bcrypt Hash",
        description: "Generate and verify Bcrypt hashes",
        category: "Security",
        icon: ShieldCheck,
        route: "/bcrypt-generator",
        tags: ["bcrypt", "hash", "password", "security"],
        isAvailable: true,
        isNew: true,
        isWasm: true,
    },
    {
        id: "jwt-decoder",
        name: "JWT Decoder",
        description: "Decode and inspect JWT tokens",
        category: "Security",
        icon: FileSignature,
        route: "/jwt-decoder",
        tags: ["jwt", "token", "decode", "auth"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "password-strength",
        name: "Password Strength",
        description: "Analyze and test your password security",
        category: "Security",
        icon: ShieldCheck,
        route: "/password-strength",
        tags: ["password", "strength", "security", "leak"],
        isAvailable: true,
        isNew: true,
    },

    // --- Utility ---
    {
        id: "uuid-generator",
        name: "UUID Generator",
        description: "Generate version 4 unique IDs",
        category: "Utility",
        icon: FileDigit,
        route: "/uuid-generator",
        tags: ["uuid", "guid", "generate", "unique"],
        isAvailable: true,
    },
    {
        id: "timestamp-converter",
        name: "Epoch Converter",
        description: "Convert UNIX timestamps to dates",
        category: "Utility",
        icon: Clock,
        route: "/timestamp-converter",
        tags: ["timestamp", "epoch", "date", "time"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "favicon-generator",
        name: "Favicon Gen",
        description: "Generate favicons for websites",
        category: "Utility",
        icon: Layout,
        route: "/favicon-generator",
        tags: ["favicon", "icon", "website", "generate"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "whois-lookup",
        name: "Whois Lookup",
        description: "Get domain registration info",
        category: "Utility",
        icon: SearchIcon,
        route: "/whois-lookup",
        tags: ["whois", "domain", "lookup", "info"],
        isAvailable: true,
        isNew: true,
    },

    // --- SEO Tools ---
    {
        id: "robots-generator",
        name: "Robots.txt Gen",
        description: "Generate robots.txt for SEO",
        category: "SEO Tools",
        icon: Cpu,
        route: "/robots-generator",
        tags: ["seo", "robots", "crawler", "search"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "sitemap-generator",
        name: "Sitemap Gen",
        description: "Generate XML sitemaps easily",
        category: "SEO Tools",
        icon: FolderTree,
        route: "/sitemap-generator",
        tags: ["seo", "sitemap", "xml", "search"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "html-validator",
        name: "HTML Validator",
        description: "Check HTML for SEO and errors",
        category: "SEO Tools",
        icon: ShieldCheck,
        route: "/html-validator",
        tags: ["seo", "html", "validate", "audit"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "meta-tag-generator",
        name: "Meta Tag Gen",
        description: "Generate SEO meta tags",
        category: "SEO Tools",
        icon: Terminal,
        route: "/meta-tag-generator",
        tags: ["seo", "meta", "tags", "social"],
        isAvailable: true,
        isNew: true,
    },

    // Adding more to reach 40...
    {
        id: "json-to-csv",
        name: "JSON to CSV",
        description: "Convert JSON arrays to CSV",
        category: "Converters",
        icon: RefreshCw,
        route: "/json-to-csv",
        tags: ["json", "csv", "convert"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "string-trimmer",
        name: "Trim Whitespace",
        description: "Clean up messy text strings",
        category: "Text Tools",
        icon: Scissors,
        route: "/string-trimmer",
        tags: ["trim", "clean", "whitespace"],
        isAvailable: true,
    },
    {
        id: "html-entities",
        name: "HTML Entities",
        description: "Encode/Decode HTML entities",
        category: "Text Tools",
        icon: Code2,
        route: "/html-entities",
        tags: ["html", "entities", "encode", "decode"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "domain-ip",
        name: "Domain to IP",
        description: "Find the IP address of any domain",
        category: "SEO Tools",
        icon: Globe,
        route: "/domain-ip",
        tags: ["dns", "ip", "domain", "lookup"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "line-counter",
        name: "Line Counter",
        description: "Count total lines in a text",
        category: "Text Tools",
        icon: FileText,
        route: "/line-counter",
        tags: ["count", "lines", "text"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "secure-token",
        name: "Token Generator",
        description: "Generate secure random tokens",
        category: "Security",
        icon: Key,
        route: "/secure-token",
        tags: ["token", "secure", "random", "auth"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "gradient-generator",
        name: "Gradient Generator",
        description: "Create beautiful CSS gradients visually",
        category: "Image Tools",
        icon: Palette,
        route: "/gradient-generator",
        tags: ["gradient", "css", "color", "design"],
        isAvailable: true,
        isNew: true,
    },
    {
        id: "color-tokens",
        name: "Color Tokens Gen",
        description: "Generate shadcn/ui compatible color tokens",
        category: "Utility",
        icon: Layers,
        route: "/color-tokens",
        tags: ["color", "tokens", "shadcn", "theme"],
        isAvailable: true,
        isNew: true,
    },
]

// Utilities for searching and filtering
export function searchTools(query: string): Tool[] {
    if (!query.trim()) return TOOLS.slice(0, 8)

    const lowerQuery = query.toLowerCase()

    return TOOLS.filter((tool) => {
        return (
            tool.name.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery) ||
            tool.category.toLowerCase().includes(lowerQuery) ||
            tool.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        )
    }).slice(0, 12)
}

export function getAvailableTools(): Tool[] {
    return TOOLS.filter((t) => t.isAvailable)
}

export function getToolsByCategory(category: ToolCategory | "All"): Tool[] {
    if (category === "All") return TOOLS
    return TOOLS.filter((t) => t.category === category)
}
