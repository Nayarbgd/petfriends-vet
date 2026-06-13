import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/Layout";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const Home            = lazy(() => import("@/pages/home"));
const Services        = lazy(() => import("@/pages/services"));
const About           = lazy(() => import("@/pages/about"));
const Reviews         = lazy(() => import("@/pages/reviews"));
const Contact         = lazy(() => import("@/pages/contact"));
const BookAppointment = lazy(() => import("@/pages/book-appointment"));
const Emergency       = lazy(() => import("@/pages/emergency"));

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

const pageVariants = {
  initial: { opacity: 0, y: isMobile ? 6 : 14 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: isMobile ? -4 : -10 },
};

const pageTransition = {
  duration: isMobile ? 0.22 : 0.32,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

function AnimatedRoutes() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        style={{ willChange: "opacity, transform" }}
      >
        <Switch>
          <Route path="/"                 component={Home}            />
          <Route path="/services"         component={Services}        />
          <Route path="/about"            component={About}           />
          <Route path="/reviews"          component={Reviews}         />
          <Route path="/contact"          component={Contact}         />
          <Route path="/book-appointment" component={BookAppointment} />
          <Route path="/emergency"        component={Emergency}       />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function Router() {
  return (
    <Layout>
      <AnimatedRoutes />
    </Layout>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
