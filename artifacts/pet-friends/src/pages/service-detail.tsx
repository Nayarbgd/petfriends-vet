import React from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, Phone, MapPin, Clock, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateAppointment } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import PageHead from "@/components/seo/PageHead";
import { BG, ORANGE, PURPLE, primaryBtn, secondaryBtn, CARD_BG, CARD_BORDER, iconOrange, iconPurple } from "@/lib/brand";
import { getServiceBySlug } from "@/lib/service-content";
import NotFound from "@/pages/not-found";

const formSchema = z.object({
  name:          z.string().min(2, "Name is required"),
  phone:         z.string().min(5, "Phone number is required"),
  email:         z.string().email("Invalid email").optional().or(z.literal("")),
  petType:       z.string().min(2, "Pet type is required"),
  service:       z.enum(["checkup","vaccination","deworming","grooming","castration","emergency","other"], { required_error: "Please select a service" }),
  preferredDate: z.string().optional(),
  notes:         z.string().optional(),
  website:       z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function BookingForm({ preselectedService }: { preselectedService: FormValues["service"] }) {
  const { toast } = useToast();
  const createAppointment = useCreateAppointment();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", email: "", petType: "", service: preselectedService, preferredDate: "", notes: "", website: "" },
  });

  const onSubmit = (values: FormValues) => {
    if (values.website) return;
    createAppointment.mutate(
      { data: { name: values.name, phone: values.phone, email: values.email || null, petType: values.petType, service: values.service, preferredDate: values.preferredDate || null, notes: values.notes || null, honeypot: values.website || null } },
      {
        onSuccess: () => { toast({ title: "Appointment Requested!", description: "We'll contact you shortly to confirm your appointment!" }); form.reset({ service: preselectedService }); },
        onError:   () => { toast({ variant: "destructive", title: "Something went wrong", description: "Please try again or call us directly." }); },
      }
    );
  };

  return (
    <div className="p-6 md:p-10 rounded-2xl" style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: "0 16px 64px rgba(166,94,18,0.18), 0 0 0 1px rgba(255,152,0,0.08)" }}>
      <h3 className="text-2xl font-poppins font-bold mb-2">Book This Service</h3>
      <p className="mb-8 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Fill in your details and we'll confirm your appointment promptly.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="hidden">
            <FormField control={form.control} name="website" render={({ field }) => (
              <FormItem><FormControl><Input {...field} tabIndex={-1} autoComplete="off" /></FormControl></FormItem>
            )} />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel style={{ color: "rgba(255,255,255,0.75)" }}>Full Name *</FormLabel>
                <FormControl><Input placeholder="John Doe" className="bg-white/5 border-white/10 focus-visible:ring-primary" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel style={{ color: "rgba(255,255,255,0.75)" }}>Phone Number *</FormLabel>
                <FormControl><Input placeholder="+971 50 000 0000" className="bg-white/5 border-white/10 focus-visible:ring-primary" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel style={{ color: "rgba(255,255,255,0.75)" }}>Email (Optional)</FormLabel>
                <FormControl><Input placeholder="john@example.com" type="email" className="bg-white/5 border-white/10 focus-visible:ring-primary" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="petType" render={({ field }) => (
              <FormItem>
                <FormLabel style={{ color: "rgba(255,255,255,0.75)" }}>Pet Type *</FormLabel>
                <FormControl><Input placeholder="e.g. Dog (Golden Retriever)" className="bg-white/5 border-white/10 focus-visible:ring-primary" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <FormField control={form.control} name="service" render={({ field }) => (
              <FormItem>
                <FormLabel style={{ color: "rgba(255,255,255,0.75)" }}>Service *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/10 focus:ring-primary">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="checkup">Check-up</SelectItem>
                    <SelectItem value="vaccination">Vaccination</SelectItem>
                    <SelectItem value="deworming">Deworming</SelectItem>
                    <SelectItem value="grooming">Grooming</SelectItem>
                    <SelectItem value="castration">Spay / Neuter</SelectItem>
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
                <FormControl><Input type="datetime-local" className="bg-white/5 border-white/10 focus-visible:ring-primary" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="notes" render={({ field }) => (
            <FormItem>
              <FormLabel style={{ color: "rgba(255,255,255,0.75)" }}>Notes / Questions</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about your pet's needs..." className="resize-none bg-white/5 border-white/10 focus-visible:ring-primary min-h-[90px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <button
            type="submit"
            disabled={createAppointment.isPending}
            className="w-full h-14 text-base rounded-xl transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed font-bold"
            style={primaryBtn}
          >
            {createAppointment.isPending ? "Submitting…" : "Book Your Visit Today"}
          </button>

          <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Or call us directly:{" "}
            <a href="tel:+971527394636" className="underline" style={{ color: ORANGE }}>+971 52 739 4636</a>
          </p>
        </form>
      </Form>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer"
      style={{ background: CARD_BG, border: CARD_BORDER }}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex items-center justify-between gap-4 p-5">
        <span className="font-semibold text-white text-sm leading-snug">{q}</span>
        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform duration-300"
          style={{ color: ORANGE, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>
      {open && (
        <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const svc = getServiceBySlug(params.slug ?? "");

  if (!svc) return <NotFound />;

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: svc.title,
    description: svc.metaDesc,
    url: `https://petfriendsvet.ae/services/${svc.slug}`,
    provider: {
      "@type": "VeterinaryCare",
      name: "Pet Friends Vet Clinic",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sobha Daffodil, Al Barsha South Fourth",
        addressLocality: "Jumeirah Village Circle (JVC)",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
    },
    mainEntityOfPage: {
      "@type": "FAQPage",
      mainEntity: svc.faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  };

  return (
    <>
      <PageHead
        title={svc.metaTitle}
        description={svc.metaDesc}
        canonical={`https://petfriendsvet.ae/services/${svc.slug}`}
        schema={schema}
      />

      {/* ── BREADCRUMB ──────────────────────────────────────────────────────── */}
      <div style={{ background: BG, borderBottom: "1px solid rgba(255,152,0,0.10)" }} className="py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.40)" }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: ORANGE }}>{svc.title}</span>
          </div>
        </div>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(255,152,0,0.14) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 30%, rgba(166,94,18,0.14) 0%, transparent 50%), " +
            BG,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: "rgba(255,152,0,0.15)", border: "1px solid rgba(255,152,0,0.35)", color: ORANGE }}
            >
              {svc.tagline}
            </div>
            <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-6 max-w-4xl mx-auto leading-tight">
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF9800, #D9A441)" }}>
                {svc.heroHeadline.split(" ").slice(0, 3).join(" ")}
              </span>{" "}
              {svc.heroHeadline.split(" ").slice(3).join(" ")}
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.60)" }}>
              {svc.heroSub}
            </p>
            <a
              href="#book"
              className="inline-flex items-center gap-2 h-14 px-10 rounded-xl text-base font-bold transition-transform hover:scale-105"
              style={primaryBtn}
            >
              Book This Service
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── WHY IT MATTERS ──────────────────────────────────────────────────── */}
      <section className="py-20 relative" style={{ background: BG }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,152,0,0.06) 0%, transparent 60%)" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">{svc.whyHeading}</h2>
            <div className="w-16 h-1 rounded-full mx-auto" style={{ background: `linear-gradient(to right, ${ORANGE}, #D9A441)` }} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {svc.benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-8 rounded-2xl"
                style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: "0 4px 24px rgba(166,94,18,0.08)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                  style={i % 2 === 0 ? iconOrange : iconPurple}
                >
                  {b.icon}
                </div>
                <h3 className="text-lg font-poppins font-bold mb-3 text-white">{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{
          background: `linear-gradient(135deg, rgba(255,152,0,0.05), rgba(166,94,18,0.06)), ${BG}`,
          borderTop: "1px solid rgba(255,152,0,0.12)",
        }}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold mb-2">Common Questions</h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>
              About {svc.title.toLowerCase()} at Pet Friends Vet Clinic
            </p>
          </div>
          <div className="space-y-3">
            {svc.faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ────────────────────────────────────────────────────── */}
      <section
        id="book"
        className="py-20 relative"
        style={{ background: BG, borderTop: "1px solid rgba(255,152,0,0.12)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(255,152,0,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(166,94,18,0.08) 0%, transparent 50%)" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Contact sidebar */}
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-poppins font-bold mb-2">Ready to Book?</h2>
              <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
                We'll confirm your appointment for <strong style={{ color: ORANGE }}>{svc.title}</strong> as soon as we receive your request.
              </p>
              <div className="space-y-6">
                {[
                  { icon: <Phone className="w-5 h-5" />, title: "Call Us 24/7", body: <a href="tel:+971527394636" className="hover:text-white transition-colors text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>+971 52 739 4636</a>, iStyle: iconOrange },
                  { icon: <MapPin className="w-5 h-5" />, title: "Location", body: <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>Sobha Daffodil, Al Barsha South Fourth,<br />JVC, Dubai, UAE</p>, iStyle: iconPurple },
                  { icon: <Clock className="w-5 h-5" />, title: "Hours", body: <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>12am–6am & 10am–12am daily<br /><span className="font-semibold" style={{ color: ORANGE }}>Emergencies: 24/7</span></p>, iStyle: iconOrange },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={item.iStyle}>{item.icon}</div>
                    <div><div className="font-bold text-white text-sm mb-1">{item.title}</div>{item.body}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/services" className="flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70" style={{ color: ORANGE }}>
                  <ChevronRight className="w-4 h-4 rotate-180" /> Back to all services
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <BookingForm preselectedService={svc.slug as FormValues["service"]} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
