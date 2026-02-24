const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="/" className="font-display text-lg font-bold text-foreground">
          Lead<span className="text-primary">Worthy</span>
        </a>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</a>
        </div>

        <p className="text-sm text-muted-foreground">© 2026 LeadWorthy Marketing. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
