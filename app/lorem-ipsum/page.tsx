import type { Metadata } from "next";
import LoremIpsumContent from "@/features/lorem-ipsum";

export const metadata: Metadata = {
    title: "Lorem Ipsum Generator - Placeholder Text Free | StyloFront Tools",
    description: "Generate lorem ipsum placeholder text for your designs. Create paragraphs, sentences, or words instantly.",
    keywords: ["lorem ipsum", "placeholder text", "dummy text", "filler text", "text generator"],
    openGraph: {
        title: "Lorem Ipsum Generator - Placeholder Text",
        description: "Generate placeholder text for your designs instantly.",
        type: "website",
    },
};

export default function LoremIpsumPage() {
    return <LoremIpsumContent />;
}
