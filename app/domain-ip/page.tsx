import type { Metadata } from "next";
import DomainIpContent from "@/features/domain-ip";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "domain-ip")!;

export const metadata: Metadata = {
    title: `${tool.name} - Domain to IP Lookup | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "dns", "ip", "domain", "lookup", "free", "online", "tool", "stylofront"],
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
    return <DomainIpContent />;
}
