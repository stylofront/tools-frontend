import type { Metadata } from "next";
import RobotsGeneratorContent from "@/features/robots-generator";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "robots-generator")!;

export const metadata: Metadata = {
    title: `${tool.name} - SEO Robots.txt Maker | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "robots", "seo", "generator", "crawler", "free", "online", "tool", "stylofront"],
    openGraph: {
        title: `${tool.name} - StyloFront Tools`,
        description: tool.description,
        type: "website",
        url: `https://tools.stylofront.com${tool.route}`,
    },
    twitter: {
        card: "summary_large_image",
        title: `${tool.name} - StyloFront Tools`,
        description: tool.description,
    },
};

export default function ToolPage() {
    return <RobotsGeneratorContent />;
}
