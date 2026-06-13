import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";
import { useCreateAppointment } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import PageHead from "@/components/seo/PageHead";
import { BG, ORANGE, PURPLE, primaryBtn, CARD_BG, CARD_BORDER, iconOrange, iconPurple } from "@/lib/brand";

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

const schema = {
  "@context": "https://schema.org",
  "@type": "ReservationPackage",
  name: "Book a Vet Appointment at Pet Friends Vet Clinic",
  description: "Online appointment booking for veterinary services in JVC Dubai",
  url: "https://petfriendsvet.ae/book-appointment",
  provider: { "@type": "VeterinaryCare", name: "Pet Friends Vet Clinic" },
};

export default function BookAppointment() {
  const { toast } = useToast();
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
        onError:   () => { toast({ variant: "destructive", title: "Something went wrong", description: "Please try again or call us directly." }); },
      }
    );
  };

  return (
    <>
      <PageHead
        title="Book an Appointment | Pet Friends Vet Clinic JVC Dubai"
        description="Book a vet appointment online at Pet Friends Vet Clinic in JVC Dubai. Choose from check-ups, vaccinations, grooming, deworming, spay/neuter and emergency care."
        canonical="https://petfriendsvet.ae/book-appointment"
        schema={schema}
      />

      {/* ── PAGE HERO ─────────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(255,152,0,0.12) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 30%, rgba(166,94,18,0.12) 0%, transparent 50%), " +
            BG,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6" style={{ background: "rgba(255,152,0,0.15)", border: "1px solid rgba(255,152,0,0.35)", color: ORANGE }}>
            Book Online
          </div>
          <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-6">
            Book Your{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #FF9800, #D9A441)" }}>
              Appointment
            </span>
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.60)" }}>
            Fill out the form and our team will contact you shortly to confirm your visit.
          </p>
        </div>
      </section>

      {/* ── FORM SECTION ─────────────────────────────────────────────────── */}
      <section id="booking" className="pb-24 relative overflow-hidden" style={{ background: BG }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(255,152,0,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(166,94,18,0.10) 0%, transparent 50%)" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-poppins font-bold mb-8">Contact Info</h2>
              <div className="space-y-8">
                {[
                  { icon: <Phone className="w-5 h-5" />,  title: "Call Us 24/7",  body: <a href="tel:+971527394636" className="text-white/65 hover:text-white transition-colors">+971 52 739 4636</a>, iStyle: iconOrange },
                  { icon: <MapPin className="w-5 h-5" />, title: "Location",      body: <p className="text-white/65 leading-relaxed text-sm">Sobha Daffodil, Al Barsha South Fourth,<br />Jumeirah Village Circle (JVC), Dubai, UAE</p>, iStyle: iconPurple },
                  { icon: <Clock className="w-5 h-5" />,  title: "Opening Hours", body: <p className="text-white/65 leading-relaxed text-sm">12am–6am & 10am–12am daily<br /><span className="font-semibold" style={{ color: ORANGE }}>Emergencies: 24/7</span></p>, iStyle: iconOrange },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={item.iStyle}>{item.icon}</div>
                    <div><div className="font-bold text-white mb-1">{item.title}</div>{item.body}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="p-6 md:p-8 rounded-2xl" style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: "0 16px 64px rgba(166,94,18,0.18), 0 0 0 1px rgba(255,152,0,0.08)" }}>
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
    </>
  );
}
