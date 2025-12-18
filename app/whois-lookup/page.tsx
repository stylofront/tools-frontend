import type { Metadata } from "next";
import WhoisLookupContent from "@/features/whois-lookup";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "whois-lookup")!;

export const metadata: Metadata = {
    title: `${tool.name} - Domain Registration Info | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "whois", "domain", "lookup", "dns", "free", "online", "tool", "stylofront"],
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
    return <WhoisLookupContent />;
}
