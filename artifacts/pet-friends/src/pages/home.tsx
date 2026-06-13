import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, CheckCircle2, PawPrint, MessageCircle, Star, StarHalf, ChevronRight, Menu, X, Syringe, Scissors, Shield } from "lucide-react";
import heroDogImg from "@assets/ChatGPT_Image_13_jun_2026,_09_50_23_p.m._1781373267394.png";

import { useCreateAppointment } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const BG       = "#0F1018";
const ORANGE   = "#FF8A00";
const PURPLE   = "#7B4AE2";

// Gradient backgrounds
const HERO_BG =
  "radial-gradient(circle at 15% 25%, rgba(255,138,0,0.22), transparent 45%), " +
  "radial-gradient(circle at 85% 70%, rgba(123,74,226,0.22), transparent 45%), " +
  "#0F1018";

const HEADER_BG =
  "linear-gradient(90deg, rgba(255,138,0,0.12), rgba(123,74,226,0.12)), #0F1018";

const CARD_BG =
  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(123,74,226,0.05))";

const CARD_BORDER = "1px solid rgba(255,138,0,0.12)";

// Button styles
const primaryBtn: React.CSSProperties = {
  background: "linear-gradient(135deg, #FF8A00, #FFB347)",
  color: "#111111",
  fontWeight: 700,
  border: "none",
  boxShadow: "0 4px 28px rgba(255,138,0,0.50)",
  cursor: "pointer",
};

const secondaryBtn: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(123,74,226,0.25), rgba(255,138,0,0.15))",
  border: "1px solid rgba(123,74,226,0.40)",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

// Reusable icon pill bg
const iconOrange: React.CSSProperties = {
  background: "rgba(255,138,0,0.18)",
  color: ORANGE,
  boxShadow: "0 0 12px rgba(255,138,0,0.20)",
};
const iconPurple: React.CSSProperties = {
  background: "rgba(123,74,226,0.18)",
  color: PURPLE,
  boxShadow: "0 0 12px rgba(123,74,226,0.20)",
};

// ─── Form schema ──────────────────────────────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(5, "Phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  petType: z.string().min(2, "Pet type is required"),
  service: z.enum(["checkup", "vaccination", "deworming", "grooming", "castration", "emergency", "other"], {
    required_error: "Please select a service",
  }),
  preferredDate: z.string().optional(),
  notes: z.string().optional(),
  website: z.string().optional(),
});

// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const { toast } = useToast();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const createAppointment = useCreateAppointment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", email: "", petType: "", service: undefined, preferredDate: "", notes: "", website: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.website) return;
    createAppointment.mutate(
      { data: { name: values.name, phone: values.phone, email: values.email || null, petType: values.petType, service: values.service, preferredDate: values.preferredDate || null, notes: values.notes || null, honeypot: values.website || null } },
      {
        onSuccess: () => { toast({ title: "Appointment Requested!", description: "We'll contact you shortly to confirm your appointment!" }); form.reset(); },
        onError: () => { toast({ variant: "destructive", title: "Something went wrong", description: "Please try again or call us directly." }); },
      }
    );
  };

  const go = (id: string) => { setMobileOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const services = [
    { title: "Veterinary Check-ups",  desc: "Comprehensive health exams — catch problems early, keep tails wagging",                  icon: <CheckCircle2 className="w-6 h-6" />, style: iconOrange, service: "checkup"    },
    { title: "Vaccinations",           desc: "Full vaccination protocols with travel documentation — stress-free and clear",           icon: <Syringe      className="w-6 h-6" />, style: iconPurple, service: "vaccination" },
    { title: "Deworming",              desc: "Fast, safe deworming for all pets — schedule it today",                                  icon: <Shield       className="w-6 h-6" />, style: iconOrange, service: "deworming"   },
    { title: "Grooming",               desc: "Nervous pets welcome. Our patient groomers leave every coat shining",                    icon: <Scissors     className="w-6 h-6" />, style: iconPurple, service: "grooming"    },
    { title: "Spay / Neuter",          desc: "Safe, modern surgical care with full aftercare guidance",                               icon: <CheckCircle2 className="w-6 h-6" />, style: iconOrange, service: "castration"  },
    { title: "Emergency Care",         desc: "We're here at midnight too. Fast, calm, expert emergency response",                     icon: <Clock        className="w-6 h-6" />, style: iconPurple, service: "emergency"   },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col font-sans" style={{ background: BG }}>

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md" style={{ background: HEADER_BG, borderBottom: "1px solid rgba(255,138,0,0.15)" }}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PURPLE})`, boxShadow: `0 0 20px rgba(255,138,0,0.45)` }}>
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="font-poppins font-bold text-xl tracking-tight hidden sm:block">Pet Friends</span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {(["services","about","reviews","contact"] as const).map((s) => (
              <button key={s} data-testid={`link-${s}`} onClick={() => go(s)} className="capitalize transition-colors text-white/65 hover:text-white" style={{ textShadow: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a data-testid="link-phone-nav" href="tel:+971527394636" className="hidden lg:flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: ORANGE }}>
              <Phone className="w-4 h-4" />+971 52 739 4636
            </a>
            <button data-testid="button-book-nav" onClick={() => go("booking")} className="px-5 py-2.5 rounded-xl text-sm transition-transform hover:scale-105" style={primaryBtn}>
              Book Now
            </button>
            <button data-testid="button-mobile-menu" className="md:hidden p-2 text-white/70" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full p-4 flex flex-col gap-3 shadow-2xl" style={{ background: "rgba(15,16,24,0.97)", borderBottom: "1px solid rgba(255,138,0,0.12)" }}>
            {(["services","about","reviews","contact"] as const).map((s) => (
              <button key={s} data-testid={`link-mobile-${s}`} onClick={() => go(s)} className="text-left font-medium py-2 capitalize text-white/75 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <a data-testid="link-mobile-phone" href="tel:+971527394636" className="flex items-center gap-2 font-bold py-2" style={{ color: ORANGE }}>
              <Phone className="w-4 h-4" />+971 52 739 4636
            </a>
          </div>
        )}
      </header>

      <main className="flex-1">

        {/* ── HERO ────────────────────────────────────────────────────────────── */}
        <section
          className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden min-h-[700px] flex items-center"
          style={{
            backgroundImage: `url(${heroDogImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(90deg, rgba(13,13,18,0.88) 0%, rgba(13,13,18,0.70) 50%, rgba(13,13,18,0.30) 100%)" }} />
          {/* Subtle brand glow on top of image */}
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 10% 50%, rgba(255,138,0,0.12) 0%, transparent 50%)" }} />

          <div className="container mx-auto px-4 relative z-10 w-full">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-2xl">
              {/* Badge */}
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
                <button data-testid="button-book-hero" onClick={() => go("booking")} className="h-14 px-8 rounded-xl text-base transition-transform hover:scale-105" style={primaryBtn}>
                  Book an Appointment
                </button>
                <a href="https://wa.me/971527394636" target="_blank" rel="noreferrer" data-testid="link-whatsapp-hero" className="h-14 px-8 rounded-xl text-base flex items-center gap-2 transition-all hover:brightness-125" style={secondaryBtn}>
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

        {/* ── TRUST BAR ───────────────────────────────────────────────────────── */}
        <section style={{ background: "linear-gradient(90deg, rgba(255,138,0,0.07), rgba(123,74,226,0.07)), #0F1018", borderTop: "1px solid rgba(255,138,0,0.15)", borderBottom: "1px solid rgba(123,74,226,0.15)" }} className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { icon: <div className="flex justify-center text-yellow-400 mb-2">{[...Array(4)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}<StarHalf className="w-5 h-5 fill-current" /></div>, label: "4.5★ from 1,053 reviews", style: {} },
                { icon: <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: ORANGE }} />, label: "Open 24/7", style: {} },
                { icon: <CheckCircle2 className="w-6 h-6 mx-auto mb-2" style={{ color: PURPLE }} />, label: "Expert Veterinary Staff", style: {} },
                { icon: <div className="w-7 h-7 rounded mx-auto mb-2 flex items-center justify-center text-xs font-bold" style={{ background: "rgba(123,74,226,0.20)", border: `1px solid ${PURPLE}55`, color: PURPLE }}>RE</div>, label: "Part of Ragab Elhofy Group", style: {} },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-center px-4 py-2">
                  {item.icon}
                  <span className="font-semibold text-sm text-white/80">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ────────────────────────────────────────────────────────── */}
        <section id="services" className="py-24 relative overflow-hidden" style={{ background: BG }}>
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,138,0,0.08) 0%, transparent 60%)" }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.35)", color: ORANGE }}>
                Our Services
              </div>
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">Complete Care Under One Roof</h2>
              <p className="text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>From routine check-ups to midnight emergencies — equipped for every situation.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onClick={() => go("booking")}
                  data-testid={`card-service-${i}`}
                  className="p-8 rounded-2xl cursor-pointer group transition-all duration-300"
                  style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: "0 4px 24px rgba(123,74,226,0.08)" }}
                  whileHover={{ y: -6, boxShadow: "0 20px 56px rgba(123,74,226,0.22), 0 0 0 1px rgba(255,138,0,0.20)" }}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={svc.style}>
                    {svc.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-poppins text-white">{svc.title}</h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>{svc.desc}</p>
                  <div className="flex items-center font-semibold text-sm" style={{ color: i % 2 === 0 ? ORANGE : PURPLE }}>
                    Book this service <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────────────────────────────────────── */}
        <section id="about" className="py-24 relative overflow-hidden" style={{ background: `linear-gradient(135deg, rgba(255,138,0,0.06), rgba(123,74,226,0.08)), ${BG}`, borderTop: "1px solid rgba(255,138,0,0.12)", borderBottom: "1px solid rgba(123,74,226,0.12)" }}>
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(123,74,226,0.18) 0%, transparent 65%)" }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,138,0,0.14) 0%, transparent 65%)" }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px]">
                <div
                  className="absolute inset-0 rounded-2xl flex items-center justify-center text-sm font-medium p-8 text-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,138,0,0.12), rgba(123,74,226,0.15))",
                    border: "2px dashed rgba(123,74,226,0.45)",
                    color: "rgba(123,74,226,0.70)",
                    boxShadow: "0 0 48px rgba(123,74,226,0.12), inset 0 0 32px rgba(255,138,0,0.06)",
                  }}
                  aria-label="Team photo — friendly staff in scrubs at Pet Friends Vet Clinic JVC Dubai"
                >
                  [Team photo — friendly staff in scrubs]
                </div>
                <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl shadow-2xl max-w-[250px]" style={{ background: "linear-gradient(135deg, rgba(255,138,0,0.15), rgba(123,74,226,0.10)), #15151D", border: "1px solid rgba(255,138,0,0.25)", boxShadow: "0 8px 32px rgba(255,138,0,0.15)" }}>
                  <div className="font-bold text-2xl mb-1 text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${ORANGE}, ${PURPLE})` }}>24/7</div>
                  <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>Network of care in JVC, always ready for your pet.</div>
                </div>
              </div>

              <div>
                <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(123,74,226,0.15)", border: "1px solid rgba(123,74,226,0.40)", color: PURPLE }}>
                  Why Choose Us
                </div>
                <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-8">More Than a Clinic, a Second Home</h2>
                <div className="space-y-6">
                  {[
                    { q: "Worried about an emergency?", a: "Our team is here 24/7, even at midnight.", color: ORANGE },
                    { q: "Anxious pet during grooming?", a: "Our groomers handle even the most nervous pets with patience.", color: PURPLE },
                    { q: "Confused about vaccinations?", a: "We explain everything clearly before you decide — no surprises.", color: ORANGE },
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

        {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
        <section id="reviews" className="py-24 relative overflow-hidden" style={{ background: BG }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(123,74,226,0.10) 0%, transparent 55%)" }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.35)", color: ORANGE }}>
                Reviews
              </div>
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">What Pet Parents Are Saying</h2>
              <p className="text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>Don't just take our word for it. Here is what the JVC pet community thinks of our care.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Sarah Al-Mansouri", rating: 5, date: "March 2026", text: "Dr. Ahmed was incredibly patient with our anxious Labrador puppy during his first check-up. He took time to explain every step of the vaccination process. We won't go anywhere else." },
                { name: "Omar Hassan",        rating: 5, date: "April 2026",    text: "Yasser in grooming is a miracle worker! My cat absolutely hates being groomed, but she came out perfectly clean and calm. I was amazed." },
                { name: "Priya Sharma",       rating: 5, date: "February 2026", text: "We had an emergency at 2am and they were ready the moment we walked in. The team explained the diagnosis clearly and let us visit every day. Truly 24/7." },
                { name: "Khalid Al-Farsi",    rating: 4, date: "May 2026",      text: "Quick appointment, honest pricing, and the vet answered all my questions about deworming. Very professional team." },
                { name: "Jessica Wong",       rating: 5, date: "March 2026",    text: "Booked grooming for our golden retriever online — easy process, great result. He looks and smells amazing. Highly recommended for JVC residents!" },
              ].map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  data-testid={`card-review-${i}`}
                  className="p-6 rounded-2xl"
                  style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: "0 4px 24px rgba(123,74,226,0.08)" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold"
                      style={{ background: i % 2 === 0 ? "rgba(255,138,0,0.18)" : "rgba(123,74,226,0.18)", border: `1px dashed ${i % 2 === 0 ? "rgba(255,138,0,0.40)" : "rgba(123,74,226,0.40)"}`, color: i % 2 === 0 ? ORANGE : PURPLE }}
                      aria-label={`Avatar placeholder for ${r.name}`}
                    >[Img]</div>
                    <div>
                      <div className="font-bold text-sm text-white/90">{r.name}</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{r.date}</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, idx) => <Star key={idx} className={`w-3.5 h-3.5 ${idx < r.rating ? "fill-current" : "text-white/15 fill-white/10"}`} />)}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>"{r.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ─────────────────────────────────────────────────────────── */}
        <section className="py-24 relative overflow-hidden" style={{ background: `linear-gradient(180deg, rgba(255,138,0,0.05), rgba(123,74,226,0.06)), ${BG}`, borderTop: "1px solid rgba(123,74,226,0.12)", borderBottom: "1px solid rgba(255,138,0,0.12)" }}>
          <div className="container mx-auto px-4">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 mx-auto block text-center" style={{ background: "rgba(123,74,226,0.15)", border: "1px solid rgba(123,74,226,0.40)", color: PURPLE, width: "fit-content" }}>
              Gallery
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-12 text-center">Our Clinic & Happy Patients</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Clinic reception — warm modern interior",
                "Exam room — clean, professional equipment",
                "Grooming station — happy dog being bathed",
                "Vet examining a kitten — gentle and careful",
                "Team photo — friendly staff in scrubs",
                "Happy dog after grooming — sparkling clean",
              ].map((label, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-xl flex items-center justify-center text-xs font-medium p-4 text-center"
                  style={{
                    background: i % 2 === 0
                      ? "linear-gradient(135deg, rgba(255,138,0,0.14), rgba(123,74,226,0.10))"
                      : "linear-gradient(135deg, rgba(123,74,226,0.14), rgba(255,138,0,0.10))",
                    border: `1.5px dashed ${i % 2 === 0 ? "rgba(255,138,0,0.40)" : "rgba(123,74,226,0.40)"}`,
                    color: i % 2 === 0 ? "rgba(255,138,0,0.60)" : "rgba(123,74,226,0.70)",
                  }}
                  aria-label={label}
                >
                  [{label}]
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING FORM ────────────────────────────────────────────────────── */}
        <section id="booking" className="py-24 relative overflow-hidden" style={{ background: BG }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(255,138,0,0.10) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(123,74,226,0.12) 0%, transparent 50%)" }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-5">
                <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.35)", color: ORANGE }}>
                  Book Online
                </div>
                <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">Book Your Appointment</h2>
                <p className="mb-10 text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>Fill out the form and our team will get back to you immediately to confirm your visit.</p>
                <div className="space-y-8">
                  {[
                    { icon: <Phone className="w-5 h-5" />, title: "Call Us 24/7",   body: <a href="tel:+971527394636" className="text-white/65 hover:text-white transition-colors">+971 52 739 4636</a>, iStyle: iconOrange },
                    { icon: <MapPin className="w-5 h-5" />, title: "Location",       body: <p className="text-white/65 leading-relaxed text-sm">Sobha Daffodil, Al Barsha South Fourth,<br />Jumeirah Village Circle (JVC), Dubai, UAE</p>, iStyle: iconPurple },
                    { icon: <Clock  className="w-5 h-5" />, title: "Opening Hours",  body: <p className="text-white/65 leading-relaxed text-sm">12am–6am & 10am–12am daily<br /><span className="font-semibold" style={{ color: ORANGE }}>Emergencies: 24/7</span></p>, iStyle: iconOrange },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={item.iStyle}>{item.icon}</div>
                      <div><div className="font-bold text-white mb-1">{item.title}</div>{item.body}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="p-6 md:p-8 rounded-2xl" style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: "0 16px 64px rgba(123,74,226,0.18), 0 0 0 1px rgba(255,138,0,0.08)" }}>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="hidden">
                        <FormField control={form.control} name="website" render={({ field }) => (
                          <FormItem><FormControl><Input {...field} tabIndex={-1} autoComplete="off" /></FormControl></FormItem>
                        )} />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel style={{ color: "rgba(255,255,255,0.75)" }}>Full Name *</FormLabel>
                            <FormControl><Input placeholder="John Doe" className="bg-white/5 border-white/10 focus-visible:ring-primary" data-testid="input-name" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel style={{ color: "rgba(255,255,255,0.75)" }}>Phone Number *</FormLabel>
                            <FormControl><Input placeholder="+971 50 000 0000" className="bg-white/5 border-white/10 focus-visible:ring-primary" data-testid="input-phone" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel style={{ color: "rgba(255,255,255,0.75)" }}>Email (Optional)</FormLabel>
                            <FormControl><Input placeholder="john@example.com" type="email" className="bg-white/5 border-white/10 focus-visible:ring-primary" data-testid="input-email" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="petType" render={({ field }) => (
                          <FormItem>
                            <FormLabel style={{ color: "rgba(255,255,255,0.75)" }}>Pet Type *</FormLabel>
                            <FormControl><Input placeholder="e.g. Dog (Golden Retriever)" className="bg-white/5 border-white/10 focus-visible:ring-primary" data-testid="input-pet-type" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="service" render={({ field }) => (
                          <FormItem>
                            <FormLabel style={{ color: "rgba(255,255,255,0.75)" }}>Service Required *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-white/5 border-white/10 focus:ring-primary" data-testid="select-service">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="checkup">Check-up</SelectItem>
                                <SelectItem value="vaccination">Vaccination</SelectItem>
                                <SelectItem value="deworming">Deworming</SelectItem>
                                <SelectItem value="grooming">Grooming</SelectItem>
                                <SelectItem value="castration">Spay/Neuter</SelectItem>
                                <SelectItem value="emergency">Emergency</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="preferredDate" render={({ field }) => (
                          <FormItem>
                            <FormLabel style={{ color: "rgba(255,255,255,0.75)" }}>Preferred Date & Time</FormLabel>
                            <FormControl><Input type="datetime-local" className="bg-white/5 border-white/10 focus-visible:ring-primary" data-testid="input-date" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="notes" render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{ color: "rgba(255,255,255,0.75)" }}>Notes / Questions</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell us a bit about your pet's needs..." className="resize-none bg-white/5 border-white/10 focus-visible:ring-primary min-h-[100px]" data-testid="textarea-notes" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <button
                        type="submit"
                        disabled={createAppointment.isPending}
                        data-testid="button-submit-appointment"
                        className="w-full h-14 text-base rounded-xl transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                        style={primaryBtn}
                      >
                        {createAppointment.isPending ? "Submitting..." : "Book Your Visit Today"}
                      </button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAP ─────────────────────────────────────────────────────────────── */}
        <section id="contact" className="py-24" style={{ background: `linear-gradient(135deg, rgba(123,74,226,0.06), rgba(255,138,0,0.05)), ${BG}`, borderTop: "1px solid rgba(255,138,0,0.12)" }}>
          <div className="container mx-auto px-4">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 mx-auto block text-center" style={{ background: "rgba(123,74,226,0.15)", border: "1px solid rgba(123,74,226,0.40)", color: PURPLE, width: "fit-content" }}>
              Location
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-10 text-center">Find Us in JVC, Dubai</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: <MapPin className="w-5 h-5" />, label: "Address", text: "Sobha Daffodil, Al Barsha South Fourth, JVC, Dubai, UAE",   href: undefined, iStyle: iconOrange },
                { icon: <Phone  className="w-5 h-5" />, label: "Phone",   text: "+971 52 739 4636",                                           href: "tel:+971527394636", iStyle: iconPurple },
                { icon: <Clock  className="w-5 h-5" />, label: "Hours",   text: "12am–6am & 10am–12am · Emergencies 24/7",                   href: undefined, iStyle: iconOrange },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl flex gap-4 items-start" style={{ background: CARD_BG, border: CARD_BORDER }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={item.iStyle}>{item.icon}</div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.40)" }}>{item.label}</div>
                    {item.href
                      ? <a href={item.href} className="text-white/80 hover:text-white text-sm font-medium transition-colors">{item.text}</a>
                      : <div className="text-white/75 text-sm">{item.text}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl relative" style={{ border: "1px solid rgba(255,138,0,0.15)", boxShadow: "0 8px 48px rgba(123,74,226,0.12)" }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.4887219743545!2d55.20612587600347!3d25.059891140483856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6d3a3b2f8e7d%3A0x123456789abcdef!2sJumeirah+Village+Circle%2C+Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 grayscale opacity-80" />
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
        <section className="py-24" style={{ background: BG, borderTop: "1px solid rgba(123,74,226,0.12)" }}>
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 mx-auto block text-center" style={{ background: "rgba(255,138,0,0.15)", border: "1px solid rgba(255,138,0,0.35)", color: ORANGE, width: "fit-content" }}>
              FAQ
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                { q: "Do I need an appointment for emergency care?",    a: "No. Our emergency team is available 24/7 — walk in any time day or night. We will see your pet immediately." },
                { q: "What are your opening hours?",                    a: "We operate in two daily blocks: 12am–6am and 10am–12am (midnight). For emergencies, we're always available." },
                { q: "Do you provide vaccination booklets for travel?", a: "Yes. We issue complete vaccination documentation and health certificates for international travel." },
                { q: "How do I book a grooming session?",               a: "You can book via our online form above, call us at +971 52 739 4636, or send us a WhatsApp message." },
                { q: "Do you accept walk-ins?",                         a: "Yes, walk-ins are welcome for all services, though booking ahead reduces your wait time." },
                { q: "What types of pets do you treat?",                a: "We care for dogs, cats, and small pets. Contact us for exotic animals." },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i + 1}`} className="px-6 rounded-xl" style={{ background: CARD_BG, border: CARD_BORDER }} data-testid={`accordion-faq-${i}`}>
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

        {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
        <section className="py-28 text-center relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(255,138,0,0.16) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(123,74,226,0.16) 0%, transparent 55%), #0F1018", borderTop: "1px solid rgba(255,138,0,0.15)" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px]" style={{ background: `linear-gradient(to right, transparent, ${ORANGE}80, ${PURPLE}80, transparent)` }} />
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6">Your Pet Deserves the Best Care</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.60)" }}>Don't wait — we're open 24 hours, 7 days a week.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button data-testid="button-book-cta" onClick={() => go("booking")} className="w-full sm:w-auto h-14 px-10 rounded-xl text-base transition-transform hover:scale-105" style={primaryBtn}>
                Book an Appointment
              </button>
              <a href="tel:+971527394636" data-testid="link-call-cta" className="w-full sm:w-auto h-14 px-10 rounded-xl text-base flex items-center justify-center gap-2 transition-all hover:brightness-125" style={secondaryBtn}>
                <Phone className="w-4 h-4" />Call Now: +971 52 739 4636
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="py-16" style={{ background: `linear-gradient(180deg, rgba(255,138,0,0.06), rgba(123,74,226,0.06)), #0F1018`, borderTop: "1px solid rgba(255,138,0,0.15)" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PURPLE})`, boxShadow: "0 0 16px rgba(255,138,0,0.35)" }}>
                  <PawPrint className="w-4 h-4 text-white" />
                </div>
                <span className="font-poppins font-bold text-xl tracking-tight">Pet Friends</span>
              </div>
              <p className="mb-6 max-w-sm text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>More than a clinic — a second home for their hearts. 24/7 veterinary care and grooming in JVC.</p>
              <div className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>Part of Ragab Elhofy Group</div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white/85">Contact</h4>
              <ul className="space-y-4 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                <li className="flex items-start gap-3"><MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: ORANGE }} /><span>Sobha Daffodil, Al Barsha South Fourth, JVC, Dubai, UAE</span></li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 shrink-0" style={{ color: ORANGE }} /><a href="tel:+971527394636" className="hover:text-white transition-colors">+971 52 739 4636</a></li>
                <li className="flex items-start gap-3"><Clock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: PURPLE }} /><span>12am–6am & 10am–12am daily<br />Emergencies: 24/7</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white/85">Quick Links</h4>
              <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                <li><button onClick={() => go("services")} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => go("about")} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => go("reviews")} className="hover:text-white transition-colors">Reviews</button></li>
                <li><a href="https://instagram.com/pet_friends_vet_clinic" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram (7.6k followers)</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.30)" }}>
            <div>© 2026 Pet Friends Vet Clinic. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FAB ────────────────────────────────────────────────────── */}
      <a href="https://wa.me/971527394636" target="_blank" rel="noreferrer" data-testid="fab-whatsapp" className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform z-50 mb-14 md:mb-0" style={{ boxShadow: "0 4px 28px rgba(37,211,102,0.50)" }} aria-label="Chat on WhatsApp">
        <MessageCircle className="w-8 h-8" />
      </a>

      {/* ── MOBILE CALL BAR ─────────────────────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-3 z-40" style={{ background: "#0F1018", borderTop: "1px solid rgba(255,138,0,0.20)", boxShadow: "0 -4px 24px rgba(0,0,0,0.6)" }}>
        <a href="tel:+971527394636" data-testid="link-mobile-call-bar" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm" style={primaryBtn}>
          <Phone className="w-4 h-4" />+971 52 739 4636 · Call Now
        </a>
      </div>
    </div>
  );
}
