import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
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

function Router() {
  return (
    <Layout>
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
