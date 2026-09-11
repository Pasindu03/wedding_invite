"use client";

import { Heart, Mail } from "lucide-react";
import { useState } from "react";
import { LanguageSelector } from "./language-selector";

const sparkles = [
  { left: "5%", top: "12%", delay: "0s" },
  { left: "15%", top: "72%", delay: "0.8s" },
  { left: "88%", top: "18%", delay: "1.2s" },
  { left: "92%", top: "62%", delay: "0.4s" },
  { left: "48%", top: "3%", delay: "1.6s" },
  { left: "42%", top: "90%", delay: "2s" },
] as const;

export function EnvelopeIntro() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-champagne">
      {!opened && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 py-8">
          <div
            className={`letter-stage letter-clickable ${opened ? "letter-stage--open" : ""}`}
            onClick={() => setOpened(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpened(true);
              }
            }}
          >
            <div className="letter-glow" aria-hidden="true" />
            {sparkles.map((s, i) => (
              <span
                key={i}
                className="letter-sparkle"
                style={{ left: s.left, top: s.top, animationDelay: s.delay }}
                aria-hidden="true"
              />
            ))}

            <div className="letter-layer letter-float">
              {/* Closed letter (visible first) */}
              <div className="letter-layer letter-layer--closed">
                <img src="/images/letter-closed.svg" alt="Sealed wedding invitation envelope" className="letter-image" />
              </div>
              {/* Opened letter (hidden, crossfades in on click) */}
              <div className="letter-layer letter-layer--opened">
                <img src="/images/letter-opened.svg" alt="Opened wedding invitation letter" className="letter-image" />
              </div>
            </div>
          </div>

          <div className="letter-hint mt-10 flex flex-col items-center gap-2 text-center">
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
