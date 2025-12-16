import type { Metadata } from 'next'
import { Outfit, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/header'

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
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${spaceGrotesk.variable}`}>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/tools-logo-t.png" />
            </head>
            <body className={`${spaceGrotesk.className} antialiased`}>
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
