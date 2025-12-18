import type { Metadata } from "next";
import SqlFormatterContent from "@/features/sql-formatter";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "sql-formatter")!;

export const metadata: Metadata = {
    title: `${tool.name} - Beautify SQL Queries | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "sql", "formatter", "query", "beautify", "free", "online", "tool", "stylofront"],
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
    return <SqlFormatterContent />;
}
