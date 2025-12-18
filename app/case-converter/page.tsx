import type { Metadata } from "next";
import CaseConverterContent from "@/features/case-converter";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "case-converter")!;

export const metadata: Metadata = {
    title: `${tool.name} - Change Text Case Online | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "text", "case", "converter", "uppercase", "lowercase", "free", "online", "tool", "stylofront"],
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
    return <CaseConverterContent />;
}
