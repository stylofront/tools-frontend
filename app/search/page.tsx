import type { Metadata } from "next";
import SearchPageContent from "@/features/search";

export const metadata: Metadata = {
    title: "Search Developer Tools | StyloFront Tools",
    description: "Search all developer tools and utilities within the StyloFront platform.",
    keywords: ["search", "tools", "utility", "developer", "find"],
    openGraph: {
        title: "Search Developer Tools - StyloFront Tools",
        description: "Find the right tool for your development needs.",
        type: "website",
        url: "https://tools.stylofront.com/search",
    },
};

export default function SearchPage() {
    return <SearchPageContent />;
}
