import type { Metadata } from "next";
import ExifRemoverContent from "@/features/exif-remover";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "exif-remover")!;

export const metadata: Metadata = {
    title: `${tool.name} - Remove Image Metadata | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "exif", "metadata", "privacy", "image", "free", "online", "tool", "stylofront"],
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
    return <ExifRemoverContent />;
}
