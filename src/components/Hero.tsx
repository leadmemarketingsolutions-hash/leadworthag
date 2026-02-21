import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const trustPoints = [
  "Always answers",
  "Less pressure on staff",
  "Capture more leads",
  "Secure & privacy-aware",
];

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent opacity-60 blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent opacity-40 blur-3xl translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-6 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6 animate-fade-up">
          Built for Home Service & Trade Teams
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Turn Every Service Call Into a{" "}
          <span className="text-gradient">Booked Job</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          LeadMe's AI Receptionist answers your calls, texts, and website chats 24/7 — so you never miss a paying customer.
        </p>

        <p className="text-base text-muted-foreground max-w-xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.25s" }}>
          We design and deploy an AI assistant trained on your services, pricing, and workflows. It handles enquiries, schedules jobs, and routes urgent calls automatically.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" className="btn-primary-gradient rounded-full px-8 text-base h-12" asChild>
            <a href="#cta">Schedule a Demo</a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-12 border-border hover:bg-secondary" asChild>
            <a href="#features">See It in Action</a>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {trustPoints.map((point) => (
            <div key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
