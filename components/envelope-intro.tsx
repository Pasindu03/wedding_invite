"use client";

import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { LanguageSelector } from "./language-selector";
import { startMusic } from "@/lib/music";

export function EnvelopeIntro() {
  const [showTapToOpen, setShowTapToOpen] = useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (showTapToOpen) return;

    setFadeIn(true);

    const timer = setTimeout(() => {
      startMusic();
      setShowLanguageSelector(true);
    }, 12000);

    return () => clearTimeout(timer);
  }, [showTapToOpen]);

  const handleOpen = () => {
    setShowTapToOpen(false);
    startMusic();
  };

  const handleVideoError = () => {
    setVideoFailed(true);
  };

  const handleVideoEnd = () => {
    startMusic();
    setShowLanguageSelector(true);
  };

  const handleSkip = () => {
    startMusic();
    setShowLanguageSelector(true);
  };

  return (
    <>
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100px); opacity: 0; }
        }

        .intro-container {
          min-height: 100dvh;
          width: 100%;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .video-wrapper {
          width: 100%;
          height: 100dvh;
          position: relative;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .video-wrapper video {
          width: 105%;
          height: 105%;
          object-fit: contain;
          display: block;
        }

        .fallback-image {
          width: 105%;
          height: 105%;
          object-fit: contain;
          display: block;
        }

        .tap-overlay {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #f4e8d8 0%, #ede1d1 50%, #e8dcc6 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 200;
          cursor: pointer;
        }

        .tap-icon {
          animation: pulse-soft 2s ease-in-out infinite;
        }

        .language-selector-wrapper {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #f4e8d8 0%, #ede1d1 50%, #e8dcc6 100%);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.8s ease-out forwards;
        }

        .language-selector-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .video-fade {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @media (max-width: 768px) {
          .video-wrapper video,
          .fallback-image {
            width: 105%;
            height: 105%;
            object-fit: contain;
            background: #000;
          }
        }
      `}</style>

      {showTapToOpen && (
        <div className="tap-overlay" onClick={handleOpen}>
          <div className="tap-icon flex flex-col items-center gap-6">
            <div className="flex size-20 items-center justify-center rounded-full border-2 border-rose/30 bg-white/40 shadow-[0_8px_30px_rgba(155,98,88,0.15)] backdrop-blur-sm">
              <Heart className="size-8 text-rose" fill="currentColor" />
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl text-ink/80">Kavindi &amp; Gamindu</p>
              <p className="mt-3 text-sm font-medium tracking-widest uppercase text-rose/70">Tap to open</p>
            </div>
          </div>
        </div>
      )}

      {!showTapToOpen && !showLanguageSelector && (
        <div className={`intro-container ${fadeIn ? "video-fade" : ""}`}>
          <div className="video-wrapper">
            {!videoFailed ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                onError={handleVideoError}
                onEnded={handleVideoEnd}
              >
                <source src="/videos/video5.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src="/images/fallback.jpeg"
                alt="Wedding Invitation"
                className="fallback-image"
              />
            )}
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="absolute bottom-6 right-6 z-10 rounded-full bg-black/40 px-5 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition hover:bg-black/60 hover:text-white"
          >
            Skip
          </button>
        </div>
      )}

      {showLanguageSelector && (
        <div className="language-selector-wrapper">
          <div className="language-selector-container">
            <LanguageSelector />
          </div>
        </div>
      )}
    </>
  );
}
