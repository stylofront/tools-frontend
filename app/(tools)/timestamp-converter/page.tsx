import type { Metadata } from "next";
import TimestampConverterContent from "@/features/timestamp-converter";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "timestamp-converter")!;

export const metadata: Metadata = {
    title: `${tool.name} - Online Utility`,
    description: tool.description,
    keywords: [...tool.tags, "developer tools", "online utilities", "free tools", "stylofront"],
    openGraph: {
        title: `${tool.name} - Multi-Purpose Tool`,
        description: tool.description,
        type: "website",
        url: `https://tools.stylofront.com${tool.route}`,
    },
    twitter: {
        card: "summary_large_image",
        title: `${tool.name} - Multi-Purpose Tool`,
        description: tool.description,
    },
};

export default function ToolPage() {
    return <TimestampConverterContent />;
}
