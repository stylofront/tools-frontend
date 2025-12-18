import type { Metadata } from "next";
import SecureTokenContent from "@/features/secure-token";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "secure-token")!;

export const metadata: Metadata = {
    title: `${tool.name} - Generate Secure API Tokens | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "token", "secure", "generator", "secret", "auth", "free", "online", "tool", "stylofront"],
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
    return <SecureTokenContent />;
}
