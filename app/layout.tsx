import type { Metadata } from 'next'
import { Outfit, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/header'
import Script from 'next/script'

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    weight: ['400', '500', '600', '700', '800', '900'],
    display: 'swap',
    preload: true,
})

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    preload: true,
})

export const metadata: Metadata = {
    title: {
        default: 'StyloFront Tools',
        template: '%s | StyloFront Tools',
    },
    description: 'Developer tools and utilities by StyloFront.',
    icons: {
        icon: [
            { url: '/tools-logo.png', sizes: '32x32', type: 'image/png' },
            { url: '/tools-logo.png', sizes: '16x16', type: 'image/png' },
        ],
        apple: [
            { url: '/tools-logo.png', sizes: '180x180', type: 'image/png' },
        ],
    },
    verification: {
        google: process.env.GOOGLE_SITE_VERIFICATION || 'googlef5c90b0ba34f5df5',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${spaceGrotesk.variable}`}>
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="og:image" content="/ogimage.png" />
                <meta name="twitter:image" content="/ogimage.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="StyloFront Tools" />
                <meta name="twitter:description" content="Developer tools and utilities by StyloFront." />
                <meta name="twitter:creator" content="@stylofront" />
                <meta name="twitter:site" content="@stylofront" />
                <meta name="twitter:url" content="https://tools.stylofront.com" />
                <meta name="twitter:image:alt" content="StyloFront Tools" />
                <link rel="manifest" href="/manifest.json" />
                {/* Google Search Console Verification */}
                <meta name="google-site-verification" content="googlef5c90b0ba34f5df5" />
                <link rel="icon" href="/tools-logo-t.png" />
            </head>
            <body className={`${spaceGrotesk.className} antialiased`}>
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-Z7LW9QYK3H"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z7LW9QYK3H');
          `}
                </Script>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">{children}</main>
                    </div>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
