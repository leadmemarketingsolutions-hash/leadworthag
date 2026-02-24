import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      {/* This wrapper keeps footer perfectly centered */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Logo */}
          <a href="#" className="font-display text-lg font-bold text-foreground">
            Lead<span className="text-primary">Worthy</span>
          </a>

          {/* Links + Instagram */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>

            <a
              href="https://instagram.com/leadworthy.ag"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025 LeadWorthy Marketing. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;