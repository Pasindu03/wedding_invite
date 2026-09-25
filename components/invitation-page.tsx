"use client"

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ExternalLink, Heart, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/data/wedding";
import { localizedPhone, weddingDetails } from "@/data/wedding";
import { translations } from "@/data/translations";
import { RsvpForm } from "./rsvp-form";
import { SectionHeading } from "./section-heading";
import { BottomNavigation } from "./bottom-navigation";
import { Countdown } from "./countdown";
import { Reveal } from "./reveal";
import { GoldenParticles } from "./golden-particles";

function TimelineContent({
                           index,
                           time,
                           title,
                           align,
                         }: {
  index: number;
  time: string;
  title: string;
  align: "left" | "right";
}) {
  return (
      <div className={align === "right" ? "text-right" : "text-left"}>
        <time className="block font-display text-[1.65rem] leading-none tracking-tight text-rose sm:text-5xl">
          {time}
        </time>

        <h3 className="mt-2 max-w-[220px] font-display text-[1.15rem] leading-tight text-[#493b32] sm:mt-3 sm:max-w-xs sm:text-3xl">
          {title}
        </h3>
      </div>
  );
}

export function InvitationPage({ locale }: { locale: Locale }) {
  const t = translations[locale];
  const brideName = t.brideName;
  const groomName = t.groomName;
  const parentNames = locale === "si"
      ? { bride: translations.si.brideParents, groom: translations.si.groomParents }
      : { bride: weddingDetails.brideParents, groom: weddingDetails.groomParents };
  const parentDetails = [
    { label: t.brideParentsLabel, name: parentNames.bride },
    { label: t.groomParentsLabel, name: parentNames.groom },
  ];
  const contacts = [
    { name: groomName, phone: weddingDetails.gaminduPhone },
    { name: brideName, phone: weddingDetails.kavindiPhone },
  ];
  const schedule = [
    {
      time: "9:00 AM",
      title: "The Celebration Begins",
    },
    {
      time: "10:00 AM",
      title: "The Poruwa Ceremony",
    },
    {
      time: "12:00 PM",
      title: "A Feast Together",
    },
    {
      time: "2:00 PM",
      title: "Let's Dance",
    },
    {
      time: "4:00 PM",
      title: "Good bye to the Couple",
    },
  ];

  return (
      <main lang={locale} className="min-h-dvh overflow-hidden bg-[#fbf4e6] pb-20 text-ink">
        <GoldenParticles />

        <section id="invitation" className="relative mx-auto max-w-5xl scroll-mt-4 px-5 pb-12 pt-8 text-center sm:px-8 sm:pb-16 sm:pt-12">
          <div className="pointer-events-none absolute left-1/2 top-5 h-64 w-64 -translate-x-1/2 rounded-full bg-[#eedfd0]/55 blur-3xl" aria-hidden="true" />
          <div className="relative animate-intro">
            <Heart className="mx-auto size-4 fill-rose text-rose" aria-hidden="true" />
            <p className="eyebrow mt-6">{t.invitation}</p>
            <h1 className="mt-6 font-display text-[clamp(3.25rem,15vw,6.5rem)] leading-[0.82] tracking-[-0.055em] text-ink">
              <span className="block">{brideName}</span>
              <span className="my-3 block text-2xl font-normal tracking-normal text-rose sm:text-3xl">{t.namesJoiner}</span>
              <span className="block">{groomName}</span>
            </h1>
            <p className="mt-7 text-sm tracking-[0.16em] text-ink/65">{t.gettingMarried}</p>
            <div className="mx-auto mt-8 flex w-fit items-center gap-4 border-y border-line px-5 py-4">
              <CalendarDays className="size-4 text-rose" aria-hidden="true" />
              <div className="leading-none">
                <span className="font-display text-4xl">{weddingDetails.dateDay}</span>
                <span className="ml-2 text-sm font-medium uppercase tracking-[0.18em]">{t.dateMonth}</span>
                <span className="ml-2 font-display text-4xl">{weddingDetails.dateYear}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <div className="relative flex items-center justify-center rounded-[1.75rem] border border-line bg-[#ead7b8] p-3 shadow-[0_16px_50px_rgba(61,43,30,0.08)] sm:aspect-video sm:overflow-hidden sm:rounded-[2rem] sm:p-4">
              <Image src={weddingDetails.coupleImage} alt={t.photoAlt} width={1054} height={1492} priority className="h-auto max-h-[72svh] w-auto max-w-full rounded-[1.2rem] object-contain sm:h-full sm:max-h-none sm:w-full sm:rounded-[1.2rem] sm:object-cover sm:object-[center_28%]" />
              <span className="sr-only">{t.photoPlaceholder}</span>
            </div>
          </Reveal>

          <div className="mx-auto pt-8 max-w-3xl">
            <Reveal>
              <SectionHeading eyebrow={t.parentsEyebrow} title={t.parentsTitle} />
              <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {parentDetails.map((parent) => (
                    <div key={parent.label} className="bg-[#fffdfa] px-6 py-7 text-center">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-rose">{parent.label}</p>
                      <p className="mt-3 font-display text-2xl">{parent.name}</p>
                    </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-2xl px-6 py-12 text-center sm:py-12 ">
          <Reveal>
            <p className="font-display text-2xl leading-relaxed text-ink/85 sm:text-3xl">“{t.invitationMessage}”</p>
          </Reveal>
          <Reveal className="mt-10">
            <Countdown labels={{
              eyebrow: t.countdownEyebrow,
              title: t.countdownTitle,
              days: t.countdownDays,
              hours: t.countdownHours,
              minutes: t.countdownMinutes,
              seconds: t.countdownSeconds,
            }} />
          </Reveal>
        </section>

        <section id="venue" className="scroll-mt-4 bg-[#493b32] px-5 py-12 text-[#fffaf4] sm:px-8 sm:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionHeading eyebrow={t.venueEyebrow} title={t.venueTitle} inverse />
            <p className="mx-auto mt-5 max-w-md text-2xl leading-7 text-amber-200">{t.venueCopy}</p>
            <div className="venue-preview group mt-8 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-2">
              <Image src={weddingDetails.venueImage} alt={t.venueImageAlt} width={1667} height={943} className="aspect-[7/5] w-full rounded-xl object-cover transition duration-[900ms] ease-out md:group-hover:scale-[1.045] md:group-hover:saturate-125" />
            </div>
            <a href={weddingDetails.venueUrl} target="_blank" rel="noreferrer" className="button-light mx-auto mt-8 w-fit">
              <MapPin className="size-5" aria-hidden="true" />
              {t.viewLocation}
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
        </section>

        <section
            id="schedule"
            className="relative scroll-mt-4 overflow-hidden bg-[#f7efe3] px-4 py-16 sm:px-8 sm:py-20"
        >
          {/* Ambient glow */}
          <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/10 blur-[120px] sm:h-[700px] sm:w-[700px] sm:blur-[140px]"
              aria-hidden="true"
          />

          {/* Subtle texture */}
          <div
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                    "radial-gradient(#493b32 0.7px, transparent 0.7px)",
                backgroundSize: "18px 18px",
              }}
              aria-hidden="true"
          />

          <div className="relative mx-auto max-w-5xl">
            <Reveal>
              {/* Heading */}
              <div className="mx-auto max-w-xl text-center">
                <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6 sm:gap-4">
                  <span className="h-px w-8 bg-rose/30 sm:w-12" />

                  <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-rose sm:text-[10px] sm:tracking-[0.35em]">
            The Day
          </span>

                  <span className="h-px w-8 bg-rose/30 sm:w-12" />
                </div>

                <h2 className="font-display text-[2.6rem] leading-none tracking-tight text-[#493b32] sm:text-6xl md:text-7xl">
                  Our Day Together
                </h2>

                <p className="mx-auto mt-4 max-w-[280px] text-xs leading-6 text-[#493b32]/55 sm:mt-5 sm:max-w-md sm:text-base sm:leading-7">
                  Five beautiful moments as we celebrate the beginning of our forever.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative mx-auto mt-16 max-w-4xl sm:mt-28">

                {/* Vertical line */}
                <div
                    className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-rose/30 to-transparent"
                    aria-hidden="true"
                />

                <div className="space-y-12 sm:space-y-24">
                  {schedule.map((event, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <div
                            key={`${event.time}-${event.title}`}
                            className="relative grid grid-cols-[1fr_3rem_1fr] items-center sm:grid-cols-[1fr_4rem_1fr]"
                        >
                          {/* LEFT */}
                          <div
                              className={`${
                                  isEven
                                      ? "pr-3 text-right sm:pr-14"
                                      : "col-start-3 pl-3 text-left sm:pl-14"
                              }`}
                          >
                            {isEven && (
                                <TimelineContent
                                    index={index}
                                    time={event.time}
                                    title={event.title}
                                    align="right"
                                />
                            )}
                          </div>

                          {/* TIMELINE MARKER */}
                          <div className="relative z-10 col-start-2 flex justify-center">
                            <div
                                className="
                      flex size-9 items-center justify-center
                      rounded-full border border-rose/25
                      bg-[#f7efe3]
                      shadow-[0_0_0_5px_rgba(247,239,227,0.85)]
                      sm:size-12
                      sm:shadow-[0_0_0_8px_rgba(247,239,227,0.8)]
                    "
                            >
                              <div className="size-2 rounded-full bg-rose shadow-[0_0_14px_rgba(155,98,88,0.5)] sm:size-3" />

                              <span className="absolute -top-4 font-mono text-[6px] font-medium tracking-[0.15em] text-rose/60 sm:-top-5 sm:text-[8px] sm:tracking-[0.2em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                            </div>
                          </div>

                          {/* RIGHT */}
                          <div
                              className={`${
                                  isEven
                                      ? ""
                                      : "col-start-3 pl-3 text-left sm:pl-14"
                              }`}
                          >
                            {!isEven && (
                                <TimelineContent
                                    index={index}
                                    time={event.time}
                                    title={event.title}
                                    align="left"
                                />
                            )}
                          </div>
                        </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="rsvp" className="scroll-mt-4 border-y border-line bg-champagne/75 px-5 py-12 sm:px-8 sm:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionHeading eyebrow={t.rsvpEyebrow} title={t.rsvpTitle}>
              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-ink/65">{t.rsvpCopy}</p>
            </SectionHeading>
            <RsvpForm locale={locale} />
          </Reveal>
        </section>

        <footer className="relative px-5 py-20 sm:px-8 bg-black">
          <div className="mx-auto max-w-4xl">

            {/* SECTION 1: Couple Names & Heart */}
            <div className="text-center mb-20 pb-12 border-b border-rose/30">
              <Heart className="mx-auto size-6 fill-rose text-rose mb-8" aria-hidden="true" />

              <p className="font-display text-6xl md:text-7xl font-light tracking-tight leading-tight">
                <span className="text-rose block mb-2">Kavindi</span>
                <span className="text-gray-300">&</span>
                <span className="text-rose block mt-2">Gamindu</span>
              </p>
            </div>

            {/* SECTION 2: Save The Date - Prominent */}
            <div className="text-center mb-24 py-16 bg-gradient-to-b from-rose/5 to-transparent rounded-2xl px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose mb-6">
                Save The Date
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                <div className="font-display text-5xl md:text-6xl font-light text-gray-200">
                  {weddingDetails.dateDay}
                </div>

                <div className="hidden sm:block w-px h-12 bg-rose/30"></div>

                <div className="text-center sm:text-left">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-400 mb-2">
                    {t.dateMonth}
                  </p>
                  <p className="font-display text-4xl md:text-5xl font-light text-gray-200">
                    {weddingDetails.dateYear}
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 3: Contacts Header */}
            <div className="text-center mb-16 pb-12 border-b border-rose/20">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose mb-4">
                {t.contactsEyebrow}
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-gray-100 mb-4">
                {t.contactsTitle}
              </h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Please reach out with any questions or RSVP inquiries
              </p>
            </div>

            {/* SECTION 4: Contacts - Individual Cards for Better Identification */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              {contacts.map((contact) => (
                  <a
                      key={contact.phone}
                      href={`tel:${contact.phone}`}
                      className="group"
                  >
                    <div className="text-center p-8 rounded-xl border border-rose/20 bg-gradient-to-br from-rose/5 to-transparent hover:border-rose/50 hover:from-rose/10 transition-all duration-300">

                      {/* Contact Icon */}
                      <div className="inline-flex items-center justify-center size-12 rounded-full bg-rose/20 group-hover:bg-rose/30 transition duration-300 mb-6">
                        <Phone className="size-5 text-rose" aria-hidden="true" />
                      </div>

                      {/* Contact Name */}
                      <p className="font-display text-3xl md:text-4xl text-gray-100 mb-6">
                        {contact.name}
                      </p>

                      {/* Phone Number - Prominent */}
                      <div className="mb-6">
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-2">
                          Phone
                        </p>
                        <a
                            href={`tel:${contact.phone}`}
                            className="font-display text-2xl text-rose hover:text-rose/80 transition block"
                        >
                          {localizedPhone(contact.phone)}
                        </a>
                      </div>

                      {/* CTA */}
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose/60 group-hover:text-rose transition">
                        Tap to call
                      </p>
                    </div>
                  </a>
              ))}
            </div>

            {/* SECTION 5: Wedding Message */}
            <div className="text-center py-12 border-t border-rose/20">
              <p className="font-display text-xl md:text-2xl text-gray-300 italic mb-4">
                We look forward to celebrating this special moment with you
              </p>
              <p className="text-xs text-gray-600 uppercase tracking-widest">
                Blessings & Love
              </p>
            </div>

          </div>
        </footer>

        <BottomNavigation translation={t} />
      </main>
  );
}
