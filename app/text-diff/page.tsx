import type { Metadata } from "next";
import TextDiffContent from "@/features/text-diff";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "text-diff")!;

export const metadata: Metadata = {
    title: `${tool.name} - Compare Text Differences | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "diff", "compare", "text", "difference", "free", "online", "tool", "stylofront"],
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
    return <TextDiffContent />;
}
