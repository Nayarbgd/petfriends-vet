import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Menu, X } from "lucide-react";
import { ORANGE, PURPLE, primaryBtn, HEADER_BG } from "@/lib/brand";

const navLinks = [
  { label: "Services",         href: "/services"         },
  { label: "About",            href: "/about"            },
  { label: "Reviews",          href: "/reviews"          },
  { label: "Emergency",        href: "/emergency"        },
  { label: "Contact",          href: "/contact"          },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-md"
      style={{ background: HEADER_BG, borderBottom: "1px solid rgba(255,138,0,0.15)" }}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Pet Friends Vet Clinic logo"
            className="w-11 h-11 rounded-full object-cover transition-transform group-hover:scale-110"
            style={{ boxShadow: "0 0 20px rgba(255,138,0,0.45)" }}
          />
          <span className="font-poppins font-bold text-xl tracking-tight hidden sm:block text-white">
            Pet Friends
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="capitalize transition-colors"
              style={{ color: isActive(link.href) ? ORANGE : "rgba(255,255,255,0.65)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = ORANGE; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isActive(link.href) ? ORANGE : "rgba(255,255,255,0.65)"; }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="tel:+971527394636"
            className="hidden lg:flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: ORANGE }}
          >
            <Phone className="w-4 h-4" />+971 52 739 4636
          </a>
          <Link
            href="/book-appointment"
            className="px-5 py-2.5 rounded-xl text-sm transition-transform hover:scale-105"
            style={primaryBtn}
          >
            Book Now
          </Link>
          <button
            className="md:hidden p-2 text-white/70"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden absolute top-20 left-0 w-full p-4 flex flex-col gap-3 shadow-2xl"
          style={{ background: "rgba(15,16,24,0.97)", borderBottom: "1px solid rgba(255,138,0,0.12)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-left font-medium py-2 capitalize border-b"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                color: isActive(link.href) ? ORANGE : "rgba(255,255,255,0.75)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+971527394636"
            className="flex items-center gap-2 font-bold py-2"
            style={{ color: ORANGE }}
          >
            <Phone className="w-4 h-4" />+971 52 739 4636
          </a>
        </div>
      )}
    </header>
  );
}
