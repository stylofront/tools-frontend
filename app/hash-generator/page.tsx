import type { Metadata } from "next";
import HashGeneratorContent from "@/features/hash-generator";

export const metadata: Metadata = {
    title: "Hash Generator - SHA-1, SHA-256, SHA-512 | StyloFront Tools",
    description: "Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes online. Free cryptographic hash generator.",
    keywords: ["hash generator", "sha256", "sha512", "sha1", "crypto hash", "checksum"],
    openGraph: {
        title: "Hash Generator - SHA Hashes Online",
        description: "Generate cryptographic hashes instantly.",
        type: "website",
    },
};

export default function HashGeneratorPage() {
    return <HashGeneratorContent />;
}
