import type { Metadata } from "next";
import PasswordStrengthContent from "@/features/password-strength";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "password-strength")!;

export const metadata: Metadata = {
    title: `${tool.name} - Test Password Security | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "password", "strength", "security", "leak", "free", "online", "tool", "stylofront"],
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
    return <PasswordStrengthContent />;
}
