import type { Metadata } from "next";
import Base64Content from "@/features/base64";

export const metadata: Metadata = {
    title: "Base64 Encoder/Decoder - Free Online Tool | StyloFront Tools",
    description: "Encode and decode Base64 strings instantly. Free online Base64 converter with UTF-8 support.",
    keywords: ["base64", "encoder", "decoder", "base64 encode", "base64 decode", "convert"],
    openGraph: {
        title: "Base64 Encoder/Decoder - Free Online",
        description: "Encode and decode Base64 strings instantly.",
        type: "website",
    },
};

export default function Base64Page() {
    return <Base64Content />;
}
