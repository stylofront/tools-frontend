import type { Metadata } from "next";
import CodeMinifierContent from "@/features/code-minifier";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "code-minifier")!;

export const metadata: Metadata = {
    title: `${tool.name} - Minify JS, CSS, HTML | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "minify", "js", "css", "html", "optimize", "free", "online", "tool", "stylofront"],
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
    return <CodeMinifierContent />;
}
