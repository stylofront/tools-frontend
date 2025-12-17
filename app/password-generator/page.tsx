import type { Metadata } from "next";
import PasswordGeneratorContent from "@/features/password-generator";

export const metadata: Metadata = {
    title: "Password Generator - Secure Random Passwords | StyloFront Tools",
    description: "Generate strong, secure passwords with cryptographic randomness. Customize length and character types.",
    keywords: ["password generator", "random password", "secure password", "strong password", "password creator"],
    openGraph: {
        title: "Password Generator - Secure Random Passwords",
        description: "Generate strong, secure passwords instantly.",
        type: "website",
    },
};

export default function PasswordGeneratorPage() {
    return <PasswordGeneratorContent />;
}
