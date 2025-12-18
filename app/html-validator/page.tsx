import type { Metadata } from "next";
import HtmlValidatorContent from "@/features/html-validator";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "html-validator")!;

export const metadata: Metadata = {
    title: `${tool.name} - Online HTML Checker | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "html", "validator", "seo", "audit", "free", "online", "tool", "stylofront"],
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
    return <HtmlValidatorContent />;
}
