import type { Metadata } from "next";
import CsvToJsonContent from "@/features/csv-json";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "csv-json")!;

export const metadata: Metadata = {
    title: `${tool.name} - Convert CSV to JSON Online | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "csv", "json", "convert", "data", "free", "online", "tool", "stylofront"],
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
    return <CsvToJsonContent />;
}
