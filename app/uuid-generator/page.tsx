import type { Metadata } from "next";
import UuidGeneratorContent from "@/features/uuid-generator";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "uuid-generator")!;

export const metadata: Metadata = {
    title: `${tool.name} - Generate Unique IDs | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "uuid", "guid", "generator", "id", "free", "online", "tool", "stylofront"],
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
    return <UuidGeneratorContent />;
}
