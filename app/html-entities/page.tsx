import type { Metadata } from "next";
import HtmlEntitiesContent from "@/features/html-entities";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "html-entities")!;

export const metadata: Metadata = {
    title: `${tool.name} - Encode/Decode Entities | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "html", "entities", "encode", "decode", "free", "online", "tool", "stylofront"],
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
    return <HtmlEntitiesContent />;
}
