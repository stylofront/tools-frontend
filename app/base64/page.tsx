import type { Metadata } from "next";
import Base64Content from "@/features/base64";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "base64")!;

export const metadata: Metadata = {
    title: `${tool.name} - Free Online Tool | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "base64", "encode", "decode", "free", "online", "tool", "stylofront"],
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

export default function Base64Page() {
    return <Base64Content />;
}
