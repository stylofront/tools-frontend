import type { Metadata } from "next";
import UrlEncoderContent from "@/features/url-encoder";

export const metadata: Metadata = {
    title: "URL Encoder/Decoder - Free Online Tool | StyloFront Tools",
    description: "Encode and decode URL strings instantly. Handle special characters and query parameters safely.",
    keywords: ["url encoder", "url decoder", "percent encoding", "uri encode", "query string"],
    openGraph: {
        title: "URL Encoder/Decoder - Free Online",
        description: "Encode and decode URL strings instantly.",
        type: "website",
    },
};

export default function UrlEncoderPage() {
    return <UrlEncoderContent />;
}
