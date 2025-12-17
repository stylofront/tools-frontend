import type { Metadata } from "next";
import ImageCompressorContent from "@/features/image-compressor";

export const metadata: Metadata = {
    title: "Image Compressor - Compress Images Online Free | StyloFront Tools",
    description: "Compress images instantly with Rust + WebAssembly. Free online image compressor with quality control. JPEG, PNG, WebP support. 100% private, runs in your browser.",
    keywords: ["image compressor", "compress image", "reduce image size", "image optimizer", "online image compression", "free image compressor", "wasm", "rust"],
    openGraph: {
        title: "Image Compressor - Compress Images Online Free",
        description: "Compress images instantly with Rust + WebAssembly. Free, private, and lightning-fast.",
        type: "website",
        siteName: "StyloFront Tools",
    },
    twitter: {
        card: "summary_large_image",
        title: "Image Compressor - StyloFront Tools",
        description: "Compress images instantly with Rust + WebAssembly. 100% private, runs in your browser.",
    },
};

export default function ImageCompressorPage() {
    return <ImageCompressorContent />;
}
