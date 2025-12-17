import type { Metadata } from "next";
import UUIDGeneratorContent from "@/features/uuid-generator";

export const metadata: Metadata = {
    title: "UUID Generator - Generate Unique IDs Free | StyloFront Tools",
    description: "Generate UUID v4 unique identifiers instantly. Create multiple UUIDs in different formats for your applications.",
    keywords: ["uuid generator", "guid generator", "unique id", "uuid v4", "random uuid"],
    openGraph: {
        title: "UUID Generator - Generate Unique IDs",
        description: "Generate UUID v4 unique identifiers instantly.",
        type: "website",
    },
};

export default function UUIDGeneratorPage() {
    return <UUIDGeneratorContent />;
}
