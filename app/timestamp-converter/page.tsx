import type { Metadata } from "next";
import TimestampConverterContent from "@/features/timestamp-converter";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find(t => t.id === "timestamp-converter")!;

export const metadata: Metadata = {
    title: `${tool.name} - Epoch & Unix Date Converter | StyloFront Tools`,
    description: tool.description,
    keywords: [...tool.tags, "timestamp", "epoch", "date", "time", "free", "online", "tool", "stylofront"],
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
    return <TimestampConverterContent />;
}
