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
            "radial-gradient(ellipse at 30% 50%, rgba(255,152,0,0.12) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 70% 30%, rgba(166,94,18,0.12) 0%, transparent 50%), " +
            BG,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6" style={{ background: "rgba(255,152,0,0.15)", border: "1px solid rgba(255,152,0,0.35)", color: ORANGE }}>
            Client Reviews
          </div>
          <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-6">
            What Pet Parents{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF9800, #D9A441)" }}>
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
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(166,94,18,0.10) 0%, transparent 55%)" }} />
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
                style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: "0 4px 24px rgba(166,94,18,0.08)" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background: i % 2 === 0 ? "rgba(255,152,0,0.18)" : "rgba(166,94,18,0.18)",
                      border: `1px solid ${i % 2 === 0 ? "rgba(255,152,0,0.40)" : "rgba(166,94,18,0.40)"}`,
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

      {/* ── GOOGLE REVIEWS BUTTON ─────────────────────────────────────────── */}
      <div className="flex justify-center py-16" style={{ background: BG }}>
        <a
          href="https://www.google.com/maps/place/Pet+friends+vet+clinic/@25.059868,55.1368224,12156m/data=!3m1!1e3!4m12!1m2!2m1!1spet+friends!3m8!1s0x3e5f6dd099e14619:0x6ae651c7079beac!8m2!3d25.0653328!4d55.2167901!9m1!1b1!15sCgtwZXQgZnJpZW5kc1oNIgtwZXQgZnJpZW5kc5IBDHZldGVyaW5hcmlhbpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOcWQzWnBXREJSUlJBQuABAPoBBQiZARBH!16s%2Fg%2F11sm8yy4wp?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #FF9800 0%, #e6520a 60%, #c2185b 100%)",
            boxShadow: "0 4px 32px rgba(255,152,0,0.45), 0 0 0 1px rgba(255,152,0,0.20)",
          }}
        >
          {/* Google G icon */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white" fillOpacity="0.9"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white" fillOpacity="0.85"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="white" fillOpacity="0.75"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white" fillOpacity="0.95"/>
          </svg>
          <span>See All 1,053 Reviews on Google</span>
          <svg className="w-4 h-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 text-center" style={{ background: `linear-gradient(135deg, rgba(255,152,0,0.08), rgba(166,94,18,0.08)), ${BG}`, borderTop: "1px solid rgba(255,152,0,0.15)" }}>
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
