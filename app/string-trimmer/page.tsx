import type { Metadata } from "next";
import StringTrimmerContent from "@/features/string-trimmer";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "string-trimmer")!;

export const metadata: Metadata = {
    title: `${tool.name} - Clean Mesh Text Strings | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "trim", "whitespace", "clean", "text", "free", "online", "tool", "stylofront"],
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
    return <StringTrimmerContent />;
}
