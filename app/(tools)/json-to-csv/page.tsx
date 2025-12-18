import type { Metadata } from "next";
import JsonToCsvContent from "@/features/json-to-csv";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "json-to-csv")!;

export const metadata: Metadata = {
    title: `${tool.name} - Online Utility`,
    description: tool.description,
    keywords: [...tool.tags, "developer tools", "online utilities", "free tools", "stylofront"],
    openGraph: {
        title: `${tool.name} - Multi-Purpose Tool`,
        description: tool.description,
        type: "website",
        url: `https://tools.stylofront.com${tool.route}`,
    },
    twitter: {
        card: "summary_large_image",
        title: `${tool.name} - Multi-Purpose Tool`,
        description: tool.description,
    },
};

export default function ToolPage() {
    return <JsonToCsvContent />;
}
