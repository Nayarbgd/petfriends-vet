import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import PageHead from "@/components/seo/PageHead";
import { BG, ORANGE, PURPLE, primaryBtn, CARD_BG, CARD_BORDER } from "@/lib/brand";
import { reviews } from "@/lib/data";

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Pet Friends Vet Clinic",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "1053",
    bestRating: "5",
  },
  review: reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: { "@type": "Rating", ratingValue: String(r.rating) },
    reviewBody: r.text,
    datePublished: r.date,
  })),
};

export default function Reviews() {
  return (
    <>
      <PageHead
        title="Client Reviews | Pet Friends Vet Clinic JVC Dubai"
        description="Read what JVC pet owners say about Pet Friends Vet Clinic. 4.5 stars from over 1,053 reviews. Expert vets, patient groomers, 24/7 emergency care."
        canonical="https://petfriendsvet.ae/reviews"
        schema={schema}
      />

      {/* ── PAGE HERO ─────────────────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(255,138,0,0.12) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 70% 30%, rgba(123,74,226,0.12) 0%, transparent 50%), " +
            BG,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6" style={{ background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.35)", color: ORANGE }}>
            Client Reviews
          </div>
          <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-6">
            What Pet Parents{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8A00, #FFB347, #C77DFF)" }}>
              Are Saying
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-6 h-6 ${i < 4 ? "fill-current" : "fill-yellow-400/50"}`} />
              ))}
            </div>
            <span className="text-2xl font-bold text-white">4.5</span>
            <span style={{ color: "rgba(255,255,255,0.50)" }}>from 1,053 reviews</span>
          </div>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Don't just take our word for it — here's what the JVC pet community thinks.
          </p>
        </div>
      </section>

      {/* ── REVIEWS GRID ─────────────────────────────────────────────────── */}
      <section className="pb-24 relative" style={{ background: BG }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(123,74,226,0.10) 0%, transparent 55%)" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl"
                style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: "0 4px 24px rgba(123,74,226,0.08)" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background: i % 2 === 0 ? "rgba(255,138,0,0.18)" : "rgba(123,74,226,0.18)",
                      border: `1px solid ${i % 2 === 0 ? "rgba(255,138,0,0.40)" : "rgba(123,74,226,0.40)"}`,
                      color: i % 2 === 0 ? ORANGE : PURPLE,
                    }}
                  >
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white/90">{r.name}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{r.date}</div>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className={`w-3.5 h-3.5 ${idx < r.rating ? "fill-current" : "text-white/15 fill-white/10"}`} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>"{r.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 text-center" style={{ background: `linear-gradient(135deg, rgba(255,138,0,0.08), rgba(123,74,226,0.08)), ${BG}`, borderTop: "1px solid rgba(255,138,0,0.15)" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Join Our Happy Pet Family</h2>
          <p className="mb-8 text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>Experience the difference — book your first visit today.</p>
          <Link href="/book-appointment" className="inline-flex items-center h-14 px-10 rounded-xl text-base transition-transform hover:scale-105" style={primaryBtn}>
            Book an Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
