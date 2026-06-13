import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageHead from "@/components/seo/PageHead";
import { BG, ORANGE, PURPLE, primaryBtn, CARD_BG, CARD_BORDER, iconOrange, iconPurple } from "@/lib/brand";
import { faqs } from "@/lib/data";

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Pet Friends Vet Clinic",
  description: "Get in touch with Pet Friends Vet Clinic in JVC Dubai. Call 24/7, WhatsApp, or visit us at Sobha Daffodil.",
  url: "https://petfriendsvet.ae/contact",
};

export default function Contact() {
  return (
    <>
      <PageHead
        title="Contact Us | Pet Friends Vet Clinic JVC Dubai"
        description="Contact Pet Friends Vet Clinic in Jumeirah Village Circle, Dubai. Call +971 52 739 4636 anytime, WhatsApp us, or find us on Google Maps. Open 24/7 for emergencies."
        canonical="https://petfriendsvet.ae/contact"
        schema={schema}
      />

      {/* ── PAGE HERO ─────────────────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(123,74,226,0.14) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 30%, rgba(255,138,0,0.14) 0%, transparent 50%), " +
            BG,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6" style={{ background: "rgba(123,74,226,0.15)", border: "1px solid rgba(123,74,226,0.40)", color: PURPLE }}>
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-6">
            We're{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8A00, #FFB347, #C77DFF)" }}>
              Always Here
            </span>{" "}
            for You
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.60)" }}>
            Call us any time, send a WhatsApp, or drop by. We're located in Jumeirah Village Circle, Dubai.
          </p>
        </div>
      </section>

      {/* ── CONTACT CARDS ─────────────────────────────────────────────────── */}
      <section className="pb-16" style={{ background: BG }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: <Phone className="w-5 h-5" />,   label: "Phone",   body: <a href="tel:+971527394636" className="text-white/80 hover:text-white text-sm font-medium transition-colors">+971 52 739 4636</a>,              iStyle: iconOrange },
              { icon: <MapPin className="w-5 h-5" />,  label: "Address", body: <div className="text-white/75 text-sm">Sobha Daffodil, Al Barsha South Fourth,<br />JVC, Dubai, UAE</div>,                                      iStyle: iconPurple },
              { icon: <Clock className="w-5 h-5" />,   label: "Hours",   body: <div className="text-white/75 text-sm">12am–6am & 10am–12am daily<br /><span style={{ color: ORANGE }} className="font-semibold">Emergencies: 24/7</span></div>, iStyle: iconOrange },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl flex gap-4 items-start"
                style={{ background: CARD_BG, border: CARD_BORDER }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={item.iStyle}>{item.icon}</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.40)" }}>{item.label}</div>
                  {item.body}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="p-6 rounded-2xl flex gap-4 items-center mb-8 max-w-sm"
            style={{ background: CARD_BG, border: CARD_BORDER }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(37,211,102,0.15)", color: "#25D366" }}>
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.40)" }}>WhatsApp</div>
              <a href="https://wa.me/971527394636" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Message us on WhatsApp</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAP ──────────────────────────────────────────────────────────── */}
      <section className="pb-24" style={{ background: BG }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-poppins font-bold mb-6 text-center">Find Us in JVC, Dubai</h2>
          <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(255,138,0,0.15)", boxShadow: "0 8px 48px rgba(123,74,226,0.12)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.8956341!2d55.2142050!3d25.0653328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6dd099e14619%3A0x6ae651c7079beac!2sPet%20Friends%20Vet%20Clinic!5e0!3m2!1sen!2sae!4v1750000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pet Friends Vet Clinic location map"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: BG, borderTop: "1px solid rgba(123,74,226,0.12)" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 mx-auto block text-center" style={{ background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.35)", color: ORANGE, width: "fit-content" }}>
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i + 1}`} className="px-6 rounded-xl" style={{ background: CARD_BG, border: CARD_BORDER }}>
                <AccordionTrigger className="text-left font-semibold text-base hover:no-underline py-5 text-white/88">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-sm pb-5" style={{ color: "rgba(255,255,255,0.60)" }}>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 text-center" style={{ background: `linear-gradient(135deg, rgba(255,138,0,0.08), rgba(123,74,226,0.08)), ${BG}`, borderTop: "1px solid rgba(255,138,0,0.15)" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Ready to Visit?</h2>
          <p className="mb-8 text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>Book online or call us — we're always ready.</p>
          <Link href="/book-appointment" className="inline-flex items-center h-14 px-10 rounded-xl text-base transition-transform hover:scale-105" style={primaryBtn}>
            Book an Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
