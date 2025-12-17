import type { Metadata } from "next";
import JsonFormatterContent from "@/features/json-formatter";

export const metadata: Metadata = {
    title: "JSON Formatter - Format, Validate, Minify | StyloFront Tools",
    description: "Format, validate, and minify JSON data online. Free JSON beautifier with syntax validation.",
    keywords: ["json formatter", "json beautifier", "json validator", "json minifier", "format json"],
    openGraph: {
        title: "JSON Formatter - Format & Validate JSON",
        description: "Format, validate, and minify JSON data instantly.",
        type: "website",
    },
};

export default function JsonFormatterPage() {
    return <JsonFormatterContent />;
}
