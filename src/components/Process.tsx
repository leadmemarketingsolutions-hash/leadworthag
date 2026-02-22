import { Button } from "@/components/ui/button";
import { Search, Brain, Zap, TrendingUp } from "lucide-react";

const steps = [
  { icon: Search, num: "1", title: "Discover", desc: "We map your services, service areas, call flow, and booking rules." },
  { icon: Brain, num: "2", title: "Train", desc: "Your AI learns real customer scenarios, pricing ranges, and escalation paths." },
  { icon: Zap, num: "3", title: "Go Live", desc: "LeadWorthy Marketing works across phone, SMS, WhatsApp, and chat — synced with your calendar." },
  { icon: TrendingUp, num: "4", title: "Improve", desc: "We monitor conversations and continuously boost booking rates." },
];

const Process = () => {
  return (
    <section id="process" className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple Setup. Powerful Results.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Step {s.num}</div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="btn-primary-gradient rounded-full px-8 h-12" asChild>
            <a href="#cta">Get Started with LeadWorthy Marketing</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Process;
