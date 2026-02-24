import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      {/* TRUE centered wrapper */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 text-center md:text-left">

          {/* Logo */}
          <a href="#" className="font-display text-lg font-bold text-foreground md:justify-self-start">
            Lead<span className="text-primary">Worthy</span>
          </a>

          {/* Privacy / Terms */}
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
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
            aria-label="Instagram"
            className="justify-self-center md:justify-self-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram size={18} />
          </a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground md:justify-self-end">
            © 2025 LeadWorthy Marketing. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;