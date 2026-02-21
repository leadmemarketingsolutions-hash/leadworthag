import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "FAQ", href: "#faq" }];


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ?
      "bg-background/95 backdrop-blur-md shadow-sm border-b border-border" :
      "bg-transparent"}`
      }>

      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-xl font-bold text-foreground">
          Lead<span className="text-primary text-xs font-thin">Agency</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) =>
          <a
            key={l.href}
            href={l.href}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">

              {l.label}
            </a>
          )}
        </nav>

        <div className="hidden md:block">
          <Button className="btn-primary-gradient rounded-full px-6" asChild>
            <a href="#cta">Schedule a Demo</a>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu">

          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen &&
      <div className="md:hidden bg-background border-b border-border px-6 pb-4 space-y-3">
          {navLinks.map((l) =>
        <a
          key={l.href}
          href={l.href}
          onClick={() => setMobileOpen(false)}
          className="block text-sm font-medium text-muted-foreground hover:text-foreground">

              {l.label}
            </a>
        )}
          <Button className="btn-primary-gradient rounded-full w-full" asChild>
            <a href="#cta">Schedule a Demo</a>
          </Button>
        </div>
      }
    </header>);

};

export default Header;