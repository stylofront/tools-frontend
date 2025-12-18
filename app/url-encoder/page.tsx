import type { Metadata } from "next";
import UrlEncoderContent from "@/features/url-encoder";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "url-encoder")!;

export const metadata: Metadata = {
    title: `${tool.name} - Encode/Decode URL Strings | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "url", "encode", "decode", "uri", "free", "online", "tool", "stylofront"],
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
    return <UrlEncoderContent />;
}
