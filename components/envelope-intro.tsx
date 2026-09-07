"use client";

import { Heart, Mail } from "lucide-react";
import { useState } from "react";
import { LanguageSelector } from "./language-selector";

const sparkles = [
  { left: "8%", top: "15%", delay: "0s" },
  { left: "18%", top: "70%", delay: "0.8s" },
  { left: "85%", top: "20%", delay: "1.2s" },
  { left: "92%", top: "65%", delay: "0.4s" },
  { left: "50%", top: "5%", delay: "1.6s" },
  { left: "45%", top: "88%", delay: "2s" },
] as const;

export function EnvelopeIntro() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-champagne">
      {!opened && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 py-8">
          <div className="envelope-stage">
            <div className="envelope-glow" aria-hidden="true" />
            {sparkles.map((s, i) => (
              <span
                key={i}
                className="envelope-sparkle"
                style={{ left: s.left, top: s.top, animationDelay: s.delay }}
                aria-hidden="true"
              />
            ))}
            <div
              className={`envelope envelope-clickable ${opened ? "envelope--opening" : ""}`}
              onClick={() => setOpened(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpened(true);
                }
              }}
            >
              <div className="envelope-body">
                <div className="envelope-flap" aria-hidden="true" />
                <div className="envelope-pocket-left" aria-hidden="true" />
                <div className="envelope-pocket-right" aria-hidden="true" />
                <div className="envelope-letter">
                  <Heart className="mx-auto size-4 fill-rose text-rose" aria-hidden="true" />
                  <p className="eyebrow mt-4">Kavindi &amp; Gamindu</p>
                  <p className="mt-3 font-display text-xl text-ink">Wedding Invitation</p>
                  <p className="mt-2 text-xs text-ink/55">19 November</p>
                </div>
              </div>
              <div className="envelope-seal" aria-hidden="true">
                <Heart className="size-5 fill-current" />
              </div>
            </div>
          </div>
          <div className="envelope-hint mt-10 flex flex-col items-center gap-2 text-center">
            <Mail className="size-4 text-rose" aria-hidden="true" />
            <p className="text-sm font-medium text-ink/70">Click to open your invitation</p>
          </div>
        </div>
      )}

      {opened && (
        <div className="lang-selector-enter">
          <LanguageSelector />
        </div>
      )}
    </div>
  );
}
