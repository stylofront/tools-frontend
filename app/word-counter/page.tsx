import type { Metadata } from "next";
import WordCounterContent from "@/features/word-counter";

export const metadata: Metadata = {
    title: "Word Counter - Count Words, Characters Free | StyloFront Tools",
    description: "Free online word counter tool. Count words, characters, sentences, paragraphs, and get reading time estimates instantly.",
    keywords: ["word counter", "character counter", "word count", "text counter", "reading time", "free word counter"],
    openGraph: {
        title: "Word Counter - Count Words & Characters Free",
        description: "Count words, characters, sentences and get reading time estimates instantly.",
        type: "website",
        siteName: "StyloFront Tools",
    },
};

export default function WordCounterPage() {
    return <WordCounterContent />;
}
