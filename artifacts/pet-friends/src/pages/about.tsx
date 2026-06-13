import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import PageHead from "@/components/seo/PageHead";
import { BG, ORANGE, PURPLE, primaryBtn, CARD_BG, CARD_BORDER } from "@/lib/brand";

const schema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Pet Friends Vet Clinic",
  description: "Meet the team behind Pet Friends Vet Clinic — expert vets and groomers in JVC, Dubai, part of Ragab Elhofy Group.",
  url: "https://petfriendsvet.ae/about",
};

export default function About() {
  return (
    <>
      <PageHead
        title="About Us | Pet Friends Vet Clinic JVC Dubai"
        description="Meet the dedicated team at Pet Friends Vet Clinic. Expert vets, caring groomers, and multilingual staff serving JVC Dubai 24/7. Part of Ragab Elhofy Group."
        canonical="https://petfriendsvet.ae/about"
        schema={schema}
      />

      {/* ── PAGE HERO ─────────────────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(166,94,18,0.14) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 30%, rgba(255,152,0,0.14) 0%, transparent 50%), " +
            BG,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{ background: "rgba(166,94,18,0.15)", border: "1px solid rgba(166,94,18,0.40)", color: PURPLE }}
          >
            Our Story
          </div>
          <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-6">
            More Than a Clinic,{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #FF9800, #D9A441)" }}
            >
              a Second Home
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.60)" }}>
            We're a passionate team of vets, nurses, and groomers dedicated to making every visit stress-free — for pets and their owners.
          </p>
        </div>
      </section>

      {/* ── TEAM PHOTO + ABOUT ────────────────────────────────────────────── */}
      <section
        id="team"
        className="py-24 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(255,152,0,0.06), rgba(166,94,18,0.08)), ${BG}`,
          borderTop: "1px solid rgba(255,152,0,0.12)",
          borderBottom: "1px solid rgba(166,94,18,0.12)",
        }}
      >
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(166,94,18,0.18) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,152,0,0.14) 0%, transparent 65%)" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 48px rgba(166,94,18,0.18)" }}>
                <img
                  src="/team.jpg"
                  alt="Pet Friends Vet Clinic team — friendly staff in scrubs at JVC Dubai"
                  className="w-full h-full object-cover object-center"
                  style={{ filter: "brightness(1.05) contrast(1.05)" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(17,17,17,0.55) 100%)" }} />
              </div>
              <div
                className="absolute -bottom-6 -right-6 p-6 rounded-2xl shadow-2xl max-w-[250px]"
                style={{
                  background: "linear-gradient(135deg, rgba(255,152,0,0.15), rgba(166,94,18,0.10)), #15151D",
                  border: "1px solid rgba(255,152,0,0.25)",
                  boxShadow: "0 8px 32px rgba(255,152,0,0.15)",
                }}
              >
                <div className="font-bold text-2xl mb-1 text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${ORANGE}, ${PURPLE})` }}>24/7</div>
                <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>Network of care in JVC, always ready for your pet.</div>
              </div>
            </div>

            <div>
              <div
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ background: "rgba(166,94,18,0.15)", border: "1px solid rgba(166,94,18,0.40)", color: PURPLE }}
              >
                Why Choose Us
              </div>
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-8">Built Around Your Pet's Needs</h2>
              <div className="space-y-6">
                {[
                  { q: "Worried about an emergency?",     a: "Our team is here 24/7, even at midnight.",                                                   color: ORANGE },
                  { q: "Anxious pet during grooming?",    a: "Our groomers handle even the most nervous pets with patience.",                               color: PURPLE },
                  { q: "Confused about vaccinations?",    a: "We explain everything clearly before you decide — no surprises.",                             color: ORANGE },
                  { q: "Need travel documentation?",      a: "We issue health certificates and vaccination booklets for international travel.",              color: PURPLE },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1.5 rounded-full shrink-0" style={{ background: `linear-gradient(to bottom, ${item.color}, ${item.color}44)` }} />
                    <div>
                      <p className="text-xs mb-1 uppercase tracking-wider font-bold" style={{ color: item.color }}>{item.q}</p>
                      <p className="text-lg" style={{ color: "rgba(255,255,255,0.85)" }}>{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-10 grid grid-cols-2 gap-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div>
                  <div className="font-bold text-white mb-1">Multilingual Staff</div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>Speaking English, Arabic & more</div>
                </div>
                <div>
                  <div className="font-bold text-white mb-1">Ragab Elhofy Group</div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>Backed by a trusted network</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: BG, borderBottom: "1px solid rgba(255,152,0,0.12)" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1,053+", label: "Happy Clients",     color: ORANGE },
              { value: "4.5★",   label: "Average Rating",    color: ORANGE },
              { value: "24/7",   label: "Emergency Coverage", color: PURPLE },
              { value: "7.6k",   label: "Instagram Followers", color: PURPLE },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="text-4xl font-poppins font-extrabold mb-2" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 text-center" style={{ background: `linear-gradient(135deg, rgba(255,152,0,0.08), rgba(166,94,18,0.08)), ${BG}` }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Ready to Meet the Team?</h2>
          <p className="mb-8 text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>Book an appointment and experience the difference.</p>
          <Link href="/book-appointment" className="inline-flex items-center h-14 px-10 rounded-xl text-base transition-transform hover:scale-105" style={primaryBtn}>
            Book an Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
