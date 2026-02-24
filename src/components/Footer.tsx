import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t mt-24 pb-32 md:pb-10">
      {/* pb-32 = mobile safe space for chat widget */}

      <div className="container mx-auto px-6">

        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-3 items-center text-sm text-muted-foreground">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <a href="#" className="font-display text-lg font-bold text-foreground">
              Lead<span className="text-primary">Worthy</span>
            </a>

            <a
              href="https://instagram.com/leadworthy.ag"
              target="_blank"
              className="hover:text-foreground transition-colors"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* CENTER */}
          <div className="flex justify-center gap-6">
            <a href="/privacy-policy" className="hover:text-foreground">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-foreground">
              Terms of Service
            </a>
          </div>

          {/* RIGHT */}
          <div className="text-right">
            © 2025 LeadWorthy Marketing. All rights reserved.
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden flex-col items-center gap-3 text-sm text-muted-foreground text-center">

          <div className="flex items-center gap-2">
            <a href="#" className="font-display text-lg font-bold text-foreground">
              Lead<span className="text-primary">Worthy</span>
            </a>

            <a href="https://instagram.com/leadworthy.ag" target="_blank">
              <Instagram size={18} />
            </a>
          </div>

          <div className="flex gap-4">
            <a href="/privacy-policy">Privacy</a>
            <a href="/terms-of-service">Terms</a>
          </div>

          <p>© 2025 LeadWorthy Marketing. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;