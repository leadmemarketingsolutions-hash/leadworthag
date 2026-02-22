import { PhoneOff, Clock, Users, DollarSign, MessageCircle, Shuffle } from "lucide-react";

const painPoints = [
  { icon: PhoneOff, text: "Lost bookings from unanswered calls" },
  { icon: Clock, text: "Long hold times frustrate customers" },
  { icon: Users, text: "Staff burnout from constant phones" },
  { icon: DollarSign, text: "Wasted ad spend on missed leads" },
  { icon: MessageCircle, text: "Hours spent on repetitive questions" },
  { icon: Shuffle, text: "Inconsistent customer experience" },
];

const PainPoints = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Service Businesses Lose Jobs
          </h2>
          <p className="text-muted-foreground text-lg">Most customers won't call twice.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {painPoints.map((p, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-background p-6 flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-destructive" />
              </div>
              <p className="text-sm font-medium text-foreground leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground max-w-xl mx-auto">
          Hiring more staff is expensive. LeadWorth automates the front desk so your team can focus on real work.
        </p>
      </div>
    </section>
  );
};

export default PainPoints;
