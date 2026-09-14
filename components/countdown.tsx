"use client";

import { useEffect, useState } from "react";

type CountdownValues = { days: number; hours: number; minutes: number; seconds: number };

function getTargetDate() {
  const now = new Date();
  const target = new Date(now.getFullYear(), 10, 19, 0, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setFullYear(target.getFullYear() + 1);
  }

  return target;
}

function getCountdown(): CountdownValues {
  const difference = Math.max(0, getTargetDate().getTime() - Date.now());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

type CountdownLabels = {
  eyebrow: string;
  title: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export function Countdown({ labels }: { labels: CountdownLabels }) {
  const [remaining, setRemaining] = useState<CountdownValues | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getCountdown());
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { value: remaining?.days, label: labels.days },
    { value: remaining?.hours, label: labels.hours },
    { value: remaining?.minutes, label: labels.minutes },
    { value: remaining?.seconds, label: labels.seconds },
  ];

  return (
    <section aria-live="polite" className="text-center">
      <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-rose/60">{labels.eyebrow}</p>
      <h2 className="mt-1.5 font-display text-lg text-ink/50">{labels.title}</h2>
      <div className="mt-5 flex items-center justify-center gap-3 sm:gap-5">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-3 sm:gap-5">
            <div className="text-center">
              <span className="block font-display text-xl tabular-nums text-ink/40 sm:text-2xl">
                {String(unit.value ?? 0).padStart(2, "0")}
              </span>
              <span className="mt-0.5 block text-[0.5rem] font-medium uppercase tracking-[0.12em] text-ink/30 sm:text-[0.55rem]">
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="font-display text-lg text-rose/20" aria-hidden="true">·</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
