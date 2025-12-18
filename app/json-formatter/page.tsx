import type { Metadata } from "next";
import JsonFormatterContent from "@/features/json-formatter";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "json-formatter")!;

export const metadata: Metadata = {
    title: `${tool.name} - Prettify & Validate JSON | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "json", "formatter", "prettify", "validate", "free", "online", "tool", "stylofront"],
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
    return <JsonFormatterContent />;
}
