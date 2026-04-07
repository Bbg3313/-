import { useEffect } from "react";
import { useLocation } from "react-router";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Services } from "../components/Services";
import { Doctors } from "../components/Doctors";
import { Events } from "../components/Events";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const hash = (location.hash || window.location.hash).replace(/^#/, "");
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Doctors />
        <Events />
        <Contact />
      </main>
      <Footer className="mt-20 md:mt-28" />
    </div>
  );
}
