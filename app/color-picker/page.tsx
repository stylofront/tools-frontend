import type { Metadata } from "next";
import ColorPickerContent from "@/features/color-picker";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "color-picker")!;

export const metadata: Metadata = {
    title: `${tool.name} - Online Color Selector | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "color", "picker", "hex", "rgb", "design", "free", "online", "tool", "stylofront"],
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
    return <ColorPickerContent />;
}
