import type { Metadata } from "next";
import QRGeneratorContent from "@/features/qr-generator";

export const metadata: Metadata = {
    title: "QR Code Generator - Create Custom QR Codes | StyloFront Tools",
    description: "Generate custom QR codes for URLs, text, or any data. Customize colors and size. Free online QR generator.",
    keywords: ["qr code generator", "qr code maker", "create qr code", "custom qr code", "free qr generator"],
    openGraph: {
        title: "QR Code Generator - Create Custom QR Codes",
        description: "Generate custom QR codes for URLs and text instantly.",
        type: "website",
    },
};

export default function QRGeneratorPage() {
    return <QRGeneratorContent />;
}
