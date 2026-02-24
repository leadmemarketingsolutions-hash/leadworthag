import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Scroll to top if already on homepage
  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ✅ Go to section from any page
  const goToSection = (id: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        {/* ✅ Logo */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="font-display text-xl font-bold text-foreground"
        >
          Lead<span className="text-primary">Worthy</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => goToSection("features")} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Features
          </button>
          <button onClick={() => goToSection("process")} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            How It Works
          </button>
          <button onClick={() => goToSection("results")} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Results
          </button>
          <button onClick={() => goToSection("faq")} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            FAQ
          </button>
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Button className="btn-primary-gradient rounded-full px-6" asChild>
            <Link to="/demo">Schedule a Demo</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-4 space-y-3">
          <button onClick={() => goToSection("features")} className="block text-sm font-medium text-muted-foreground">
            Features
          </button>
          <button onClick={() => goToSection("process")} className="block text-sm font-medium text-muted-foreground">
            How It Works
          </button>
          <button onClick={() => goToSection("results")} className="block text-sm font-medium text-muted-foreground">
            Results
          </button>
          <button onClick={() => goToSection("faq")} className="block text-sm font-medium text-muted-foreground">
            FAQ
          </button>

          <Button className="btn-primary-gradient rounded-full w-full" asChild>
            <Link to="/demo">Schedule a Demo</Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;