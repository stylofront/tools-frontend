import type { Metadata } from "next";
import QrGeneratorContent from "@/features/qr-generator";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "qr-generator")!;

export const metadata: Metadata = {
    title: `${tool.name} - Create Custom QR Codes | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "qr", "generator", "design", "barcode", "free", "online", "tool", "stylofront"],
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
    return <QrGeneratorContent />;
}
