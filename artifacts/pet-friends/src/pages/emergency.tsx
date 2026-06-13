import React, { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Clock, CheckCircle2, AlertTriangle, MessageCircle, MapPin,
  ChevronDown, Heart, Droplets, Zap, Thermometer, Eye, X, ShieldAlert,
} from "lucide-react";
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What counts as a pet emergency?", acceptedAnswer: { "@type": "Answer", text: "Difficulty breathing, severe bleeding, collapse, seizures, suspected poisoning, eye injuries, inability to urinate, or any sudden and severe change in your pet's condition are all emergencies requiring immediate veterinary attention." } },
    { "@type": "Question", name: "What should I do first in a pet emergency?", acceptedAnswer: { "@type": "Answer", text: "Stay calm, call the clinic at +971 52 739 4636 so the team can prepare, keep your pet still and warm, and head straight to Sobha Daffodil, JVC. Do not give human medications." } },
    { "@type": "Question", name: "Is Pet Friends Vet Clinic open 24 hours?", acceptedAnswer: { "@type": "Answer", text: "Yes. Pet Friends Vet Clinic provides 24/7 emergency care in JVC, Dubai. No appointment is needed — walk in at any hour." } },
    { "@type": "Question", name: "What foods are toxic to dogs and cats?", acceptedAnswer: { "@type": "Answer", text: "Toxic foods for pets include chocolate, grapes, raisins, onions, garlic, xylitol (in sugar-free products), avocado, macadamia nuts, and alcohol. If your pet has ingested any of these, call us immediately." } },
  ],
};

const warningSigns = [
  "Difficulty breathing, wheezing or choking",
  "Severe or uncontrolled bleeding",
  "Loss of consciousness or sudden collapse",
  "Suspected poisoning or toxic ingestion",
  "Seizures, tremors or uncontrolled shaking",
  "Vomiting or diarrhea lasting over 12 hours",
  "Severe pain, crying out, or inability to stand",
  "Eye injuries, sudden blindness, or bulging eye",
  "Suspected broken bone or inability to bear weight",
  "Pale, white or blue gums",
  "Inability to urinate or straining to urinate",
  "Swollen or hard abdomen",
];

const doNotDo = [
  "Do NOT give human medications (paracetamol, ibuprofen, aspirin — all toxic to pets)",
  "Do NOT induce vomiting unless specifically instructed by a vet",
  "Do NOT muzzle a pet that is vomiting, choking or having trouble breathing",
  "Do NOT try to splint a broken bone yourself",
  "Do NOT leave a collapsed or seizing pet alone",
  "Do NOT offer food or water before the vet has assessed the pet",
];

const toxicFoods = [
  { item: "Chocolate", risk: "Theobromine causes heart arrhythmia & seizures" },
  { item: "Grapes & Raisins", risk: "Can cause sudden kidney failure even in small amounts" },
  { item: "Onion & Garlic", risk: "Destroys red blood cells, causes anemia" },
  { item: "Xylitol (sweetener)", risk: "Found in gum, candy, peanut butter — causes rapid blood sugar drop" },
  { item: "Avocado", risk: "Persin causes vomiting, diarrhea and respiratory distress in pets" },
  { item: "Macadamia nuts", risk: "Causes weakness, hyperthermia and tremors in dogs" },
  { item: "Alcohol", risk: "Even small amounts cause dangerous drops in blood sugar and temperature" },
  { item: "Raw yeast dough", risk: "Expands in stomach and produces toxic ethanol" },
  { item: "Coffee & caffeine", risk: "Causes rapid heart rate, tremors and seizures" },
  { item: "Cooked bones", risk: "Splinter and can puncture digestive tract" },
];

const emergencyTypes = [
  {
    icon: <Droplets className="w-6 h-6" />,
    title: "Bleeding & Wounds",
    color: "#ff4444",
    bg: "rgba(255,68,68,0.10)",
    border: "rgba(255,68,68,0.25)",
    steps: [
      "Apply firm, direct pressure with a clean cloth or bandage — do not remove it once applied",
      "If blood soaks through, add another layer on top and keep pressing",
      "For limb bleeding, keep the limb elevated above heart level if possible",
      "Do not apply a tourniquet unless bleeding is life-threatening and you are instructed to do so",
      "Call us immediately and head to the clinic — severe bleeding can be fatal within minutes",
    ],
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Seizures",
    color: PURPLE,
    bg: "rgba(123,74,226,0.10)",
    border: "rgba(123,74,226,0.25)",
    steps: [
      "Stay calm — do NOT put anything in your pet's mouth (they cannot swallow their tongue)",
      "Move furniture and objects away to prevent injury during the seizure",
      "Time the seizure — if it lasts more than 3 minutes, call us immediately",
      "Keep the room dim and quiet; reduce stimulation",
      "After it stops, keep your pet warm and calm — they may be confused and disoriented",
      "Do not restrain or hold them down during the seizure",
    ],
  },
  {
    icon: <ShieldAlert className="w-6 h-6" />,
    title: "Suspected Poisoning",
    color: ORANGE,
    bg: "rgba(255,138,0,0.10)",
    border: "rgba(255,138,0,0.25)",
    steps: [
      "Call us immediately — do not wait for symptoms to appear",
      "Note what your pet ate, the quantity, and the time of ingestion",
      "Bring the packaging or a photo of the substance to the clinic",
      "Do NOT induce vomiting unless a vet specifically tells you to",
      "Do not give milk, water, or any home remedies — they can worsen some poisonings",
      "If your pet is unconscious or having seizures, come directly to the clinic",
    ],
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Collapse / No Pulse",
    color: "#ff4444",
    bg: "rgba(255,68,68,0.10)",
    border: "rgba(255,68,68,0.25)",
    steps: [
      "Check if the pet is breathing — watch for chest movement, feel for breath from nose",
      "Check for heartbeat — place hand on the left side of chest, just behind the front leg",
      "If not breathing: perform rescue breaths (close mouth, breathe into nose until chest rises)",
      "If no heartbeat: perform chest compressions at 100–120/min for dogs; 120–140/min for cats",
      "Alternate 30 compressions with 2 rescue breaths",
      "Call us immediately on speaker while performing CPR — have someone drive while you help your pet",
    ],
  },
  {
    icon: <Thermometer className="w-6 h-6" />,
    title: "Heat Stroke",
    color: ORANGE,
    bg: "rgba(255,138,0,0.10)",
    border: "rgba(255,138,0,0.25)",
    steps: [
      "Move your pet immediately to a cool, shaded area or air-conditioned space",
      "Apply cool (not ice cold) water to their paws, armpits, and neck",
      "Place a damp towel on their body — do not wrap, let air circulate",
      "Offer small sips of cool water if conscious and able to swallow",
      "Do NOT use ice or ice water — it constricts vessels and traps heat",
      "Head to the clinic immediately even if your pet seems to recover — organ damage can be delayed",
    ],
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Eye Injuries",
    color: PURPLE,
    bg: "rgba(123,74,226,0.10)",
    border: "rgba(123,74,226,0.25)",
    steps: [
      "Prevent your pet from rubbing or scratching the eye — use an e-collar if available",
      "Do NOT touch or attempt to remove any foreign object embedded in the eye",
      "If a chemical splashed in the eye, flush gently with clean, lukewarm water for 5 minutes",
      "Keep the area calm and dimly lit to reduce stimulation",
      "Cover the eye loosely with a damp, clean cloth during transport",
      "Eye emergencies require immediate vet care — vision can be permanently lost within hours",
    ],
  },
];

function EmergencyCard({ item, index }: { item: typeof emergencyTypes[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.38, delay: index * 0.07 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: CARD_BG, border: `1px solid ${item.border}` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: item.bg, color: item.color }}>
            {item.icon}
          </div>
          <span className="font-bold text-white text-base md:text-lg">{item.title}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <ChevronDown className="w-5 h-5 shrink-0" style={{ color: "rgba(255,255,255,0.45)" }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pb-6">
              <div className="w-full h-px mb-5" style={{ background: item.border }} />
              <ol className="space-y-3">
                {item.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{ background: item.bg, color: item.color }}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Emergency() {
  return (
    <>
      <PageHead
        title="24/7 Emergency Vet Care in JVC Dubai | Pet Friends Vet Clinic"
        description="Genuine 24/7 emergency veterinary care at Pet Friends Vet Clinic in JVC Dubai. No appointment needed. Step-by-step pet first aid guide, toxic food list, and emergency advice. Call +971 52 739 4636 now."
        canonical="https://petfriendsvet.ae/emergency"
        schemas={[schema, faqSchema]}
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
            24/7 Emergency Care · JVC Dubai
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-extrabold mb-6 leading-tight">
            Emergency?{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF8A00, #FFB347)" }}>
              We're Always Ready.
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.70)" }}>
            No appointment needed. Walk in any time — day or night. Our emergency team is on standby 24 hours a day, 7 days a week in Jumeirah Village Circle, Dubai.
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

      {/* ── 3 STEPS ───────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: BG }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.35)", color: ORANGE }}>
              Immediate Action
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">First 3 Things To Do</h2>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>In any pet emergency, these three steps can save your pet's life.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Call Us First", desc: "Call +971 52 739 4636 immediately. Our team will guide you on the phone, prepare the treatment room, and stay on the line until you arrive.", icon: <Phone className="w-6 h-6" />, style: iconOrange },
              { step: "2", title: "Keep Your Pet Still & Calm", desc: "Minimize movement, keep your pet warm and contained in a blanket or carrier. Do not attempt home treatment for serious wounds, broken bones, or suspected poisoning.", icon: <CheckCircle2 className="w-6 h-6" />, style: iconPurple },
              { step: "3", title: "Come Directly to Us", desc: "We're at Sobha Daffodil, JVC. Walk straight in — no paperwork, no wait, no appointment. Our emergency team will be ready at the door.", icon: <MapPin className="w-6 h-6" />, style: iconOrange },
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

      {/* ── FIRST AID BY EMERGENCY TYPE ───────────────────────────────────── */}
      <section className="py-24" style={{ background: `linear-gradient(180deg, rgba(123,74,226,0.05), transparent), ${BG}`, borderTop: "1px solid rgba(123,74,226,0.12)" }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(123,74,226,0.15)", border: "1px solid rgba(123,74,226,0.35)", color: PURPLE }}>
              First Aid Guide
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">What To Do by Emergency Type</h2>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
              Tap any emergency below for a step-by-step guide. Always call us while you act.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {emergencyTypes.map((item, i) => (
              <EmergencyCard key={i} item={item} index={i} />
            ))}
          </div>
          <p className="text-center text-sm mt-8" style={{ color: "rgba(255,255,255,0.38)" }}>
            ⚠️ This guide is for informational purposes only. Always seek professional veterinary care immediately.
          </p>
        </div>
      </section>

      {/* ── WARNING SIGNS ─────────────────────────────────────────────────── */}
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
            <p style={{ color: "rgba(255,255,255,0.55)" }}>If your pet shows any of the following, come to us right away — do not wait to see if it improves.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {warningSigns.map((symptom, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
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

      {/* ── DO NOT DO ─────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: BG, borderTop: "1px solid rgba(255,138,0,0.10)" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(255,138,0,0.12)", border: "1px solid rgba(255,138,0,0.30)", color: ORANGE }}>
              Critical Mistakes
            </div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">What NOT To Do in a Pet Emergency</h2>
            <p style={{ color: "rgba(255,255,255,0.55)" }}>Well-meaning actions can sometimes make things worse. Avoid these common mistakes.</p>
          </div>
          <div className="space-y-3">
            {doNotDo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{ background: CARD_BG, border: "1px solid rgba(255,138,0,0.18)" }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(255,68,68,0.15)" }}>
                  <X className="w-4 h-4" style={{ color: "#ff4444" }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOXIC FOODS ───────────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: `linear-gradient(135deg, rgba(255,60,60,0.05), rgba(123,74,226,0.05)), ${BG}`, borderTop: "1px solid rgba(123,74,226,0.12)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(123,74,226,0.15)", border: "1px solid rgba(123,74,226,0.35)", color: PURPLE }}>
              Poison Prevention
            </div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">Common Foods Toxic to Pets</h2>
            <p style={{ color: "rgba(255,255,255,0.55)" }}>
              Many everyday household foods are dangerous or fatal to dogs and cats. If your pet has ingested any of these, call us immediately — do not wait for symptoms.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {toxicFoods.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="p-5 rounded-xl flex gap-4 items-start"
                style={{ background: CARD_BG, border: CARD_BORDER }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,68,68,0.12)", color: "#ff5555" }}>
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white mb-1">{item.item}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{item.risk}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="tel:+971527394636"
              className="inline-flex items-center gap-3 h-14 px-10 rounded-xl font-bold transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, #FF8A00, #FFB347)", color: "#111", boxShadow: "0 4px 32px rgba(255,138,0,0.45)" }}
            >
              <Phone className="w-5 h-5" />Suspected Poisoning? Call Now
            </a>
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
            Our 24/7 emergency team in JVC Dubai is ready right now. Call us — we'll prepare before you arrive.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+971527394636"
              className="inline-flex items-center gap-3 h-16 px-12 rounded-xl text-lg font-bold transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, #FF8A00, #FFB347)", color: "#111", boxShadow: "0 4px 40px rgba(255,138,0,0.55)" }}
            >
              <Phone className="w-6 h-6" />+971 52 739 4636 · Call Now
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 h-16 px-12 rounded-xl text-lg font-bold transition-all hover:brightness-125"
              style={secondaryBtn}
            >
              <MapPin className="w-5 h-5" />Get Directions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
