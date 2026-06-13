import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Star, StarHalf, ChevronRight } from "lucide-react";
import heroDogImg from "@assets/ChatGPT_Image_13_jun_2026,_09_50_23_p.m._1781373267394.png";
import PageHead from "@/components/seo/PageHead";
import { BG, ORANGE, PURPLE, primaryBtn, secondaryBtn, CARD_BG, CARD_BORDER, iconOrange } from "@/lib/brand";
import { services, reviews } from "@/lib/data";

const vetSchema = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  name: "Pet Friends Vet Clinic",
  description: "24/7 veterinary care, grooming and emergency services in JVC, Dubai",
  url: "https://petfriendsvet.ae",
  telephone: "+971527394636",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sobha Daffodil, Al Barsha South Fourth",
    addressLocality: "Jumeirah Village Circle",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  openingHours: ["Mo-Su 00:00-06:00", "Mo-Su 10:00-24:00"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "1053" },
};

export default function Home() {
  return (
    <>
      <PageHead
        title="Pet Friends Vet Clinic | 24/7 Veterinary Care in JVC Dubai"
        description="Expert veterinary care, grooming, vaccinations, deworming, and 24/7 emergency services for dogs and cats in Jumeirah Village Circle, Dubai."
        canonical="https://petfriendsvet.ae/"
        schema={vetSchema}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden min-h-[700px] flex items-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroDogImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            filter: "brightness(1.18) contrast(1.22) saturate(1.55)",
          }}
        />
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(90deg, rgba(13,13,18,0.88) 0%, rgba(13,13,18,0.70) 50%, rgba(13,13,18,0.20) 100%)" }} />
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
            {[
              "/clients/client-1.jpg",
              "/clients/client-2.jpg",
              "/clients/client-3.jpg",
              "/clients/client-4.jpg",
              "/clients/client-5.jpg",
              "/clients/client-6.jpg",
            ].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="relative aspect-square rounded-2xl overflow-hidden group"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.40)" }}
              >
                <img
                  src={src}
                  alt={`Happy client ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                    const parent = el.parentElement!;
                    parent.style.background = i % 2 === 0
                      ? "linear-gradient(135deg, rgba(255,138,0,0.14), rgba(123,74,226,0.10))"
                      : "linear-gradient(135deg, rgba(123,74,226,0.14), rgba(255,138,0,0.10))";
                    parent.style.border = `1.5px dashed ${i % 2 === 0 ? "rgba(255,138,0,0.40)" : "rgba(123,74,226,0.40)"}`;
                    const placeholder = document.createElement("div");
                    placeholder.className = "absolute inset-0 flex flex-col items-center justify-center gap-2";
                    placeholder.innerHTML = `<div style="font-size:2.5rem">🐾</div><div style="font-size:0.75rem;font-weight:700;color:rgba(255,255,255,0.35);letter-spacing:0.1em;text-transform:uppercase">Photo ${i + 1}</div>`;
                    parent.appendChild(placeholder);
                  }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(180deg, transparent 40%, rgba(15,16,24,0.70) 100%)" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
