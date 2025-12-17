import type { Metadata } from "next";
import TextFormatterContent from "@/features/text-formatter";

export const metadata: Metadata = {
    title: "Text Formatter - Transform Text Cases Free | StyloFront Tools",
    description: "Free online text formatter. Convert to uppercase, lowercase, title case, camelCase, snake_case and more instantly.",
    keywords: ["text formatter", "case converter", "uppercase", "lowercase", "title case", "camelCase", "snake_case"],
    openGraph: {
        title: "Text Formatter - Transform Text Cases Free",
        description: "Convert text to any case format instantly. Free online tool.",
        type: "website",
        siteName: "StyloFront Tools",
    },
};

export default function TextFormatterPage() {
    return <TextFormatterContent />;
}
