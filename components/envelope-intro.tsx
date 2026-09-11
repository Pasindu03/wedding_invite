"use client";

import { Mail } from "lucide-react";
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

  const openInvitation = () => {
    setOpened(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Enter or Space opens the invitation
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openInvitation();
    }
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-champagne">
      {!opened && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 py-8">
          <div className="letter-stage-wrapper">
            <div className="letter-glow" aria-hidden="true" />

            {sparkles.map((s, i) => (
              <span
                key={i}
                className="letter-sparkle"
                style={{
                  left: s.left,
                  top: s.top,
                  animationDelay: s.delay,
                }}
                aria-hidden="true"
              />
            ))}

            <div
              className={`letter-stage ${
                opened ? "letter-stage--open" : ""
              }`}
              role="button"
              tabIndex={0}
              aria-label="Open wedding invitation"
              onClick={openInvitation}
              onKeyDown={handleKeyDown}
            >
              {/* Opened letter behind */}
              <img
                src="/images/letter-opened.svg"
                alt=""
                className="letter-image letter-image--back"
                aria-hidden="true"
              />

              {/* Left door */}
              <div className="letter-door letter-door--left">
                <img
                  src="/images/letter-closed.svg"
                  alt="Sealed golden wedding invitation"
                  className="letter-image letter-image--door"
                  style={{ objectPosition: "left center" }}
                />
              </div>

              {/* Right door */}
              <div className="letter-door letter-door--right">
                <img
                  src="/images/letter-closed.svg"
                  alt=""
                  className="letter-image letter-image--door"
                  style={{ objectPosition: "right center" }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div className="letter-hint mt-8 flex flex-col items-center gap-2 text-center">
            <Mail className="size-4 text-rose" aria-hidden="true" />

            <p className="text-sm font-medium text-ink/70">
              Click or press Enter to open your invitation
            </p>
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