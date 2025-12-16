import { HeroSection } from "@/components/landing/hero-section"
import { ValueProposition } from "@/components/landing/value-proposition"
import { FeedbackForm } from "@/components/landing/feedback-form"
import { Footer } from "@/components/landing/footer"

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