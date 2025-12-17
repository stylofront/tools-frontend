import type { Metadata } from "next";
import StringTrimmerContent from "@/features/string-trimmer";

export const metadata: Metadata = {
    title: "String Trimmer - Clean Text Online Free | StyloFront Tools",
    description: "Free online string trimmer. Remove extra spaces, trim whitespace, remove duplicates, and sort lines instantly.",
    keywords: ["string trimmer", "trim text", "remove whitespace", "clean text", "remove duplicates"],
    openGraph: {
        title: "String Trimmer - Clean Text Online Free",
        description: "Remove extra spaces, duplicates, and clean up your text instantly.",
        type: "website",
    },
};

export default function StringTrimmerPage() {
    return <StringTrimmerContent />;
}
