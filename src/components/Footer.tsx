const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
        
        <a href="#" className="font-display text-lg font-bold text-foreground">
          Lead<span className="text-primary">Worthy</span>
        </a>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="/privacy-policy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2025 LeadWorthy Marketing. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;