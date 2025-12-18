import type { Metadata } from "next";
import BcryptGeneratorContent from "@/features/bcrypt-generator";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "bcrypt-generator")!;

export const metadata: Metadata = {
    title: `${tool.name} - Secure Password Hashing | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "bcrypt", "hash", "password", "security", "free", "online", "tool", "stylofront"],
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
    return <BcryptGeneratorContent />;
}
