import type { Metadata } from "next";
import JsonToCsvContent from "@/features/json-to-csv";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "json-to-csv")!;

export const metadata: Metadata = {
    title: `${tool.name} - Convert JSON to CSV Online | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "json", "csv", "convert", "data", "free", "online", "tool", "stylofront"],
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
    return <JsonToCsvContent />;
}
