import type { Metadata } from "next";
import LineCounterContent from "@/features/line-counter";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "line-counter")!;

export const metadata: Metadata = {
    title: `${tool.name} - Online Text Line Counter | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "count", "lines", "text", "free", "online", "tool", "stylofront"],
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
    return <LineCounterContent />;
}
