import React, { Suspense, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { Phone } from "lucide-react";
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

      <motion.a
        href="https://wa.me/971527394636"
        target="_blank"
        rel="noreferrer"
        data-testid="fab-whatsapp"
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white z-50 mb-14 md:mb-0"
        style={{ boxShadow: "0 4px 28px rgba(37,211,102,0.50)" }}
        aria-label="Chat on WhatsApp"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
        whileHover={{ scale: 1.12, y: 0 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 32 32" className="w-8 h-8" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.676 4.797 1.853 6.787L2 30l7.436-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 2c6.627 0 12 5.373 12 12s-5.373 12-12 12a11.95 11.95 0 01-6.064-1.646l-.434-.265-4.413 1.08 1.118-4.295-.288-.454A11.95 11.95 0 014 16C4 9.373 9.373 4 16 4zm-3.398 6.5c-.215 0-.563.08-.858.398-.295.317-1.126 1.1-1.126 2.683 0 1.582 1.153 3.112 1.314 3.328.16.215 2.24 3.568 5.514 4.862 2.728 1.077 3.277.862 3.868.808.59-.054 1.903-.778 2.172-1.53.27-.752.27-1.397.188-1.531-.08-.134-.295-.215-.616-.376-.322-.16-1.903-.939-2.198-1.046-.295-.107-.51-.16-.724.161-.215.322-.83 1.046-1.018 1.261-.188.215-.376.242-.697.08-.322-.16-1.358-.5-2.586-1.596-.956-.854-1.601-1.908-1.789-2.23-.188-.322-.02-.496.141-.656.146-.144.322-.376.483-.563.16-.188.215-.322.322-.537.107-.215.054-.403-.027-.563-.08-.16-.708-1.748-.978-2.388-.258-.617-.52-.535-.724-.543-.188-.008-.403-.01-.617-.01z"/>
        </svg>
      </motion.a>

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
