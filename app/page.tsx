import type { Metadata } from "next";
import HomePageContent from "@/features/home";

export const metadata: Metadata = {
    title: "StyloFront Tools - Premium All-in-One Developer Utilities",
    description: "Instant access to 40+ high-performance developer tools. Image compression, JWT decoding, code minification, and more. 100% free and secure.",
    keywords: ["developer tools", "online utilities", "image compressor", "jwt decoder", "code formatter", "seo tools", "free online tools"],
    openGraph: {
        title: "StyloFront Tools - Premium All-in-One Developer Utilities",
        description: "The ultimate toolbox for designers and developers. Fast, secure, and free.",
        type: "website",
        url: "https://tools.stylofront.com",
    },
    twitter: {
        card: "summary_large_image",
        title: "StyloFront Tools - All-in-One Toolbox",
        description: "Level up your workflow with our production-grade developer tools.",
    },
};

export default function Home() {
    return <HomePageContent />;
}
