import React from "react";
import { Link } from "wouter";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { ORANGE, PURPLE } from "@/lib/brand";

const quickLinks = [
  { label: "Services",          href: "/services"          },
  { label: "About Us",          href: "/about"             },
  { label: "Reviews",           href: "/reviews"           },
  { label: "Emergency Care",    href: "/emergency"         },
  { label: "Book Appointment",  href: "/book-appointment"  },
  { label: "Contact",           href: "/contact"           },
];

export default function Footer() {
  return (
    <footer
      className="py-16"
      style={{
        background: `linear-gradient(180deg, rgba(255,138,0,0.06), rgba(123,74,226,0.06)), #0F1018`,
        borderTop: "1px solid rgba(255,138,0,0.15)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 w-fit group">
              <img
                src="/logo.png"
                alt="Pet Friends Vet Clinic logo"
                className="w-10 h-10 rounded-full object-cover transition-transform group-hover:scale-110"
                style={{ boxShadow: "0 0 16px rgba(255,138,0,0.35)" }}
              />
              <span className="font-poppins font-bold text-xl tracking-tight text-white">Pet Friends</span>
            </Link>
            <p className="mb-6 max-w-sm text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              More than a clinic — a second home for their hearts. 24/7 veterinary care and grooming in JVC.
            </p>
            <div className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
              Part of Ragab Elhofy Group
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white/85">Contact</h4>
            <ul className="space-y-4 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: ORANGE }} />
                <span>Sobha Daffodil, Al Barsha South Fourth, JVC, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" style={{ color: ORANGE }} />
                <a href="tel:+971527394636" className="hover:text-white transition-colors">+971 52 739 4636</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: PURPLE }} />
                <span>12am–6am & 10am–12am daily<br />Emergencies: 24/7</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 shrink-0" style={{ color: "#25D366" }} />
                <a
                  href="https://wa.me/971527394636"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white/85">Quick Links</h4>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://instagram.com/pet_friends_vet_clinic"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram (7.6k followers)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.30)" }}
        >
          <div>© 2026 Pet Friends Vet Clinic. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
