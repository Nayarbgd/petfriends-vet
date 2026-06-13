import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Calendar, CheckCircle2, PawPrint, MessageCircle, Star, StarHalf, ChevronRight, Menu, X, Syringe, Scissors, Shield } from "lucide-react";

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

// Brand tokens
const ORANGE = "#FF8A00";
const PURPLE = "#7B4AE2";
const CARD_BG = "#15151D";
const BG = "#0D0D12";

const gradientBtn: React.CSSProperties = {
  background: "linear-gradient(135deg, #FF8A00, #FFB347)",
  color: "#111111",
  boxShadow: "0 4px 24px rgba(255,138,0,0.45)",
  border: "none",
  fontWeight: 700,
};

const ghostPurpleBtn: React.CSSProperties = {
  background: "rgba(123,74,226,0.15)",
  border: "1px solid rgba(123,74,226,0.35)",
  color: "white",
  fontWeight: 700,
};

const cardStyle: React.CSSProperties = {
  background: CARD_BG,
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "0 8px 40px rgba(123,74,226,0.10)",
  borderRadius: "0.75rem",
};

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

export default function Home() {
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const createAppointment = useCreateAppointment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      petType: "",
      service: undefined,
      preferredDate: "",
      notes: "",
      website: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.website) return;
    createAppointment.mutate(
      {
        data: {
          name: values.name,
          phone: values.phone,
          email: values.email || null,
          petType: values.petType,
          service: values.service,
          preferredDate: values.preferredDate || null,
          notes: values.notes || null,
          honeypot: values.website || null,
        },
      },
      {
        onSuccess: () => {
          toast({ title: "Appointment Requested!", description: "We'll contact you shortly to confirm your appointment!" });
          form.reset();
        },
        onError: () => {
          toast({ variant: "destructive", title: "Something went wrong", description: "Please try again or call us directly." });
        },
      }
    );
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    { title: "Veterinary Check-ups", desc: "Comprehensive health exams — catch problems early, keep tails wagging", icon: <CheckCircle2 className="w-6 h-6" />, color: ORANGE, service: "checkup" as const },
    { title: "Vaccinations", desc: "Full vaccination protocols with travel documentation — stress-free and clear", icon: <Syringe className="w-6 h-6" />, color: PURPLE, service: "vaccination" as const },
    { title: "Deworming", desc: "Fast, safe deworming for all pets — schedule it today", icon: <Shield className="w-6 h-6" />, color: ORANGE, service: "deworming" as const },
    { title: "Grooming", desc: "Nervous pets welcome. Our patient groomers leave every coat shining", icon: <Scissors className="w-6 h-6" />, color: PURPLE, service: "grooming" as const },
    { title: "Spay / Neuter", desc: "Safe, modern surgical care with full aftercare guidance", icon: <CheckCircle2 className="w-6 h-6" />, color: ORANGE, service: "castration" as const },
    { title: "Emergency Care", desc: "We're here at midnight too. Fast, calm, expert emergency response", icon: <Clock className="w-6 h-6" />, color: PURPLE, service: "emergency" as const },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col font-sans selection:bg-primary/30" style={{ background: BG }}>

      {/* STICKY HEADER */}
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-md"
        style={{
          background: `linear-gradient(90deg, rgba(255,138,0,0.08), rgba(123,74,226,0.08)), rgba(13,13,18,0.85)`,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PURPLE})`, boxShadow: `0 0 18px rgba(255,138,0,0.35)` }}
            >
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="font-poppins font-bold text-xl tracking-tight hidden sm:block">Pet Friends</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            {["services", "about", "reviews", "contact"].map((s) => (
              <button
                key={s}
                data-testid={`link-${s}`}
                onClick={() => scrollToSection(s)}
                className="capitalize transition-colors hover:text-primary"
              >
                {s === "contact" ? "Contact" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a data-testid="link-phone-nav" href="tel:+971527394636" className="hidden lg:flex items-center gap-2 text-sm font-medium text-white/70 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              +971 52 739 4636
            </a>
            <button
              data-testid="button-book-nav"
              onClick={() => scrollToSection("booking")}
              className="px-5 py-2.5 rounded-lg text-sm font-bold transition-transform hover:scale-105"
              style={gradientBtn}
            >
              Book Now
            </button>
            <button data-testid="button-mobile-menu" className="md:hidden p-2 text-white/80" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full backdrop-blur-md p-4 flex flex-col gap-4 shadow-2xl" style={{ background: "rgba(21,21,29,0.97)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["services", "about", "reviews", "contact"].map((s) => (
              <button key={s} data-testid={`link-mobile-${s}`} onClick={() => scrollToSection(s)} className="text-left font-medium py-2 border-b capitalize" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <a data-testid="link-mobile-phone" href="tel:+971527394636" className="flex items-center gap-2 font-bold py-2" style={{ color: ORANGE }}>
              <Phone className="w-4 h-4" />
              +971 52 739 4636
            </a>
          </div>
        )}
      </header>

      <main className="flex-1">

        {/* HERO */}
        <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
          {/* Background glows */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-5%] w-[55%] h-[70%] rounded-full blur-[140px]" style={{ background: "radial-gradient(circle, rgba(255,138,0,0.18) 0%, transparent 70%)" }} />
            <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[70%] rounded-full blur-[130px]" style={{ background: "radial-gradient(circle, rgba(123,74,226,0.18) 0%, transparent 70%)" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                  style={{ background: "rgba(255,138,0,0.12)", border: "1px solid rgba(255,138,0,0.25)", color: ORANGE }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: ORANGE }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: ORANGE }} />
                  </span>
                  24/7 Emergency Vet Care
                </div>

                <h1 className="text-5xl lg:text-7xl font-poppins font-extrabold leading-[1.1] tracking-tight mb-6">
                  More Than a Clinic —{" "}
                  <br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: `linear-gradient(135deg, ${ORANGE}, #FFB347)` }}
                  >
                    A Second Home
                  </span>{" "}
                  for Their Hearts
                </h1>

                <p className="text-lg text-white/65 mb-8 leading-relaxed max-w-xl">
                  24/7 emergency vet care, expert grooming & complete pet health — all in JVC, Dubai.
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  <button
                    data-testid="button-book-hero"
                    onClick={() => scrollToSection("booking")}
                    className="h-14 px-8 rounded-xl text-base transition-transform hover:scale-105"
                    style={gradientBtn}
                  >
                    Book an Appointment
                  </button>
                  <a
                    href="https://wa.me/971527394636"
                    target="_blank"
                    rel="noreferrer"
                    data-testid="link-whatsapp-hero"
                    className="h-14 px-8 rounded-xl text-base flex items-center gap-2 transition-all hover:brightness-110"
                    style={ghostPurpleBtn}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </div>

                <div className="flex items-center gap-4 text-sm text-white/55 font-medium flex-wrap">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    <StarHalf className="w-4 h-4 fill-current" />
                  </div>
                  <span>4.5★ · 1,053 reviews</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>JVC, Dubai</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative h-full min-h-[400px] lg:min-h-[600px]">
                <div
                  className="absolute inset-0 rounded-2xl flex items-center justify-center text-sm font-medium p-8 text-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,138,0,0.15), rgba(123,74,226,0.15))",
                    border: "2px dashed rgba(255,138,0,0.35)",
                    color: "rgba(255,138,0,0.55)",
                  }}
                  aria-label="Hero image: vet gently holding a calm dog in warm-lit clinic"
                >
                  [Hero image: vet gently holding a calm dog in warm-lit clinic]
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }} className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center justify-center px-4">
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(4)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  <StarHalf className="w-5 h-5 fill-current" />
                </div>
                <span className="font-medium text-sm text-white/75">4.5★ from 1,053 reviews</span>
              </div>
              <div className="flex flex-col items-center justify-center px-4">
                <Clock className="w-6 h-6 mb-2" style={{ color: ORANGE }} />
                <span className="font-medium text-sm text-white/75">Open 24/7</span>
              </div>
              <div className="flex flex-col items-center justify-center px-4">
                <CheckCircle2 className="w-6 h-6 mb-2" style={{ color: PURPLE }} />
                <span className="font-medium text-sm text-white/75">Expert Veterinary Staff</span>
              </div>
              <div className="flex flex-col items-center justify-center px-4">
                <div
                  className="w-6 h-6 rounded mb-2 flex items-center justify-center text-[10px] font-bold"
                  style={{ border: `1px solid rgba(123,74,226,0.4)`, color: PURPLE }}
                >
                  RE
                </div>
                <span className="font-medium text-sm text-white/75">Part of Ragab Elhofy Group</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4 inline-block" style={{ color: ORANGE }}>Our Services</span>
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">Complete Care Under One Roof</h2>
              <p className="text-white/55 text-lg">From routine check-ups to midnight emergencies, our clinic is equipped for every situation.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4, boxShadow: `0 16px 48px rgba(123,74,226,0.18)` }}
                  style={cardStyle}
                  className="p-8 cursor-pointer transition-all"
                  onClick={() => { scrollToSection("booking"); }}
                  data-testid={`card-service-${i}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: `${service.color}18`, color: service.color }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-poppins">{service.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-6">{service.desc}</p>
                  <div className="flex items-center font-semibold text-sm" style={{ color: service.color }}>
                    Book this service <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(123,74,226,0.14) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,138,0,0.10) 0%, transparent 70%)" }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px]">
                <div
                  className="absolute inset-0 rounded-2xl flex items-center justify-center text-sm font-medium p-8 text-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,138,0,0.12), rgba(123,74,226,0.12))",
                    border: "2px dashed rgba(123,74,226,0.35)",
                    color: "rgba(123,74,226,0.6)",
                  }}
                  aria-label="Team photo — friendly staff in scrubs in front of Pet Friends Vet Clinic JVC Dubai"
                >
                  [Team photo — friendly staff in scrubs]
                </div>
                <div className="absolute -bottom-6 -right-6 p-6 rounded-xl shadow-2xl max-w-[250px]" style={{ background: CARD_BG, border: "1px solid rgba(255,138,0,0.2)" }}>
                  <div className="font-bold text-2xl mb-1" style={{ color: ORANGE }}>24/7</div>
                  <div className="text-sm text-white/65 font-medium">Network of care in JVC, always ready for your pet.</div>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4 inline-block" style={{ color: PURPLE }}>Why Choose Us</span>
                <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-8">More Than a Clinic, a Second Home</h2>
                <div className="space-y-6">
                  {[
                    { q: "Worried about an emergency?", a: "Our team is here 24/7, even at midnight.", color: ORANGE },
                    { q: "Anxious pet during grooming?", a: "Our groomers handle even the most nervous pets with patience.", color: PURPLE },
                    { q: "Confused about vaccinations?", a: "We explain everything clearly before you decide — no surprises.", color: ORANGE },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-1.5 rounded-full shrink-0" style={{ background: item.color }} />
                      <div>
                        <p className="text-white/45 text-sm mb-1 uppercase tracking-wider font-semibold">{item.q}</p>
                        <p className="text-lg text-white/88">{item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-10 grid grid-cols-2 gap-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div>
                    <div className="font-bold text-white mb-1">Multilingual Staff</div>
                    <div className="text-sm text-white/55">Speaking English, Arabic & more</div>
                  </div>
                  <div>
                    <div className="font-bold text-white mb-1">Ragab Elhofy Group</div>
                    <div className="text-sm text-white/55">Backed by a trusted network</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="reviews" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4 inline-block" style={{ color: ORANGE }}>Reviews</span>
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">What Pet Parents Are Saying</h2>
              <p className="text-white/55 text-lg">Don't just take our word for it. Here is what the JVC pet community thinks of our care.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Sarah Al-Mansouri", rating: 5, date: "March 2026", text: "Dr. Ahmed was incredibly patient with our anxious Labrador puppy during his first check-up. He took time to explain every step of the vaccination process. We won't go anywhere else." },
                { name: "Omar Hassan", rating: 5, date: "April 2026", text: "Yasser in grooming is a miracle worker! My cat absolutely hates being groomed, but she came out perfectly clean and calm. I was amazed." },
                { name: "Priya Sharma", rating: 5, date: "February 2026", text: "We had an emergency at 2am and they were ready the moment we walked in. The team explained the diagnosis clearly and let us visit every day. Truly 24/7." },
                { name: "Khalid Al-Farsi", rating: 4, date: "May 2026", text: "Quick appointment, honest pricing, and the vet answered all my questions about deworming. Very professional team." },
                { name: "Jessica Wong", rating: 5, date: "March 2026", text: "Booked grooming for our golden retriever online — easy process, great result. He looks and smells amazing. Highly recommended for JVC residents!" },
              ].map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={cardStyle}
                  className="p-6"
                  data-testid={`card-review-${i}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,138,0,0.18), rgba(123,74,226,0.18))",
                        border: "1px dashed rgba(255,138,0,0.3)",
                        color: "rgba(255,138,0,0.6)",
                      }}
                      aria-label={`Avatar placeholder for ${review.name}`}
                    >
                      [Img]
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white/90">{review.name}</div>
                      <div className="text-xs text-white/40">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className={`w-3.5 h-3.5 ${idx < review.rating ? "fill-current" : "text-white/20 fill-white/10"}`} />
                    ))}
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed">"{review.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-24 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="container mx-auto px-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4 inline-block text-center w-full" style={{ color: PURPLE }}>Gallery</span>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-12 text-center">Our Clinic & Happy Patients</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Clinic reception — warm modern interior", span: "" },
                { label: "Exam room — clean, professional equipment", span: "" },
                { label: "Grooming station — happy dog being bathed", span: "" },
                { label: "Vet examining a kitten — gentle and careful", span: "" },
                { label: "Team photo — friendly staff in scrubs", span: "" },
                { label: "Happy dog after grooming — sparkling clean", span: "lg:col-span-1" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`aspect-[4/3] rounded-xl flex items-center justify-center text-xs font-medium p-4 text-center ${item.span}`}
                  style={{
                    background: i % 2 === 0
                      ? "linear-gradient(135deg, rgba(255,138,0,0.10), rgba(123,74,226,0.10))"
                      : "linear-gradient(135deg, rgba(123,74,226,0.10), rgba(255,138,0,0.10))",
                    border: `2px dashed ${i % 2 === 0 ? "rgba(255,138,0,0.3)" : "rgba(123,74,226,0.3)"}`,
                    color: i % 2 === 0 ? "rgba(255,138,0,0.5)" : "rgba(123,74,226,0.6)",
                  }}
                  aria-label={item.label}
                >
                  [{item.label}]
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOOKING FORM */}
        <section id="booking" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,138,0,0.06) 0%, rgba(123,74,226,0.06) 100%)" }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4 inline-block" style={{ color: ORANGE }}>Book Online</span>
                <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">Book Your Appointment</h2>
                <p className="text-white/55 mb-10 text-lg">Fill out the form and our team will get back to you immediately to confirm your visit.</p>

                <div className="space-y-8">
                  {[
                    { icon: <Phone className="w-5 h-5" />, title: "Call Us 24/7", content: <a href="tel:+971527394636" className="text-white/65 hover:text-white transition-colors">+971 52 739 4636</a>, color: ORANGE },
                    { icon: <MapPin className="w-5 h-5" />, title: "Location", content: <p className="text-white/65 leading-relaxed">Sobha Daffodil, Al Barsha South Fourth,<br />Jumeirah Village Circle (JVC), Dubai, UAE</p>, color: PURPLE },
                    { icon: <Clock className="w-5 h-5" />, title: "Opening Hours", content: <p className="text-white/65 leading-relaxed">12am–6am & 10am–12am daily<br /><span className="font-medium" style={{ color: ORANGE }}>Emergencies: 24/7</span></p>, color: ORANGE },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: `${item.color}15`, color: item.color }}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-white mb-1">{item.title}</div>
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div style={{ ...cardStyle, boxShadow: "0 16px 60px rgba(123,74,226,0.15)" }} className="p-6 md:p-8">
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
                            <FormLabel className="text-white/75">Full Name *</FormLabel>
                            <FormControl><Input placeholder="John Doe" className="bg-white/5 border-white/10 focus-visible:ring-primary" data-testid="input-name" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/75">Phone Number *</FormLabel>
                            <FormControl><Input placeholder="+971 50 000 0000" className="bg-white/5 border-white/10 focus-visible:ring-primary" data-testid="input-phone" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/75">Email (Optional)</FormLabel>
                            <FormControl><Input placeholder="john@example.com" type="email" className="bg-white/5 border-white/10 focus-visible:ring-primary" data-testid="input-email" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="petType" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/75">Pet Type *</FormLabel>
                            <FormControl><Input placeholder="e.g. Dog (Golden Retriever)" className="bg-white/5 border-white/10 focus-visible:ring-primary" data-testid="input-pet-type" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="service" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/75">Service Required *</FormLabel>
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
                            <FormLabel className="text-white/75">Preferred Date & Time</FormLabel>
                            <FormControl><Input type="datetime-local" className="bg-white/5 border-white/10 focus-visible:ring-primary" data-testid="input-date" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="notes" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/75">Notes / Questions</FormLabel>
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
                        style={gradientBtn}
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

        {/* MAP */}
        <section id="contact" className="py-24" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="container mx-auto px-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4 inline-block text-center w-full" style={{ color: PURPLE }}>Location</span>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-10 text-center">Find Us in JVC, Dubai</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: <MapPin className="w-5 h-5" />, label: "Address", text: "Sobha Daffodil, Al Barsha South Fourth, JVC, Dubai, UAE", color: ORANGE },
                { icon: <Phone className="w-5 h-5" />, label: "Phone", text: "+971 52 739 4636", href: "tel:+971527394636", color: PURPLE },
                { icon: <Clock className="w-5 h-5" />, label: "Hours", text: "12am–6am & 10am–12am · Emergencies 24/7", color: ORANGE },
              ].map((item, i) => (
                <div key={i} style={{ ...cardStyle }} className="p-6 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.color}15`, color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">{item.label}</div>
                    {item.href
                      ? <a href={item.href} className="text-white/80 hover:text-white text-sm font-medium transition-colors">{item.text}</a>
                      : <div className="text-white/80 text-sm">{item.text}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-xl relative" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.4887219743545!2d55.20612587600347!3d25.059891140483856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6d3a3b2f8e7d%3A0x123456789abcdef!2sJumeirah+Village+Circle%2C+Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale contrast-125 opacity-80"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="container mx-auto px-4 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4 inline-block text-center w-full" style={{ color: ORANGE }}>FAQ</span>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                { q: "Do I need an appointment for emergency care?", a: "No. Our emergency team is available 24/7 — walk in any time day or night. We will see your pet immediately." },
                { q: "What are your opening hours?", a: "We operate in two daily blocks: 12am–6am and 10am–12am (midnight). For emergencies, we're always available." },
                { q: "Do you provide vaccination booklets for travel?", a: "Yes. We issue complete vaccination documentation and health certificates for international travel." },
                { q: "How do I book a grooming session?", a: "You can book via our online form above, call us at +971 52 739 4636, or send us a WhatsApp message." },
                { q: "Do you accept walk-ins?", a: "Yes, walk-ins are welcome for all services, though booking ahead reduces your wait time." },
                { q: "What types of pets do you treat?", a: "We care for dogs, cats, and small pets. Contact us for exotic animals." },
              ].map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i + 1}`}
                  className="px-6 rounded-lg transition-colors"
                  style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.06)" }}
                  data-testid={`accordion-faq-${i}`}
                >
                  <AccordionTrigger className="text-left font-semibold text-base hover:no-underline py-5" style={{ color: "rgba(255,255,255,0.88)" }}>
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 leading-relaxed text-sm pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 text-center relative overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${ORANGE}60, ${PURPLE}60, transparent)` }} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[160px]" style={{ background: "radial-gradient(circle, rgba(255,138,0,0.12) 0%, transparent 70%)" }} />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[160px]" style={{ background: "radial-gradient(circle, rgba(123,74,226,0.12) 0%, transparent 70%)" }} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6">Your Pet Deserves the Best Care</h2>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">Don't wait — we're open 24 hours, 7 days a week.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                data-testid="button-book-cta"
                onClick={() => scrollToSection("booking")}
                className="w-full sm:w-auto h-14 px-8 rounded-xl text-base transition-transform hover:scale-105"
                style={gradientBtn}
              >
                Book an Appointment
              </button>
              <a
                href="tel:+971527394636"
                data-testid="link-call-cta"
                className="w-full sm:w-auto h-14 px-8 rounded-xl text-base flex items-center justify-center gap-2 font-bold transition-all hover:brightness-110"
                style={ghostPurpleBtn}
              >
                <Phone className="w-4 h-4" />
                Call Now: +971 52 739 4636
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-16" style={{ background: CARD_BG, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${ORANGE}, ${PURPLE})` }}>
                  <PawPrint className="w-4 h-4 text-white" />
                </div>
                <span className="font-poppins font-bold text-xl tracking-tight">Pet Friends</span>
              </div>
              <p className="text-white/55 mb-6 max-w-sm">More than a clinic — a second home for their hearts. 24/7 veterinary care and grooming in JVC.</p>
              <div className="text-sm font-medium text-white/40">Part of Ragab Elhofy Group</div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white/85">Contact</h4>
              <ul className="space-y-4 text-white/55 text-sm">
                <li className="flex items-start gap-3"><MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: ORANGE }} /><span>Sobha Daffodil, Al Barsha South Fourth, JVC, Dubai, UAE</span></li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 shrink-0" style={{ color: ORANGE }} /><a href="tel:+971527394636" className="hover:text-white transition-colors">+971 52 739 4636</a></li>
                <li className="flex items-start gap-3"><Clock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: PURPLE }} /><span>12am–6am & 10am–12am daily<br />Emergencies: 24/7</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white/85">Quick Links</h4>
              <ul className="space-y-3 text-white/55 text-sm">
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection("reviews")} className="hover:text-white transition-colors">Reviews</button></li>
                <li><a href="https://instagram.com/pet_friends_vet_clinic" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram (7.6k followers)</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/35" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div>© 2026 Pet Friends Vet Clinic. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FAB */}
      <a
        href="https://wa.me/971527394636"
        target="_blank"
        rel="noreferrer"
        data-testid="fab-whatsapp"
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:scale-110 transition-transform z-50 mb-14 md:mb-0"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      {/* MOBILE CALL BAR */}
      <div
        className="md:hidden fixed bottom-0 left-0 w-full p-3 z-40 flex items-center justify-center"
        style={{ background: CARD_BG, borderTop: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 -4px 24px rgba(0,0,0,0.5)" }}
      >
        <a
          href="tel:+971527394636"
          data-testid="link-mobile-call-bar"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-bold text-sm"
          style={gradientBtn}
        >
          <Phone className="w-4 h-4" />
          +971 52 739 4636 · Call Now
        </a>
      </div>
    </div>
  );
}
