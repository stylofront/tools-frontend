import type { Metadata } from "next";
import DuplicateRemoverContent from "@/features/duplicate-remover";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "duplicate-remover")!;

export const metadata: Metadata = {
    title: `${tool.name} - Remove Duplicate Lines | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "duplicate", "remover", "text", "clean", "free", "online", "tool", "stylofront"],
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
    return <DuplicateRemoverContent />;
}
