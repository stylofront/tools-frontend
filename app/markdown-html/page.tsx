import type { Metadata } from "next";
import MarkdownHtmlContent from "@/features/markdown-html";

export const metadata: Metadata = {
    title: "Markdown to HTML - Convert MD to HTML | StyloFront Tools",
    description: "Convert Markdown to HTML instantly with live preview. Free online markdown converter.",
    keywords: ["markdown to html", "md to html", "markdown converter", "markdown preview", "html generator"],
    openGraph: {
        title: "Markdown to HTML Converter",
        description: "Convert Markdown to HTML with live preview.",
        type: "website",
    },
};

export default function MarkdownHtmlPage() {
    return <MarkdownHtmlContent />;
}
