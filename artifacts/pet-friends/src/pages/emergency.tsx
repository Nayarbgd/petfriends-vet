import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Phone, Clock, CheckCircle2, AlertTriangle, MessageCircle, MapPin } from "lucide-react";
import PageHead from "@/components/seo/PageHead";
import { BG, ORANGE, PURPLE, primaryBtn, secondaryBtn, CARD_BG, CARD_BORDER, iconOrange, iconPurple } from "@/lib/brand";

const schema = {
  "@context": "https://schema.org",
  "@type": "EmergencyService",
  name: "Pet Friends Vet Clinic — 24/7 Emergency Vet Care",
  description: "24/7 emergency veterinary care in JVC Dubai. No appointment needed — walk in any time.",
  telephone: "+971527394636",
  url: "https://petfriendsvet.ae/emergency",
  openingHours: "Mo-Su 00:00-24:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sobha Daffodil, Al Barsha South Fourth",
    addressLocality: "Jumeirah Village Circle",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
};

const symptoms = [
  "Difficulty breathing or choking",
  "Severe bleeding or deep wounds",
  "Loss of consciousness or collapse",
  "Suspected poisoning or toxin ingestion",
  "Seizures or uncontrolled tremors",
  "Vomiting or diarrhea lasting over 12 hours",
  "Severe pain or inability to stand",
  "Eye injuries or sudden vision changes",
];

export default function Emergency() {
  return (
    <>
      <PageHead
        title="24/7 Emergency Vet Care in JVC Dubai | Pet Friends Vet Clinic"
        description="Genuine 24/7 emergency veterinary care at Pet Friends Vet Clinic in JVC Dubai. No appointment needed. Call +971 52 739 4636 immediately or walk in any time."
        canonical="https://petfriendsvet.ae/emergency"
        schema={schema}
      />

      {/* ── EMERGENCY HERO ────────────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-36 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(255,60,60,0.18) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 30%, rgba(255,138,0,0.18) 0%, transparent 50%), " +
            BG,
          borderBottom: "1px solid rgba(255,60,60,0.15)",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-widest"
            style={{ background: "rgba(255,60,60,0.15)", border: "1px solid rgba(255,60,60,0.40)", color: "#ff4444" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-red-500" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            24/7 Emergency Care
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-extrabold mb-6 leading-tight">
            Emergency?{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #FF8A00, #FFB347)" }}
            >
              We're Always Ready.
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.70)" }}>
            No appointment needed. Walk in any time — day or night. Our emergency team is on standby 24 hours a day, 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+971527394636"
              className="w-full sm:w-auto h-16 px-12 rounded-xl text-lg flex items-center justify-center gap-3 transition-transform hover:scale-105 font-bold"
              style={{ background: "linear-gradient(135deg, #FF8A00, #FFB347)", color: "#111", boxShadow: "0 4px 40px rgba(255,138,0,0.60)" }}
            >
              <Phone className="w-6 h-6" />Call Now: +971 52 739 4636
            </a>
            <a
              href="https://wa.me/971527394636"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto h-16 px-12 rounded-xl text-lg flex items-center justify-center gap-3 transition-all hover:brightness-125"
              style={secondaryBtn}
            >
              <MessageCircle className="w-6 h-6" />WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── ALWAYS OPEN STRIP ─────────────────────────────────────────────── */}
      <section
        className="py-6"
        style={{ background: "linear-gradient(90deg, rgba(255,138,0,0.12), rgba(123,74,226,0.12))", borderBottom: "1px solid rgba(255,138,0,0.20)" }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5" style={{ color: ORANGE }} />
            <span className="font-bold text-white">Open 24 hours, 7 days a week</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-white/15" />
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5" style={{ color: PURPLE }} />
            <span style={{ color: "rgba(255,255,255,0.70)" }}>Sobha Daffodil, JVC, Dubai</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-white/15" />
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" style={{ color: ORANGE }} />
            <span style={{ color: "rgba(255,255,255,0.70)" }}>No appointment needed</span>
          </div>
        </div>
      </section>

      {/* ── WHAT TO DO ────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: BG }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.35)", color: ORANGE }}>
              What To Do
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">In a Pet Emergency</h2>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>Stay calm and follow these steps while on your way to us.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Call Us First",       desc: "Call +971 52 739 4636 so we can prepare before you arrive. Our team will guide you on the phone.",              icon: <Phone className="w-6 h-6" />, style: iconOrange },
              { step: "2", title: "Keep Pet Calm",       desc: "Minimize movement, keep your pet warm and contained. Don't attempt home treatment for serious injuries.",       icon: <CheckCircle2 className="w-6 h-6" />, style: iconPurple },
              { step: "3", title: "Head Straight to Us", desc: "We're at Sobha Daffodil, JVC. Walk in — no wait, no appointment. Our team will be ready for you.",             icon: <MapPin className="w-6 h-6" />, style: iconOrange },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8 rounded-2xl text-center"
                style={{ background: CARD_BG, border: CARD_BORDER }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={item.style}>{item.icon}</div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Step {item.step}</div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY SYMPTOMS ────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: `linear-gradient(135deg, rgba(255,60,60,0.06), rgba(255,138,0,0.06)), ${BG}`, borderTop: "1px solid rgba(255,60,60,0.12)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: "rgba(255,60,60,0.12)", border: "1px solid rgba(255,60,60,0.30)", color: "#ff6666" }}
            >
              <AlertTriangle className="w-4 h-4" />Warning Signs
            </div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Signs That Need Immediate Care</h2>
            <p style={{ color: "rgba(255,255,255,0.55)" }}>If your pet shows any of these symptoms, come to us immediately.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {symptoms.map((symptom, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: "rgba(255,60,60,0.06)", border: "1px solid rgba(255,60,60,0.15)" }}
              >
                <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: "#ff6666" }} />
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.80)" }}>{symptom}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY CTA ─────────────────────────────────────────────────── */}
      <section
        className="py-28 text-center relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,138,0,0.16) 0%, transparent 60%), #0F1018", borderTop: "1px solid rgba(255,138,0,0.20)" }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Your Pet Can't Wait.</h2>
          <p className="text-xl mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.60)" }}>
            Call us now — we're ready around the clock.
          </p>
          <a
            href="tel:+971527394636"
            className="inline-flex items-center gap-3 h-16 px-12 rounded-xl text-lg font-bold transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, #FF8A00, #FFB347)", color: "#111", boxShadow: "0 4px 40px rgba(255,138,0,0.55)" }}
          >
            <Phone className="w-6 h-6" />+971 52 739 4636 · Call Now
          </a>
        </div>
      </section>
    </>
  );
}
