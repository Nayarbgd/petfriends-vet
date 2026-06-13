import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Phone, MessageCircle, Star, StarHalf, ChevronRight, X, ChevronLeft } from "lucide-react";
import heroDogImg from "@assets/hero-dog.webp";
import PageHead from "@/components/seo/PageHead";
import { BG, ORANGE, PURPLE, primaryBtn, secondaryBtn, CARD_BG, CARD_BORDER, iconOrange } from "@/lib/brand";
import { services, reviews, faqs, SITE_URL } from "@/lib/data";

const vetSchema = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  "@id": "https://petfriendsvet.ae/#organization",
  name: "Pet Friends Vet Clinic",
  description: "24/7 veterinary care, grooming and emergency services in JVC, Dubai",
  url: "https://petfriendsvet.ae",
  telephone: "+971527394636",
  priceRange: "AED 100–600",
  image: "https://petfriendsvet.ae/opengraph.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sobha Daffodil, Al Barsha South Fourth",
    addressLocality: "Jumeirah Village Circle",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 25.0496, longitude: 55.2020 },
  openingHours: ["Mo-Su 00:00-06:00", "Mo-Su 10:00-24:00"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "1053", bestRating: "5", worstRating: "1" },
  sameAs: ["https://www.instagram.com/pet_friends_vet_clinic"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const CL = "https://res.cloudinary.com/djepsudop/image/upload/q_auto,f_auto,w_800";
const clientPhotos = [
  { src: `${CL}/v1781378827/f3d5431e-ea6f-4d9d-828b-5960732a0974_wykok3.png`, position: "center center" },
  { src: `${CL}/v1781378368/1c5b7d14-d587-4057-ab7d-c07361b85abd_cdemre.png`, position: "center top"    },
  { src: `${CL}/v1781378028/8fb59bca-4fc1-41aa-a8c4-210577e38cae_l1097p.png`, position: "center center" },
  { src: `${CL}/v1781377846/75d6b711-0498-442d-a214-815d15caf7b6_o0khy9.png`, position: "center top"    },
  { src: `${CL}/v1781377558/43e9a7ac-b6d4-4941-952e-1d14dd6629c2_as3z6j.png`, position: "center top"    },
  { src: `${CL}/v1781377620/d7d1907a-d537-42de-b6b6-ccc2de0132b0_qkrkng.png`, position: "center center" },
];

function ClientGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i! + clientPhotos.length - 1) % clientPhotos.length), []);
  const next = useCallback(() => setLightbox((i) => (i! + 1) % clientPhotos.length), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox, close, prev, next]);

  return (
    <>
    <section className="py-24 relative overflow-hidden" style={{ background: BG, borderTop: "1px solid rgba(123,74,226,0.12)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,138,0,0.07) 0%, transparent 65%)" }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.35)", color: ORANGE }}>
            Our Community
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">Our Happy Clients</h2>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
            Every visit is a happy tail — meet some of the pets who call us home.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {clientPhotos.map((photo, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              onClick={() => setLightbox(i)}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-zoom-in focus:outline-none focus-visible:ring-2"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.40)", focusRingColor: ORANGE } as React.CSSProperties}
              aria-label={`View client photo ${i + 1}`}
            >
              <img
                src={photo.src}
                alt={`Happy client ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: photo.position }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(180deg, transparent 40%, rgba(15,16,24,0.55) 100%)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ background: "rgba(255,138,0,0.25)", border: "1.5px solid rgba(255,138,0,0.60)" }}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" /></svg>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* ── INSTAGRAM CTA ─────────────────────────────────────────────── */}
        <div className="flex justify-center mt-12">
          <motion.a
            href="https://www.instagram.com/pet_friends_vet_clinic?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl font-bold text-base text-white transition-shadow"
            style={{
              background: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
              boxShadow: "0 4px 32px rgba(253,29,29,0.35), 0 1px 0 rgba(255,255,255,0.10) inset",
            }}
          >
            {/* Instagram SVG logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-6 h-6 shrink-0"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span>Síguenos en Instagram</span>
            <svg className="w-4 h-4 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
        </div>
      </div>

    </section>

    {/* ── LIGHTBOX — rendered via portal so it escapes overflow/transform parents ── */}
    {createPortal(
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
            onClick={close}
          >
            {/* Image container — stop propagation so clicking image doesn't close */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.88,    opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex items-center justify-center w-full max-w-3xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={clientPhotos[lightbox].src}
                alt={`Client photo ${lightbox + 1}`}
                className="rounded-2xl object-contain w-full max-h-[80vh] shadow-2xl select-none"
                style={{ objectPosition: clientPhotos[lightbox].position }}
                draggable={false}
              />

              {/* Counter */}
              <div
                className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: "rgba(0,0,0,0.60)", color: "rgba(255,255,255,0.70)", backdropFilter: "blur(6px)" }}
              >
                {lightbox + 1} / {clientPhotos.length}
              </div>

              {/* Close */}
              <button
                onClick={close}
                className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(0,0,0,0.60)", color: "white", backdropFilter: "blur(6px)" }}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: "rgba(255,138,0,0.25)", border: "1.5px solid rgba(255,138,0,0.50)", color: "white", backdropFilter: "blur(6px)" }}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: "rgba(255,138,0,0.25)", border: "1.5px solid rgba(255,138,0,0.50)", color: "white", backdropFilter: "blur(6px)" }}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Tap-to-close hint on mobile */}
            <p className="absolute bottom-4 left-0 right-0 text-center text-xs pointer-events-none md:hidden" style={{ color: "rgba(255,255,255,0.35)" }}>
              Tap outside to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const dogY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <>
      <PageHead
        title="Pet Friends Vet Clinic | 24/7 Veterinary Care in JVC Dubai"
        description="Expert veterinary care, grooming, vaccinations, deworming, and 24/7 emergency services for dogs and cats in Jumeirah Village Circle, Dubai."
        canonical="https://petfriendsvet.ae/"
        schemas={[vetSchema, faqSchema]}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden min-h-[700px] flex items-center">

        {/* Mobile background — portrait image, full cover */}
        <div
          className="absolute inset-0 z-0 md:hidden"
          style={{
            backgroundImage: `url(/hero-dog-mobile.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Mobile gradient — stronger overlay so text is readable */}
        <div
          className="absolute inset-0 z-0 md:hidden"
          style={{ background: "linear-gradient(180deg, rgba(13,13,18,0.55) 0%, rgba(13,13,18,0.45) 40%, rgba(13,13,18,0.88) 100%)" }}
        />

        {/* Desktop background — landscape image with parallax */}
        <motion.div
          className="absolute z-0 pointer-events-none hidden md:block"
          style={{
            top: "-8%",
            left: 0,
            right: 0,
            bottom: "-8%",
            backgroundImage: `url(${heroDogImg})`,
            backgroundSize: "52% auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 4% center",
            filter: "brightness(1.15) contrast(1.18) saturate(1.45)",
            y: dogY,
            willChange: "transform",
          }}
        />
        {/* Desktop gradient */}
        <div className="absolute inset-0 z-0 hidden md:block" style={{ background: "linear-gradient(90deg, rgba(13,13,18,0.96) 0%, rgba(13,13,18,0.80) 38%, rgba(13,13,18,0.10) 100%)" }} />

        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 10% 50%, rgba(255,138,0,0.12) 0%, transparent 50%)" }} />

        <div className="container mx-auto px-4 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-widest" style={{ background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.40)", color: ORANGE, boxShadow: "0 0 16px rgba(255,138,0,0.20)" }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: ORANGE }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: ORANGE }} />
              </span>
              24/7 Emergency Vet Care
            </div>

            <h1 className="text-5xl lg:text-7xl font-poppins font-extrabold leading-[1.1] tracking-tight mb-6">
              More Than a Clinic —{" "}
              <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8A00, #FFB347, #C77DFF)" }}>
                A Second Home
              </span>{" "}
              for Their Hearts
            </h1>

            <p className="text-lg mb-8 leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.80)" }}>
              24/7 emergency vet care, expert grooming & complete pet health — all in JVC, Dubai.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/book-appointment" className="h-14 px-8 rounded-xl text-base transition-transform hover:scale-105 flex items-center" style={primaryBtn}>
                Book an Appointment
              </Link>
              <a href="https://wa.me/971527394636" target="_blank" rel="noreferrer" className="h-14 px-8 rounded-xl text-base flex items-center gap-2 transition-all hover:brightness-125" style={secondaryBtn}>
                <MessageCircle className="w-5 h-5" />Chat on WhatsApp
              </a>
            </div>

            <div className="flex items-center gap-4 text-sm flex-wrap" style={{ color: "rgba(255,255,255,0.70)" }}>
              <div className="flex items-center text-yellow-400">
                {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                <StarHalf className="w-4 h-4 fill-current" />
              </div>
              <span>4.5★ · 1,053 reviews</span>
              <span className="w-1 h-1 rounded-full bg-white/25" />
              <span style={{ color: PURPLE }}>JVC, Dubai</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(90deg, rgba(255,138,0,0.07), rgba(123,74,226,0.07)), #0F1018", borderTop: "1px solid rgba(255,138,0,0.15)", borderBottom: "1px solid rgba(123,74,226,0.15)" }} className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { icon: <div className="flex justify-center text-yellow-400 mb-2">{[...Array(4)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}<StarHalf className="w-5 h-5 fill-current" /></div>, label: "4.5★ from 1,053 reviews" },
              { icon: <div className="text-2xl mb-2" style={{ color: ORANGE }}>24/7</div>, label: "Always Open" },
              { icon: <div className="text-2xl mb-2" style={{ color: PURPLE }}>6+</div>, label: "Services Available" },
              { icon: <div className="w-7 h-7 rounded mx-auto mb-2 flex items-center justify-center text-xs font-bold" style={{ background: "rgba(123,74,226,0.20)", border: `1px solid ${PURPLE}55`, color: PURPLE }}>RE</div>, label: "Part of Ragab Elhofy Group" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-center px-4 py-2">
                {item.icon}
                <span className="font-semibold text-sm text-white/80">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES TEASER ───────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: BG }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,138,0,0.08) 0%, transparent 60%)" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.35)", color: ORANGE }}>
              Our Services
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">Complete Care Under One Roof</h2>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>From routine check-ups to midnight emergencies — equipped for every situation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {services.slice(0, 3).map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-8 rounded-2xl group"
                style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: "0 4px 24px rgba(123,74,226,0.08)" }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={svc.style}>{svc.icon}</div>
                <h3 className="text-xl font-bold mb-3 font-poppins text-white">{svc.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{svc.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105" style={primaryBtn}>
              View All Services <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── REVIEWS TEASER ────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: `linear-gradient(135deg, rgba(255,138,0,0.06), rgba(123,74,226,0.08)), ${BG}`, borderTop: "1px solid rgba(255,138,0,0.12)" }}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.35)", color: ORANGE }}>
              Reviews
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">What Pet Parents Are Saying</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {reviews.slice(0, 2).map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl"
                style={{ background: CARD_BG, border: CARD_BORDER }}
              >
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className={`w-4 h-4 ${idx < r.rating ? "fill-current" : "text-white/15 fill-white/10"}`} />)}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>"{r.text}"</p>
                <div className="font-bold text-sm text-white/90">{r.name} · <span className="font-normal text-white/40">{r.date}</span></div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/reviews" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:brightness-125" style={{ background: "rgba(123,74,226,0.20)", border: "1px solid rgba(123,74,226,0.40)", color: "white" }}>
              See All Reviews <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HAPPY CLIENTS GALLERY ────────────────────────────────────────── */}
      <ClientGallery />

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-28 text-center relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(255,138,0,0.16) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(123,74,226,0.16) 0%, transparent 55%), #0F1018", borderTop: "1px solid rgba(255,138,0,0.15)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px]" style={{ background: `linear-gradient(to right, transparent, ${ORANGE}80, ${PURPLE}80, transparent)` }} />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6">Your Pet Deserves the Best Care</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.60)" }}>Don't wait — we're open 24 hours, 7 days a week.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book-appointment" className="w-full sm:w-auto h-14 px-10 rounded-xl text-base flex items-center justify-center transition-transform hover:scale-105" style={primaryBtn}>
              Book an Appointment
            </Link>
            <a href="tel:+971527394636" className="w-full sm:w-auto h-14 px-10 rounded-xl text-base flex items-center justify-center gap-2 transition-all hover:brightness-125" style={secondaryBtn}>
              <Phone className="w-4 h-4" />Call Now: +971 52 739 4636
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
