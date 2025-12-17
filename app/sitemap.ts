import { MetadataRoute } from 'next'

// Required for static export
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    // Safely get base URL with validation
    let baseUrl = 'https://tools.stylofront.com'

    // Validate URL format
    try {
        new URL(baseUrl)
    } catch {
        baseUrl = 'https://tools.stylofront.com'
    }

    // All tool routes
    const tools = [
        'base64',
        'color-picker',
        'hash-generator',
        'image-compressor',
        'json-formatter',
        'lorem-ipsum',
        'markdown-html',
        'password-generator',
        'qr-generator',
        'regex-tester',
        'search',
        'string-trimmer',
        'text-diff',
        'text-formatter',
        'unit-converter',
        'url-encoder',
        'uuid-generator',
        'word-counter',
    ]

    // Base sitemap entries
    const sitemapEntries: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ]

    // Add tool entries
    tools.forEach((tool) => {
        sitemapEntries.push({
            url: `${baseUrl}/${tool}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        })
    })

    return sitemapEntries
}
