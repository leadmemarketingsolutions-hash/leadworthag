import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section id="cta" className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Start Turning Calls Into Customers Today
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
          Book a demo and we'll show you exactly how LeadWorth Marketing fits your business.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="btn-primary-gradient rounded-full px-8 h-12 text-base">
            Schedule a Demo
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-border hover:bg-secondary">
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
