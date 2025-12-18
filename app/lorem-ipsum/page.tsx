import type { Metadata } from "next";
import LoremIpsumContent from "@/features/lorem-ipsum";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "lorem-ipsum")!;

export const metadata: Metadata = {
    title: `${tool.name} - Placeholder Text Generator | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "lorem", "ipsum", "placeholder", "text", "free", "online", "tool", "stylofront"],
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
    return <LoremIpsumContent />;
}
