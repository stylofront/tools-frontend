import type { Metadata } from "next";
import PasswordGeneratorContent from "@/features/password-generator";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "password-generator")!;

export const metadata: Metadata = {
    title: `${tool.name} - Generate Secure Passwords | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "password", "generate", "secure", "random", "free", "online", "tool", "stylofront"],
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
    return <PasswordGeneratorContent />;
}
