import { CheckCircle2, Clock, Scissors, Shield, Syringe } from "lucide-react";
import React from "react";
import { iconOrange, iconPurple } from "./brand";

export const services = [
  { title: "Veterinary Check-ups",  desc: "Comprehensive health exams — catch problems early, keep tails wagging.",                icon: React.createElement(CheckCircle2, { className: "w-6 h-6" }), style: iconOrange, service: "checkup"    },
  { title: "Vaccinations",           desc: "Full vaccination protocols with travel documentation — stress-free and clear.",          icon: React.createElement(Syringe,      { className: "w-6 h-6" }), style: iconPurple, service: "vaccination" },
  { title: "Deworming",              desc: "Fast, safe deworming for all pets — schedule it today.",                                 icon: React.createElement(Shield,       { className: "w-6 h-6" }), style: iconOrange, service: "deworming"   },
  { title: "Grooming",               desc: "Nervous pets welcome. Our patient groomers leave every coat shining.",                  icon: React.createElement(Scissors,     { className: "w-6 h-6" }), style: iconPurple, service: "grooming"    },
  { title: "Spay / Neuter",          desc: "Safe, modern surgical care with full aftercare guidance.",                              icon: React.createElement(CheckCircle2, { className: "w-6 h-6" }), style: iconOrange, service: "castration"  },
  { title: "Emergency Care",         desc: "We're here at midnight too. Fast, calm, expert emergency response.",                    icon: React.createElement(Clock,        { className: "w-6 h-6" }), style: iconPurple, service: "emergency"   },
];

export const reviews = [
  { name: "Sarah Al-Mansouri", rating: 5, date: "March 2026",    text: "Dr. Ahmed was incredibly patient with our anxious Labrador puppy during his first check-up. He took time to explain every step of the vaccination process. We won't go anywhere else." },
  { name: "Omar Hassan",       rating: 5, date: "April 2026",    text: "Yasser in grooming is a miracle worker! My cat absolutely hates being groomed, but she came out perfectly clean and calm. I was amazed." },
  { name: "Priya Sharma",      rating: 5, date: "February 2026", text: "We had an emergency at 2am and they were ready the moment we walked in. The team explained the diagnosis clearly and let us visit every day. Truly 24/7." },
  { name: "Khalid Al-Farsi",   rating: 4, date: "May 2026",      text: "Quick appointment, honest pricing, and the vet answered all my questions about deworming. Very professional team." },
  { name: "Jessica Wong",      rating: 5, date: "March 2026",    text: "Booked grooming for our golden retriever online — easy process, great result. He looks and smells amazing. Highly recommended for JVC residents!" },
];

export const faqs = [
  { q: "Do I need an appointment for emergency care?",    a: "No. Our emergency team is available 24/7 — walk in any time day or night. We will see your pet immediately." },
  { q: "What are your opening hours?",                    a: "We operate in two daily blocks: 12am–6am and 10am–12am (midnight). For emergencies, we're always available." },
  { q: "Do you provide vaccination booklets for travel?", a: "Yes. We issue complete vaccination documentation and health certificates for international travel." },
  { q: "How do I book a grooming session?",               a: "You can book via our online form, call us at +971 52 739 4636, or send us a WhatsApp message." },
  { q: "Do you accept walk-ins?",                         a: "Yes, walk-ins are welcome for all services, though booking ahead reduces your wait time." },
  { q: "What types of pets do you treat?",                a: "We care for dogs, cats, and small pets. Contact us for exotic animals." },
];

export const SITE_URL = "https://petfriendsvet.ae";
export const CLINIC_PHONE = "+971527394636";
export const CLINIC_ADDRESS = "Sobha Daffodil, Al Barsha South Fourth, JVC, Dubai, UAE";
export const CLINIC_HOURS = "12am–6am & 10am–12am daily · Emergencies 24/7";
