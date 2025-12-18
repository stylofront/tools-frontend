import type { Metadata } from "next";
import JwtDecoderContent from "@/features/jwt-decoder";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "jwt-decoder")!;

export const metadata: Metadata = {
    title: `${tool.name} - Decode & Inspect JWTs | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "jwt", "token", "decode", "auth", "free", "online", "tool", "stylofront"],
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
    return <JwtDecoderContent />;
}
