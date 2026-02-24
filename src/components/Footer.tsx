import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <a href="#" className="font-display text-lg font-bold text-foreground">
              Lead<span className="text-primary">Worthy</span>
            </a>

            <a
              href="https://instagram.com/leadworthy.ag"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* CENTER */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/privacy-policy" className="hover:text-foreground">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-foreground">Terms of Service</a>
          </div>

          {/* RIGHT */}
          <p className="text-sm text-muted-foreground">
            © 2025 LeadWorthy Marketing. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;