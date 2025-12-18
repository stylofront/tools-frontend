import type { Metadata } from "next";
import ImageCompressorContent from "@/features/image-compressor";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "image-compressor")!;

export const metadata: Metadata = {
    title: `${tool.name} - Online Image Optimizer | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "image", "compress", "optimize", "wasm", "free", "online", "tool", "stylofront"],
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
    return <ImageCompressorContent />;
}
