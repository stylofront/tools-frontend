import type { Metadata } from "next";
import MetaTagGeneratorContent from "@/features/meta-tag-generator";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "meta-tag-generator")!;

export const metadata: Metadata = {
    title: `${tool.name} - SEO Meta Tags Maker | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "seo", "meta", "tags", "social", "free", "online", "tool", "stylofront"],
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
    return <MetaTagGeneratorContent />;
}
