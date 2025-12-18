import { MetadataRoute } from 'next'
import { TOOLS } from '@/lib/tools'

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

    // Base sitemap entries
    const sitemapEntries: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ]

    // Add tool entries from TOOLS array
    TOOLS.forEach((tool) => {
        // Only include available tools
        if (tool.isAvailable) {
            sitemapEntries.push({
                url: `${baseUrl}${tool.route}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: tool.isNew ? 0.9 : 0.8,
            })
        }
    })

    return sitemapEntries
}
