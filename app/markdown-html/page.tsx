import type { Metadata } from "next";
import MarkdownToHtmlContent from "@/features/markdown-html";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "markdown-html")!;

export const metadata: Metadata = {
    title: `${tool.name} - Convert MD to HTML | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "markdown", "html", "convert", "transform", "free", "online", "tool", "stylofront"],
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
    return <MarkdownToHtmlContent />;
}
