import type { Metadata } from "next";
import TextFormatterContent from "@/features/text-formatter";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "text-formatter")!;

export const metadata: Metadata = {
    title: `${tool.name} - Format & Transform Text | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "text", "format", "transform", "case", "free", "online", "tool", "stylofront"],
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
    return <TextFormatterContent />;
}
