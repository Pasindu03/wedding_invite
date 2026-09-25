"use client";

import { useCallback, useEffect, useState } from "react";
import { EnvelopeIntro } from "@/components/envelope-intro";
import { InvitationPage } from "@/components/invitation-page";

export default function HomePage() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  const handleIntroDone = useCallback(() => {
    setFadingOut(true);
  }, []);

  useEffect(() => {
    if (!fadingOut) return;

    const timer = window.setTimeout(() => {
      setShowInvitation(true);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [fadingOut]);

  return (
      <main className="relative min-h-dvh overflow-hidden">
        {!showInvitation && (
            <div
                className={fadingOut ? "intro-fade-out" : "intro-fade-in"}
            >
              <EnvelopeIntro onDone={handleIntroDone} />
            </div>
        )}

        {showInvitation && (
            <div className="invitation-fade-in">
              <InvitationPage locale="en" />
            </div>
        )}

        <style jsx global>{`
          @keyframes page-fade-in {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          @keyframes page-fade-out {
            from {
              opacity: 1;
            }

            to {
              opacity: 0;
            }
          }

          .intro-fade-in {
            animation: page-fade-in 500ms ease-out both;
          }

          .intro-fade-out {
            animation: page-fade-out 700ms ease-out forwards;
          }

          .invitation-fade-in {
            animation: page-fade-in 900ms ease-out both;
          }
        `}</style>
      </main>
  );
}