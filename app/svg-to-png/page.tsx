import type { Metadata } from "next";
import SvgToPngContent from "@/features/svg-to-png";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "svg-to-png")!;

export const metadata: Metadata = {
    title: `${tool.name} - Convert SVG to PNG Online | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "svg", "png", "convert", "image", "free", "online", "tool", "stylofront"],
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
    return <SvgToPngContent />;
}
