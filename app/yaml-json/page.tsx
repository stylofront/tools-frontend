import type { Metadata } from "next";
import YamlToJsonContent from "@/features/yaml-json";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "yaml-json")!;

export const metadata: Metadata = {
    title: `${tool.name} - Convert YAML to JSON | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "yaml", "json", "convert", "config", "free", "online", "tool", "stylofront"],
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
    return <YamlToJsonContent />;
}
