import type { Metadata } from "next";
import WordCounterContent from "@/features/word-counter";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "word-counter")!;

export const metadata: Metadata = {
    title: `${tool.name} - Count Words & Characters | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "word", "count", "character", "length", "free", "online", "tool", "stylofront"],
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
    return <WordCounterContent />;
}
