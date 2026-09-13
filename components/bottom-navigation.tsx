"use client";

import { CalendarDays, Heart, MapPin, MessageCircle, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Translation } from "@/data/translations";

export function BottomNavigation({ translation: t }: { translation: Translation }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const links = [
    { href: "#invitation", label: t.navInvitation, icon: Heart },
    { href: "#schedule", label: t.navSchedule, icon: CalendarDays },
    { href: "#venue", label: t.navVenue, icon: MapPin },
    { href: "#rsvp", label: t.navRsvp, icon: MessageCircle },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configure audio
    audio.loop = true;
    audio.volume = 0.55;
    audio.muted = true; // Start muted (browser policy)
    audio.currentTime = 0;

    // Try to autoplay muted
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
          .then(() => {
            console.log("Music started playing (muted)");
          })
          .catch((error) => {
            console.error("Autoplay failed:", error);
          });
    }
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.muted) {
        // Unmute and play
        audio.muted = false;
        audio.volume = 0.55;

        // If paused, play it
        if (audio.paused) {
          await audio.play();
        }

        setIsMuted(false);
      } else {
        // Mute
        audio.muted = true;
        setIsMuted(true);
      }
    } catch (error) {
      console.error("Music control failed:", error);
    }
  };

  return (
      <>
        <audio
            ref={audioRef}
            src="/music/music1.mp3"
            preload="auto"
            crossOrigin="anonymous"
        />

        <nav className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-md items-center justify-around rounded-2xl border border-line/90 bg-[#fff8eb]/95 px-1 py-1.5 shadow-[0_10px_30px_rgba(53,45,41,0.18)] backdrop-blur sm:bottom-5" aria-label="Invitation sections">
          {links.map(({ href, label, icon: Icon }) => (
              <a
                  key={href}
                  href={href}
                  className="flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[0.6rem] font-semibold leading-tight text-ink/70 transition hover:bg-rose/[0.08] hover:text-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
              >
                <Icon className="size-4" aria-hidden="true" />
                <span>{label}</span>
              </a>
          ))}

          <button
              type="button"
              onClick={toggleMusic}
              className="flex min-h-12 min-w-[68px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[0.6rem] font-semibold leading-tight text-ink/70 transition hover:bg-rose/[0.08] hover:text-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
              aria-label={isMuted ? "Unmute music" : "Mute music"}
              title={isMuted ? "Tap to play music" : "Tap to mute music"}
          >
            {isMuted ? (
                <>
                  <VolumeX className="size-4" aria-hidden="true" />
                  <span>Play</span>
                </>
            ) : (
                <>
                  <Volume2 className="size-4" aria-hidden="true" />
                  <span>Mute</span>
                </>
            )}
          </button>
        </nav>
      </>
  );
}