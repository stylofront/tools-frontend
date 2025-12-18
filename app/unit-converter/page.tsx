import type { Metadata } from "next";
import UnitConverterContent from "@/features/unit-converter";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "unit-converter")!;

export const metadata: Metadata = {
    title: `${tool.name} - Convert Units Online | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "unit", "convert", "measure", "calculate", "free", "online", "tool", "stylofront"],
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
    return <UnitConverterContent />;
}
