"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, Check, X } from "lucide-react";
import type { Locale } from "@/data/wedding";
import { weddingDetails } from "@/data/wedding";
import { translations } from "@/data/translations";

export function RsvpForm({ locale }: { locale: Locale }) {
    const t = translations[locale];
    const [error, setError] = useState("");
    const [attending, setAttending] = useState<"yes" | "no" | null>(null);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const name = String(form.get("name") ?? "").trim();
        const message = String(form.get("message") ?? "").trim();

        // Build the message with attendance status
        const attendanceStatus = attending === "yes" ? "✅ Coming" : "❌ Not Coming";
        const fullMessage = `${t.rsvpMessage(name, message)}\n\n${attendanceStatus}`;

        window.open(
            `https://wa.me/${weddingDetails.whatsappPhone}?text=${encodeURIComponent(fullMessage)}`,
            "_blank",
            "noopener,noreferrer"
        );
    }

    return (
        <form noValidate onSubmit={handleSubmit} className="mx-auto mt-8 grid max-w-xl gap-6 text-left">

            {/* Guest Name */}
            <div>
                <label htmlFor="guest-name" className="form-label">{t.guestName}</label>
                <input
                    id="guest-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={t.guestNamePlaceholder}
                    className="form-control"
                    onChange={() => setError("")}
                />
            </div>

            {/* Attendance Selection */}
            <div>
                <label className="form-label mb-3 block">Will you be attending?</label>
                <div className="grid grid-cols-2 gap-3">
                    {/* Yes Button */}
                    <button
                        type="button"
                        onClick={() => {
                            setAttending("yes");
                            setError("");
                        }}
                        className={`relative flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 font-medium transition-all duration-200 ${
                            attending === "yes"
                                ? "border-green-500 bg-green-500/10 text-green-600"
                                : "border-gray-600 bg-transparent text-gray-300 hover:border-green-500/50"
                        }`}
                    >
                        <Check className="size-5" aria-hidden="true" />
                        <span>I Will Attend</span>
                    </button>

                    {/* No Button */}
                    <button
                        type="button"
                        onClick={() => {
                            setAttending("no");
                            setError("");
                        }}
                        className={`relative flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 font-medium transition-all duration-200 ${
                            attending === "no"
                                ? "border-red-500 bg-red-500/10 text-red-600"
                                : "border-gray-600 bg-transparent text-gray-300 hover:border-red-500/50"
                        }`}
                    >
                        <X className="size-5" aria-hidden="true" />
                        <span>Cannot Attend</span>
                    </button>
                </div>
            </div>

            {/* Optional Message */}
            <div>
                <label htmlFor="guest-message" className="form-label">{t.optionalMessage}</label>
                <textarea
                    id="guest-message"
                    name="message"
                    rows={4}
                    placeholder={t.messagePlaceholder}
                    className="form-control resize-y"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="button-primary mt-2 justify-center hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <MessageCircle className="size-5" aria-hidden="true" />
                {t.rsvpButton}
            </button>
        </form>
    );
}