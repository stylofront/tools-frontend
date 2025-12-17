import type { Metadata } from "next";
import UnitConverterContent from "@/features/unit-converter";

export const metadata: Metadata = {
    title: "Unit Converter - Length, Weight, Temperature | StyloFront Tools",
    description: "Convert between different units of measurement. Length, weight, temperature, and data size conversions.",
    keywords: ["unit converter", "length converter", "weight converter", "temperature converter", "metric imperial"],
    openGraph: {
        title: "Unit Converter - All Units",
        description: "Convert between different units of measurement instantly.",
        type: "website",
    },
};

export default function UnitConverterPage() {
    return <UnitConverterContent />;
}
