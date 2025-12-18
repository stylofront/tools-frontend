import type { Metadata } from "next";
import HashGeneratorContent from "@/features/hash-generator";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "hash-generator")!;

export const metadata: Metadata = {
    title: `${tool.name} - SHA-256, MD5 Online | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "hash", "md5", "sha256", "checksum", "security", "free", "online", "tool", "stylofront"],
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
    return <HashGeneratorContent />;
}
