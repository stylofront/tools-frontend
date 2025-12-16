/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Enable static export for GitHub Pages
    output: 'export',
    // Set basePath conditionally:
    // - If BASE_PATH env var is explicitly set (even if empty), use it
    // - If custom domain (not github.io), use empty string
    // - Otherwise use /tools-frontend for GitHub Pages subdirectory
    basePath: (() => {
        // Check if BASE_PATH is explicitly set (handles empty string case)
        if ('BASE_PATH' in process.env) {
            return process.env.BASE_PATH || '';
        }
        // Check if custom domain
        if (process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('github.io')) {
            return '';
        }
        // Default: use /tools-frontend for production GitHub Pages
        return process.env.NODE_ENV === 'production' ? '/tools-frontend' : '';
    })(),
    // Set trailingSlash for GitHub Pages compatibility
    trailingSlash: true,
    // Disable image optimization for static export
    images: {
        unoptimized: true,
    },
    // Add empty turbopack config to silence the warning
    turbopack: {},
}

module.exports = nextConfig
