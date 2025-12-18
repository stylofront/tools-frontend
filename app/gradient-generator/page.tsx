import type { Metadata } from "next";
import GradientGeneratorContent from "@/features/gradient-generator";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "gradient-generator")!;

export const metadata: Metadata = {
    title: `${tool.name} - Visual CSS Designer | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "gradient", "css", "color", "design", "free", "online", "tool", "stylofront"],
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
    return <GradientGeneratorContent />;
}
