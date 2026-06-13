import React, { Suspense, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "./Header";
import Footer from "./Footer";
import { MessageCircle, Phone } from "lucide-react";
import { primaryBtn } from "@/lib/brand";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0F1018" }}>
      <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#FF8A00", borderTopColor: "transparent" }} />
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white flex flex-col font-sans" style={{ background: "#0F1018" }}>
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </main>
      <Footer />

      <a
        href="https://wa.me/971527394636"
        target="_blank"
        rel="noreferrer"
        data-testid="fab-whatsapp"
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform z-50 mb-14 md:mb-0"
        style={{ boxShadow: "0 4px 28px rgba(37,211,102,0.50)" }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      <div
        className="md:hidden fixed bottom-0 left-0 w-full p-3 z-40"
        style={{ background: "#0F1018", borderTop: "1px solid rgba(255,138,0,0.20)", boxShadow: "0 -4px 24px rgba(0,0,0,0.6)" }}
      >
        <a
          href="tel:+971527394636"
          data-testid="link-mobile-call-bar"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm"
          style={primaryBtn}
        >
          <Phone className="w-4 h-4" />+971 52 739 4636 · Call Now
        </a>
      </div>
    </div>
  );
}
