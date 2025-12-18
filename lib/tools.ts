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
        description: "Compress and optimize your images instantly with high-quality results. Our Rust-powered tool reduces file size without losing quality, perfect for web optimization.",
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
        description: "Generate custom, high-resolution QR codes for URLs, text, or contact info instantly. Perfect for marketing materials, websites, and business cards.",
        category: "Image Tools",
        icon: QrCode,
        route: "/qr-generator",
        tags: ["qr", "code", "generate", "barcode"],
        isAvailable: true,
    },
    {
        id: "color-picker",
        name: "Color Picker",
        description: "Professional color picker and palette generator. Extract HEX, RGB, HSL, and CMYK values with ease. A must-have tool for designers and front-end developers.",
        category: "Image Tools",
        icon: Palette,
        route: "/color-picker",
        tags: ["color", "picker", "hex", "rgb", "palette"],
        isAvailable: true,
    },
    {
        id: "svg-to-png",
        name: "SVG to PNG",
        description: "Convert scalable vector graphics (SVG) to high-quality PNG images instantly. Preserve transparency and clarity with our fast, browser-based conversion tool.",
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
        description: "Batch resize and crop your images with pixel-perfect precision. Adjust dimensions for social media, web, or print while maintaining the perfect aspect ratio.",
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
        description: "Protect your privacy by stripping sensitive EXIF metadata from your photos. Remove GPS coordinates, camera settings, and personal data before sharing online.",
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
        description: "Easily clean and transform your text with multiple formatting options. Remove extra spaces, fix line breaks, and prettify messy content in seconds.",
        category: "Text Tools",
        icon: Type,
        route: "/text-formatter",
        tags: ["text", "format", "case", "transform"],
        isAvailable: true,
    },
    {
        id: "word-counter",
        name: "Word Counter",
        description: "Advanced word and character counter with real-time statistics. Track word count, character count, sentence count, and estimated reading time precisely.",
        category: "Text Tools",
        icon: FileText,
        route: "/word-counter",
        tags: ["word", "count", "character", "line"],
        isAvailable: true,
    },
    {
        id: "text-diff",
        name: "Text Diff Checker",
        description: "Compare two pieces of text side-by-side to highlight differences instantly. Perfect for reviewing code changes, document versions, or repetitive content.",
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
        description: "Instant text case conversion between UPPERCASE, lowercase, camelCase, PascalCase, and more. Clean up your variable names or document headings easily.",
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
        description: "Quickly remove duplicate lines or items from any list. Clean up your datasets, email lists, or code logs with our efficient deduplication utility.",
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
        description: "Generate customized placeholder text for your designs and mockups. Choose word, sentence, or paragraph counts to perfectly fit your layout needs.",
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
        description: "Format, validate, and prettify JSON data instantly. Turn messy JSON strings into readable, well-structured objects with syntax highlighting and error checking.",
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
        description: "Reduce file size for JavaScript, CSS, and HTML by removing unnecessary characters. Optimize your website performance with our fast code minification tool.",
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
        description: "Professional SQL query beautifier. Format complex SQL queries for better readability across various dialects including MySQL, PostgreSQL, and SQL Server.",
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
        description: "Test and debug regular expressions in real-time. Validate your patterns against sample text with instant results and clear highlight markers.",
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
        description: "Encode and decode text or files to Base64 format securely. Essential for data transmission, embedding images, or handling binary data in web apps.",
        category: "Code Tools",
        icon: FileCode,
        route: "/base64",
        tags: ["base64", "encode", "decode", "convert"],
        isAvailable: true,
    },
    {
        id: "url-encoder",
        name: "URL Encoder",
        description: "Encode and decode URLs to ensure safe transmission of web data. Safely handle special characters and parameters for clean, valid URI strings.",
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
        description: "Convert Markdown syntax to clean, semantic HTML instantly. Perfect for blog posts, documentation, and previewing README files with ease.",
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
        description: "Seamlessly convert between YAML and JSON formats. Transition your configuration files between formats while maintaining structure and data integrity.",
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
        description: "Convert CSV data to structured JSON objects instantly. Transform spreadsheet data into developer-friendly formats for API testing or database imports.",
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
        description: "All-in-one converter for length, weight, temperature, and more. Get accurate conversions across metric and imperial systems with our simple interface.",
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
        description: "Create ultra-secure, random passwords with cryptographic strength. Customize length and complexity to protect your accounts from brute-force attacks.",
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
        description: "Generate secure cryptographic hashes like MD5, SHA-256, and SHA-512. Perfect for verifying file integrity or securely storing sensitive data identifiers.",
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
        description: "Generate and verify Bcrypt hashes for production-grade security. Used by professional developers for secure password hashing and authentication flows.",
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
        description: "Decode and inspect JSON Web Tokens (JWT) safely. View header and payload data instantly without sending your sensitive tokens to any server.",
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
        description: "Analyze the security level of your passwords. Get instant feedback on entropy, complexity, and potential vulnerabilities to keep your data safe.",
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
        description: "Generate unique version 4 UUIDs (GUIDs) instantly. Reliable and cryptographically secure identifiers for your database entries and software projects.",
        category: "Utility",
        icon: FileDigit,
        route: "/uuid-generator",
        tags: ["uuid", "guid", "generate", "unique"],
        isAvailable: true,
    },
    {
        id: "timestamp-converter",
        name: "Epoch Converter",
        description: "Convert UNIX timestamps to human-readable dates and vice-versa. Easily handle time zones and various time formats for your development projects.",
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
        description: "Create professional favicons for your website from images or text. Generate all necessary sizes and formats, including ICO and PNG files, in seconds.",
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
        description: "Perform instant WHOIS lookups to get domain registration details. Check ownership, expiration dates, and nameserver info for any domain name.",
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
        description: "Easily generate custom robots.txt files to manage search engine crawling. Protect sensitive areas of your site and improve SEO with proper directives.",
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
        description: "Generate XML sitemaps to help search engines index your website efficiently. Ensure all your important pages are discovered and ranked properly.",
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
        description: "Check your HTML code for errors and SEO best practices. Improve page load speed and search ranking by ensuring clean, valid, and semantic markup.",
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
        description: "Generate all essential SEO meta tags including Title, Description, and Open Graph. Boost your site's social sharing and search engine appearance.",
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
        description: "Convert JSON data structures to flat CSV files effortlessly. Perfect for exporting data for spreadsheets or simple database migrations.",
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
        description: "Quickly remove leading, trailing, and extra whitespaces from any text. Clean up your data and ensure consistency in your strings and logs.",
        category: "Text Tools",
        icon: Scissors,
        route: "/string-trimmer",
        tags: ["trim", "clean", "whitespace"],
        isAvailable: true,
    },
    {
        id: "html-entities",
        name: "HTML Entities",
        description: "Safely encode and decode HTML entities to prevent rendering issues. Convert special characters to their HTML-safe equivalent and vice-versa.",
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
        description: "Convert any domain name into its corresponding IP address instantly. Useful for DNS troubleshooting, server configuration, and network debugging.",
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
        description: "Count total lines, non-empty lines, and character density in your text documents. A simple yet powerful utility for code analysis and document review.",
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
        description: "Generate cryptographically secure tokens for authentication, API keys, and session management. Choose from various formats including HEX and Base64.",
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
        description: "Design stunning linear and radial CSS gradients visually. Copy production-ready CSS code and level up your web designs with beautiful color transitions.",
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
        description: "Generate professional shadcn/ui compatible color tokens from any base color. Create consistent, accessible themes for your modern web applications.",
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
