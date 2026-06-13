import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import PageHead from "@/components/seo/PageHead";
import { BG, ORANGE, PURPLE, primaryBtn, CARD_BG, CARD_BORDER } from "@/lib/brand";
import { services } from "@/lib/data";

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Pet Friends Vet Clinic Services",
  description: "Complete veterinary services in JVC Dubai",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    description: s.desc,
  })),
};

export default function Services() {
  return (
    <>
      <PageHead
        title="Vet Services in JVC Dubai | Pet Friends Vet Clinic"
        description="Comprehensive veterinary services including check-ups, vaccinations, deworming, grooming, spay/neuter and 24/7 emergency care. Book online today."
        canonical="https://petfriendsvet.ae/services"
        schema={schema}
      />

      {/* ── PAGE HERO ─────────────────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(255,152,0,0.14) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 30%, rgba(166,94,18,0.14) 0%, transparent 50%), " +
            BG,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ background: "rgba(255,152,0,0.15)", border: "1px solid rgba(255,152,0,0.35)", color: ORANGE }}
          >
            What We Offer
          </div>
          <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-6">
            Complete Care{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #FF9800, #D9A441)" }}
            >
              Under One Roof
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.60)" }}>
            From routine wellness to midnight emergencies — we're equipped and ready for every situation your pet may face.
          </p>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────────────────── */}
      <section className="pb-24 relative" style={{ background: BG }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,152,0,0.06) 0%, transparent 60%)" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Link href={`/services/${svc.service}`} key={i} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-8 rounded-2xl cursor-pointer group transition-all duration-300 h-full"
                  style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: "0 4px 24px rgba(166,94,18,0.08)" }}
                  whileHover={{ y: -6, boxShadow: "0 20px 56px rgba(166,94,18,0.22), 0 0 0 1px rgba(255,152,0,0.20)" }}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={svc.style}>
                    {svc.icon}
                  </div>
                  <h2 className="text-xl font-bold mb-3 font-poppins text-white">{svc.title}</h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>{svc.desc}</p>
                  <div
                    className="flex items-center font-semibold text-sm"
                    style={{ color: i % 2 === 0 ? ORANGE : PURPLE }}
                  >
                    Learn more & book <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className="py-20 text-center"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,152,0,0.12) 0%, transparent 60%), " + BG,
          borderTop: "1px solid rgba(255,152,0,0.15)",
        }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Ready to Book?</h2>
          <p className="mb-8 text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
            Book online or call us any time — we're always here.
          </p>
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2 h-14 px-10 rounded-xl text-base transition-transform hover:scale-105"
            style={primaryBtn}
          >
            Book an Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
