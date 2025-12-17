import type { Metadata } from "next";
import TextDiffContent from "@/features/text-diff";

export const metadata: Metadata = {
    title: "Text Diff Checker - Compare Texts Online | StyloFront Tools",
    description: "Compare two texts and find differences instantly. Free online diff checker with split and inline views.",
    keywords: ["text diff", "compare text", "diff checker", "text comparison", "find differences"],
    openGraph: {
        title: "Text Diff Checker - Compare Texts Online",
        description: "Find differences between two texts instantly.",
        type: "website",
    },
};

export default function TextDiffPage() {
    return <TextDiffContent />;
}
