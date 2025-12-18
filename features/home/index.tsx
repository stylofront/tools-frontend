import { HeroSection } from "@/features/home/sections/hero-section"
import { ValueProposition } from "@/features/home/sections/value-proposition"
import { FeedbackForm } from "@/features/home/sections/feedback-form"
export default function HomePageContent() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <ValueProposition />
            <div id="feedback">
                <FeedbackForm />
            </div>
        </main>
    )
}