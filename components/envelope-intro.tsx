"use client";

import { useState, useEffect, useRef } from "react";
import { LanguageSelector } from "./language-selector";

export function EnvelopeIntro() {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // After 10 seconds, transition to language selector
    const timer = setTimeout(() => {
      setShowLanguageSelector(true);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoError = () => {
    setVideoFailed(true);
  };

  const handleVideoEnd = () => {
    setShowLanguageSelector(true);
  };

  return (
      <>
        <style>{`
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
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
        }

        .video-wrapper video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .fallback-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .intro-container.fade-out {
          animation: fadeOut 0.8s ease-out forwards;
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

        @media (max-width: 768px) {
          .video-wrapper video,
          .fallback-image {
            object-fit: contain;
            background: #000;
          }
        }
      `}</style>

        {!showLanguageSelector && (
            <div className="intro-container">
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