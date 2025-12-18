import type { Metadata } from "next";
import ColorTokensContent from "@/features/color-tokens";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "color-tokens")!;

export const metadata: Metadata = {
    title: `${tool.name} - Shadcn UI Color Generator | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "color", "tokens", "shadcn", "theme", "design", "free", "online", "tool", "stylofront"],
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
    return <ColorTokensContent />;
}
