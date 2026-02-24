import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">

        {/* Logo */}
        <a href="#" className="font-display text-lg font-bold text-foreground">
          Lead<span className="text-primary">Worthy</span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="/privacy-policy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
        </div>

        {/* Instagram */}
        <a
          href="https://instagram.com/leadworthy.ag"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Instagram size={18} />
          <span className="text-sm">@leadworthy.ag</span>
        </a>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          © 2025 LeadWorthy Marketing. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;