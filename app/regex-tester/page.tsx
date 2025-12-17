import type { Metadata } from "next";
import RegexTesterContent from "@/features/regex-tester";

export const metadata: Metadata = {
    title: "Regex Tester - Test Regular Expressions | StyloFront Tools",
    description: "Test and validate regular expressions with real-time matching. Free online regex tester with highlighting.",
    keywords: ["regex tester", "regular expression", "regex validator", "pattern matching", "regex online"],
    openGraph: {
        title: "Regex Tester - Test Regular Expressions",
        description: "Test and validate regex patterns instantly.",
        type: "website",
    },
};

export default function RegexTesterPage() {
    return <RegexTesterContent />;
}
