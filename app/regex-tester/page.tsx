import type { Metadata } from "next";
import RegexTesterContent from "@/features/regex-tester";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "regex-tester")!;

export const metadata: Metadata = {
    title: `${tool.name} - Test Regular Expressions | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "regex", "tester", "pattern", "match", "free", "online", "tool", "stylofront"],
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
    return <RegexTesterContent />;
}
