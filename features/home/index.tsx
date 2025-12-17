import { HeroSection } from "@/features/home/sections/hero-section"
import { ValueProposition } from "@/features/home/sections/value-proposition"
import { FeedbackForm } from "@/features/home/sections/feedback-form"
import { Footer } from "@/components/layout/footer"
export default function HomePageContent() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <ValueProposition />
            <div id="feedback">
                <FeedbackForm />
            </div>
            <Footer />
        </main>
    )
}