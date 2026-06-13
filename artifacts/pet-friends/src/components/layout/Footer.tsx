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
                src="/logo.webp"
                alt="Pet Friends Vet Clinic logo"
                className="w-10 h-10 rounded-full object-cover transition-transform group-hover:scale-110"
                style={{ boxShadow: "0 0 16px rgba(255,138,0,0.35)" }}
              />
              <span className="font-poppins font-bold text-xl tracking-tight text-white">Pet Friends</span>
            </Link>
            <p className="mb-6 max-w-sm text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              More than a clinic — a second home for their hearts. 24/7 veterinary care and grooming in JVC.
            </p>
            <div className="text-xs font-semibold mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
              Part of Ragab Elhofy Group
            </div>
            <a
              href="https://www.instagram.com/pet_friends_vet_clinic?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
                boxShadow: "0 4px 20px rgba(253,29,29,0.28)",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 shrink-0">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>@pet_friends_vet_clinic</span>
              <span className="text-white/60 text-xs font-normal">7.6k followers</span>
            </a>
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
