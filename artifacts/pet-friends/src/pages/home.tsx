import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Calendar, CheckCircle2, PawPrint, MessageCircle, Star, StarHalf, ChevronRight, Menu, X } from "lucide-react";

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
import { Card, CardContent } from "@/components/ui/card";

// --- VALIDATION SCHEMA ---
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
  website: z.string().optional(), // honeypot
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
    if (values.website) {
      // Honeypot caught something
      return;
    }

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
          toast({
            title: "Appointment Requested!",
            description: "We'll contact you shortly to confirm your appointment!",
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Please try again or call us directly.",
          });
        },
      }
    );
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">
      
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(247,148,29,0.3)]">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="font-poppins font-bold text-xl tracking-tight hidden sm:block">Pet Friends</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <button data-testid="link-services" onClick={() => scrollToSection("services")} className="hover:text-primary transition-colors">Services</button>
            <button data-testid="link-about" onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">About</button>
            <button data-testid="link-reviews" onClick={() => scrollToSection("reviews")} className="hover:text-primary transition-colors">Reviews</button>
            <button data-testid="link-contact" onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors">Contact</button>
          </nav>

          <div className="flex items-center gap-4">
            <a data-testid="link-phone-nav" href="tel:+971527394636" className="hidden lg:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              +971 52 739 4636
            </a>
            <Button data-testid="button-book-nav" onClick={() => scrollToSection("booking")} className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-[0_4px_14px_rgba(247,148,29,0.4)]">
              Book Now
            </Button>
            <button data-testid="button-mobile-menu" className="md:hidden p-2 text-white/80" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-card border-b border-white/5 p-4 flex flex-col gap-4 shadow-xl">
            <button data-testid="link-mobile-services" onClick={() => scrollToSection("services")} className="text-left font-medium py-2 border-b border-white/5">Services</button>
            <button data-testid="link-mobile-about" onClick={() => scrollToSection("about")} className="text-left font-medium py-2 border-b border-white/5">About</button>
            <button data-testid="link-mobile-reviews" onClick={() => scrollToSection("reviews")} className="text-left font-medium py-2 border-b border-white/5">Reviews</button>
            <button data-testid="link-mobile-contact" onClick={() => scrollToSection("contact")} className="text-left font-medium py-2 border-b border-white/5">Contact</button>
            <a data-testid="link-mobile-phone" href="tel:+971527394636" className="flex items-center gap-2 font-medium py-2 text-primary">
              <Phone className="w-4 h-4" />
              +971 52 739 4636
            </a>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-secondary/10 blur-[100px]" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  24/7 Emergency Vet Care
                </div>
                <h1 className="text-5xl lg:text-7xl font-poppins font-extrabold leading-[1.1] tracking-tight mb-6">
                  More Than a Clinic — <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">A Second Home</span> for Their Hearts
                </h1>
                <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-xl">
                  24/7 emergency vet care, expert grooming & complete pet health — all in JVC, Dubai.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <Button size="lg" onClick={() => scrollToSection("booking")} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base h-14 px-8 shadow-[0_0_20px_rgba(247,148,29,0.3)]">
                    Book an Appointment
                  </Button>
                  <Button size="lg" asChild variant="outline" className="h-14 px-8 border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 hover:text-[#25D366] font-bold text-base">
                    <a href="https://wa.me/971527394636" target="_blank" rel="noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/60 font-medium">
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <StarHalf className="w-4 h-4 fill-current" />
                  </div>
                  <span>4.5★ · 1,053 reviews</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>JVC, Dubai</span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-full min-h-[400px] lg:min-h-[600px]"
              >
                <div className="absolute inset-0 border-2 border-dashed border-primary/40 bg-white/5 rounded-2xl flex items-center justify-center text-primary/60 text-sm font-medium p-8 text-center" aria-label="Hero image: vet gently holding a calm dog in warm-lit clinic">
                  [Hero image: vet gently holding a calm dog in warm-lit clinic]
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="border-y border-white/5 bg-white/[0.02] py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-x-0 lg:divide-x divide-white/5">
              <div className="flex flex-col items-center justify-center px-4">
                <div className="flex text-yellow-500 mb-2">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <StarHalf className="w-5 h-5 fill-current" />
                </div>
                <span className="font-medium text-sm text-white/80">4.5★ from 1,053 reviews</span>
              </div>
              <div className="flex flex-col items-center justify-center px-4">
                <Clock className="w-6 h-6 text-primary mb-2" />
                <span className="font-medium text-sm text-white/80">Open 24/7</span>
              </div>
              <div className="flex flex-col items-center justify-center px-4">
                <CheckCircle2 className="w-6 h-6 text-secondary mb-2" />
                <span className="font-medium text-sm text-white/80">Expert Veterinary Staff</span>
              </div>
              <div className="flex flex-col items-center justify-center px-4">
                <div className="w-6 h-6 rounded border border-white/20 mb-2 flex items-center justify-center text-[10px] font-bold text-white/50">RE</div>
                <span className="font-medium text-sm text-white/80">Part of Ragab Elhofy Group</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">Complete Care Under One Roof</h2>
              <p className="text-white/60 text-lg">From routine check-ups to midnight emergencies, our state-of-the-art clinic is equipped for every situation.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Veterinary Check-ups", desc: "Comprehensive health exams — catch problems early, keep tails wagging", icon: <CheckCircle2 className="w-6 h-6" /> },
                { title: "Vaccinations", desc: "Full vaccination protocols with travel documentation — stress-free and clear", icon: <CheckCircle2 className="w-6 h-6" /> },
                { title: "Deworming", desc: "Fast, safe deworming for all pets — schedule it today", icon: <CheckCircle2 className="w-6 h-6" /> },
                { title: "Grooming", desc: "Nervous pets welcome. Our patient groomers leave every coat shining", icon: <PawPrint className="w-6 h-6" /> },
                { title: "Spay / Neuter", desc: "Safe, modern surgical care with full aftercare guidance", icon: <CheckCircle2 className="w-6 h-6" /> },
                { title: "Emergency Care", desc: "We're here at midnight too. Fast, calm, expert emergency response", icon: <Clock className="w-6 h-6 text-red-400" /> },
              ].map((service, i) => (
                <Card key={i} className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors group cursor-pointer" onClick={() => {
                  form.setValue("service", "other"); // Just as a demo
                  scrollToSection("booking");
                }}>
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/10 transition-colors">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-poppins">{service.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6 h-10">{service.desc}</p>
                    <div className="flex items-center text-primary font-medium text-sm group-hover:underline">
                      Book this service <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 bg-card/30 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px]">
                <div className="absolute inset-0 border-2 border-dashed border-primary/40 bg-white/5 rounded-2xl flex items-center justify-center text-primary/60 text-sm font-medium p-8 text-center" aria-label="Team photo — friendly staff in scrubs in front of clinic">
                  [Team photo — friendly staff in scrubs]
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-card border border-white/10 p-6 rounded-xl shadow-2xl max-w-[250px]">
                  <div className="text-primary font-bold text-2xl mb-1">24/7</div>
                  <div className="text-sm text-white/70 font-medium">Network of care in JVC, always ready for your pet.</div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-8">More Than a Clinic, a Second Home</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-1.5 bg-primary rounded-full shrink-0" />
                    <div>
                      <p className="text-white/50 text-sm mb-1 uppercase tracking-wider font-semibold">Worried about an emergency?</p>
                      <p className="text-lg text-white/90">Our team is here 24/7, even at midnight.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1.5 bg-secondary rounded-full shrink-0" />
                    <div>
                      <p className="text-white/50 text-sm mb-1 uppercase tracking-wider font-semibold">Anxious pet during grooming?</p>
                      <p className="text-lg text-white/90">Our groomers handle even the most nervous pets with patience.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1.5 bg-primary rounded-full shrink-0" />
                    <div>
                      <p className="text-white/50 text-sm mb-1 uppercase tracking-wider font-semibold">Confused about vaccinations?</p>
                      <p className="text-lg text-white/90">We explain everything clearly before you decide — no surprises.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 pt-10 border-t border-white/5 grid grid-cols-2 gap-6">
                  <div>
                    <div className="font-bold text-white mb-1">Multilingual Staff</div>
                    <div className="text-sm text-white/60">Speaking English, Arabic & more</div>
                  </div>
                  <div>
                    <div className="font-bold text-white mb-1">Ragab Elhofy Group</div>
                    <div className="text-sm text-white/60">Backed by a trusted network</div>
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
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">What Pet Parents Are Saying</h2>
              <p className="text-white/60 text-lg">Don't just take our word for it. Here is what the JVC pet community thinks of our care.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Sarah Al-Mansouri", rating: 5, date: "March 2026", text: "Dr. Ahmed was incredibly patient with our anxious Labrador puppy during his first check-up. He took time to explain every step of the vaccination process. We won't go anywhere else." },
                { name: "Omar Hassan", rating: 5, date: "April 2026", text: "Yasser in grooming is a miracle worker! My cat absolutely hates being groomed, but she came out perfectly clean and calm. I was amazed." },
                { name: "Priya Sharma", rating: 5, date: "February 2026", text: "We had an emergency at 2am and they were ready the moment we walked in. The team explained the diagnosis clearly and let us visit every day. Truly 24/7." },
                { name: "Khalid Al-Farsi", rating: 4, date: "May 2026", text: "Quick appointment, honest pricing, and the vet answered all my questions about deworming. Very professional team." },
                { name: "Jessica Wong", rating: 5, date: "March 2026", text: "Booked grooming for our golden retriever online — easy process, great result. He looks and smells amazing. Highly recommended for JVC residents!" },
              ].map((review, i) => (
                <Card key={i} className="bg-card/30 border-white/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full border border-dashed border-primary/40 bg-white/5 flex items-center justify-center text-primary/40 text-[10px] shrink-0" aria-label={`Avatar for ${review.name}`}>
                        [Img]
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white/90">{review.name}</div>
                        <div className="text-xs text-white/40">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-500 mb-3">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={`w-3.5 h-3.5 ${idx < review.rating ? 'fill-current' : 'text-white/20 fill-white/10'}`} />
                      ))}
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">"{review.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-24 bg-card/30 border-y border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-12 text-center">Our Clinic & Happy Patients</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="aspect-[4/3] border-2 border-dashed border-primary/30 bg-white/5 rounded-xl flex items-center justify-center text-primary/50 text-xs font-medium p-4 text-center" aria-label="Clinic reception — warm modern interior">
                [Clinic reception — warm modern interior]
              </div>
              <div className="aspect-[4/3] border-2 border-dashed border-primary/30 bg-white/5 rounded-xl flex items-center justify-center text-primary/50 text-xs font-medium p-4 text-center" aria-label="Exam room — clean, professional equipment">
                [Exam room — clean, professional equipment]
              </div>
              <div className="aspect-[4/3] border-2 border-dashed border-primary/30 bg-white/5 rounded-xl flex items-center justify-center text-primary/50 text-xs font-medium p-4 text-center" aria-label="Grooming station — happy dog being bathed">
                [Grooming station — happy dog being bathed]
              </div>
              <div className="aspect-[4/3] border-2 border-dashed border-primary/30 bg-white/5 rounded-xl flex items-center justify-center text-primary/50 text-xs font-medium p-4 text-center" aria-label="Vet examining a kitten — gentle and careful">
                [Vet examining a kitten — gentle and careful]
              </div>
              <div className="aspect-[4/3] border-2 border-dashed border-primary/30 bg-white/5 rounded-xl flex items-center justify-center text-primary/50 text-xs font-medium p-4 text-center lg:col-span-2" aria-label="Happy dog after grooming — sparkling clean">
                [Happy dog after grooming — sparkling clean]
              </div>
            </div>
          </div>
        </section>

        {/* BOOKING FORM & INFO */}
        <section id="booking" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
              
              <div className="lg:col-span-5">
                <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6">Book Your Appointment</h2>
                <p className="text-white/60 mb-10 text-lg">Fill out the form and our team will get back to you immediately to confirm your visit.</p>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Call Us 24/7</div>
                      <a href="tel:+971527394636" className="text-white/70 hover:text-primary transition-colors">+971 52 739 4636</a>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-secondary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Location</div>
                      <p className="text-white/70 leading-relaxed">Sobha Daffodil, Al Barsha South Fourth, <br/>Jumeirah Village Circle (JVC), Dubai, UAE</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-primary">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Opening Hours</div>
                      <p className="text-white/70 leading-relaxed">12am–6am & 10am–12am daily<br/><span className="text-primary font-medium">Emergencies: 24/7</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Card className="bg-card/80 border-white/10 backdrop-blur-sm shadow-2xl">
                  <CardContent className="p-6 md:p-8">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        
                        {/* Honeypot */}
                        <div className="hidden">
                          <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} tabIndex={-1} autoComplete="off" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/80">Full Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" className="bg-white/5 border-white/10 focus-visible:ring-primary" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/80">Phone Number *</FormLabel>
                                <FormControl>
                                  <Input placeholder="+971 50 000 0000" className="bg-white/5 border-white/10 focus-visible:ring-primary" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/80">Email (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="john@example.com" type="email" className="bg-white/5 border-white/10 focus-visible:ring-primary" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="petType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/80">Pet Type *</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Dog (Golden Retriever)" className="bg-white/5 border-white/10 focus-visible:ring-primary" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/80">Service Required *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                    <SelectItem value="castration">Spay/Neuter</SelectItem>
                                    <SelectItem value="emergency">Emergency</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="preferredDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/80">Preferred Date & Time</FormLabel>
                                <FormControl>
                                  <Input type="datetime-local" className="bg-white/5 border-white/10 focus-visible:ring-primary color-scheme-dark" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/80">Notes / Questions</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us a bit about your pet's needs..." 
                                  className="resize-none bg-white/5 border-white/10 focus-visible:ring-primary min-h-[100px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          disabled={createAppointment.isPending}
                          className="w-full h-14 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground mt-4 shadow-[0_0_20px_rgba(247,148,29,0.2)]"
                        >
                          {createAppointment.isPending ? "Submitting..." : "Book Your Visit Today"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section id="contact" className="py-24 bg-card/30 border-t border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-10 text-center">Find Us in JVC, Dubai</h2>
            
            <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-xl relative bg-white/5">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.4887219743545!2d55.20612587600347!3d25.059891140483856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6d3a3b2f8e7d%3A0x123456789abcdef!2sJumeirah+Village+Circle%2C+Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale contrast-125 opacity-80 mix-blend-luminosity"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-white/10 bg-white/5 rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary">Do I need an appointment for emergency care?</AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed text-base pt-2 pb-6">
                  No. Our emergency team is available 24/7 — walk in any time day or night. We will see your pet immediately.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-white/10 bg-white/5 rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary">What are your opening hours?</AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed text-base pt-2 pb-6">
                  We operate in two daily blocks: 12am–6am and 10am–12am (midnight). For emergencies, we're always available.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-white/10 bg-white/5 rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary">Do you provide vaccination booklets for travel?</AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed text-base pt-2 pb-6">
                  Yes. We issue complete vaccination documentation and health certificates for international travel.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border border-white/10 bg-white/5 rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary">How do I book a grooming session?</AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed text-base pt-2 pb-6">
                  You can book via our online form above, call us at +971 52 739 4636, or send us a WhatsApp message.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border border-white/10 bg-white/5 rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary">Do you accept walk-ins?</AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed text-base pt-2 pb-6">
                  Yes, walk-ins are welcome for all services, though booking ahead reduces your wait time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6" className="border border-white/10 bg-white/5 rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary">What types of pets do you treat?</AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed text-base pt-2 pb-6">
                  We care for dogs, cats, and small pets. Contact us for exotic animals.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 bg-gradient-to-br from-card to-background border-t border-white/5 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6">Your Pet Deserves the Best Care</h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">Don't wait — we're open 24 hours, 7 days a week.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => scrollToSection("booking")} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base h-14 px-8 shadow-[0_0_20px_rgba(247,148,29,0.3)]">
                Book an Appointment
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-14 px-8 border-white/20 hover:bg-white/5 font-bold text-base">
                <a href="tel:+971527394636">Call Now: +971 52 739 4636</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-card py-16 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <PawPrint className="w-4 h-4 text-white" />
                </div>
                <span className="font-poppins font-bold text-xl tracking-tight">Pet Friends</span>
              </div>
              <p className="text-white/60 mb-6 max-w-sm">More than a clinic — a second home for their hearts. 24/7 veterinary care and grooming in JVC.</p>
              <div className="text-sm font-medium text-white/50">Part of Ragab Elhofy Group</div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white/90">Contact</h4>
              <ul className="space-y-4 text-white/60 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                  <span>Sobha Daffodil, Al Barsha South Fourth, JVC, Dubai, UAE</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0 text-primary" />
                  <a href="tel:+971527394636" className="hover:text-primary transition-colors">+971 52 739 4636</a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                  <span>12am–6am & 10am–12am daily<br/>Emergencies: 24/7</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white/90">Quick Links</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><button onClick={() => scrollToSection("services")} className="hover:text-primary transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection("reviews")} className="hover:text-primary transition-colors">Reviews</button></li>
                <li><a href="https://instagram.com/pet_friends_vet_clinic" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Instagram (7.6k followers)</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <div>© 2026 Pet Friends Vet Clinic. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING FABs */}
      <a 
        href="https://wa.me/971527394636" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform z-50 mb-14 md:mb-0"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      {/* MOBILE BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-card border-t border-white/10 p-3 z-40 flex items-center justify-center shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <a href="tel:+971527394636" className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg">
          <Phone className="w-5 h-5" />
          +971 52 739 4636 · Call Now
        </a>
      </div>

    </div>
  );
}
