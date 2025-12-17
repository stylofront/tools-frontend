"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { MessageSquare, Bug, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export function FeedbackForm() {
    const [formType, setFormType] = useState<"feedback" | "bug">("feedback")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim() || !email.trim() || !message.trim()) {
            toast.error("Please fill in all fields")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "YOUR_ACCESS_KEY_HERE", // Replace with your actual access key
                    subject: `StyloFront Tools - ${formType === "feedback" ? "New Feedback" : "Bug Report"}`,
                    name,
                    email,
                    message,
                    type: formType,
                }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(
                    formType === "feedback"
                        ? "Thank you for your feedback!"
                        : "Bug report submitted successfully!"
                )
                setName("")
                setEmail("")
                setMessage("")
            } else {
                console.error("Form submission failed:", result)
                toast.error(result.message || "Something went wrong. Please try again.")
            }
        } catch (error) {
            console.error("Form submission error:", error)
            toast.error("Failed to submit form. Please check your connection.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="relative py-16 sm:py-24 bg-muted/30 overflow-hidden" id="feedback">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 sm:mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                        <MessageSquare className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs font-medium text-primary">We're Listening</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Help Us Improve
                        </span>
                    </h2>

                    <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
                        Found a bug or have a suggestion? We'd love to hear from you!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative"
                >
                    {/* Card glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-2xl opacity-50" />

                    {/* Form Card */}
                    <div className="relative bg-background border-2 border-primary/20 rounded-3xl p-5 sm:p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                            {/* Type Selector */}
                            <div>
                                <label className="block text-xs font-semibold mb-2 text-foreground uppercase tracking-wider">
                                    Type
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormType("feedback")}
                                        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${formType === "feedback"
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]"
                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                            }`}
                                    >
                                        <MessageSquare className="h-4 w-4" />
                                        <span>Feedback</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setFormType("bug")}
                                        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${formType === "bug"
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]"
                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                            }`}
                                    >
                                        <Bug className="h-4 w-4" />
                                        <span>Bug Report</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-xs font-semibold mb-1.5 text-foreground uppercase tracking-wider">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full px-3 py-2.5 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                        required
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-xs font-semibold mb-1.5 text-foreground uppercase tracking-wider">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john@example.com"
                                        className="w-full px-3 py-2.5 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Message Field */}
                            <div>
                                <label htmlFor="message" className="block text-xs font-semibold mb-1.5 text-foreground uppercase tracking-wider">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder={
                                        formType === "feedback"
                                            ? "Tell us what you think..."
                                            : "Please describe what went wrong..."
                                    }
                                    rows={4}
                                    className="w-full px-3 py-2.5 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-sm"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-base hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.01]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        <span>Submit {formType === "feedback" ? "Feedback" : "Bug Report"}</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Success indicator */}
                        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                            <span>We typically respond within 24 hours</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
