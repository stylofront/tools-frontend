import type { Metadata } from "next";
import SearchPageContent from "@/features/search";

export const metadata: Metadata = {
    title: "Search 40+ Developer Tools & Utilities",
    description: "Find the perfect developer tool for your needs. Search through our collection of 40+ utilities including image compressors, formatters, generators, and more.",
    keywords: ["search", "tools", "utility", "developer", "find", "toolbox", "formatter", "generator"],
    openGraph: {
        title: "Search Developer Tools - StyloFront Tools",
        description: "Find the right tool for your development needs. Fast and secure search through 40+ utilities.",
        type: "website",
        url: "https://tools.stylofront.com/search",
    },
};

export default function SearchPage() {
    return <SearchPageContent />;
}
