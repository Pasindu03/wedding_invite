"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { startMusic } from "@/lib/music";

interface EnvelopeIntroProps {
  onDone: () => void;
}

const INTRO_DURATION = 12000;

export function EnvelopeIntro({ onDone }: EnvelopeIntroProps) {
  const [showTapToOpen, setShowTapToOpen] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFinishedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  /**
   * Finish the intro exactly once.
   */
  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) {
      return;
    }

    hasFinishedRef.current = true;

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    onDone();
  }, [onDone]);

  /**
   * Start the invitation experience.
   */
  const handleOpen = useCallback(() => {
    if (!showTapToOpen) {
      return;
    }

    setShowTapToOpen(false);

    // Start music immediately after the user interaction.
    startMusic();
  }, [showTapToOpen]);

  /**
   * Start a safety timer once the intro begins.
   *
   * This prevents the invitation from getting stuck if:
   * - the video doesn't fire onEnded
   * - the browser has a video issue
   * - the video file is slightly different in duration
   */
  useEffect(() => {
    if (showTapToOpen) {
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      finishIntro();
    }, INTRO_DURATION);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [showTapToOpen, finishIntro]);

  /**
   * If the video fails, show the fallback image.
   *
   * The 12-second safety timer will still transition
   * to the invitation.
   */
  const handleVideoError = useCallback(() => {
    setVideoFailed(true);
  }, []);

  /**
   * Video completed normally.
   */
  const handleVideoEnd = useCallback(() => {
    finishIntro();
  }, [finishIntro]);

  /**
   * Manual skip.
   */
  const handleSkip = useCallback(() => {
    startMusic();
    finishIntro();
  }, [finishIntro]);

  /**
   * When the video actually starts playing, remember it.
   */
  const handleVideoPlay = useCallback(() => {
    setVideoStarted(true);
  }, []);

  return (
      <div className="relative min-h-dvh">
        {/* TAP TO OPEN */}
        {showTapToOpen && (
            <button
                type="button"
                onClick={handleOpen}
                className="tap-overlay"
                aria-label="Open wedding invitation"
            >
              <div className="tap-icon flex flex-col items-center gap-6">
                <div className="flex size-20 items-center justify-center rounded-full border-2 border-rose/30 bg-white/40 shadow-[0_8px_30px_rgba(155,98,88,0.15)] backdrop-blur-sm">
                  <Heart
                      className="size-8 text-rose"
                      fill="currentColor"
                      aria-hidden="true"
                  />
                </div>

                <div className="text-center">
                  <p className="font-serif text-2xl text-ink/80">
                    Kavindi &amp; Gamindu
                  </p>

                  <p className="mt-3 text-sm font-medium uppercase tracking-widest text-rose/70">
                    Tap to open
                  </p>
                </div>
              </div>
            </button>
        )}

        {/* INTRO VIDEO */}
        {!showTapToOpen && (
            <div className="intro-container">
              <div className="video-wrapper">
                {!videoFailed ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        onPlay={handleVideoPlay}
                        onEnded={handleVideoEnd}
                        onError={handleVideoError}
                        className="h-full w-full object-cover"
                    >
                      <source
                          src="/videos/video5.mp4"
                          type="video/mp4"
                      />

                      Your browser does not support the video tag.
                    </video>
                ) : (
                    <img
                        src="/images/fallback.jpeg"
                        alt="Wedding Invitation"
                        className="h-full w-full object-cover"
                    />
                )}
              </div>

              {/* Optional loading indicator */}
              {!videoStarted && !videoFailed && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="size-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  </div>
              )}

              {/* SKIP */}
              <button
                  type="button"
                  onClick={handleSkip}
                  className="absolute bottom-6 right-6 z-10 rounded-full bg-black/40 px-5 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition hover:bg-black/60 hover:text-white active:scale-95"
              >
                Skip
              </button>
            </div>
        )}
      </div>
  );
}