import type { Metadata } from "next";
import ColorPickerContent from "@/features/color-picker";

export const metadata: Metadata = {
    title: "Color Picker - HEX RGB HSL Converter | StyloFront Tools",
    description: "Pick any color and convert between HEX, RGB, HSL formats. Free online color picker with shade generator.",
    keywords: ["color picker", "hex to rgb", "rgb to hex", "color converter", "hsl", "color palette"],
    openGraph: {
        title: "Color Picker - HEX RGB HSL Converter",
        description: "Pick and convert colors between different formats instantly.",
        type: "website",
    },
};

export default function ColorPickerPage() {
    return <ColorPickerContent />;
}
