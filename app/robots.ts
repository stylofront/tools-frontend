import { MetadataRoute } from 'next'

// Required for static export
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    // Safely get base URL with validation
    let baseUrl = 'https://tools.stylofront.com'

    // Validate URL format
    try {
        new URL(baseUrl)
    } catch {
        baseUrl = 'https://tools.stylofront.com'
    }

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
