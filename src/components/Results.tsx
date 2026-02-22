import { Check } from "lucide-react";

const benefits = [
  "24/7 call coverage without overtime",
  "More booked jobs from existing leads",
  "Faster response to new enquiries",
  "After-hours lead capture",
  "Less stress for office staff",
  "Better ROI on marketing spend",
  "Consistent customer experience",
  "A system that works while you sleep",
];

const Results = () => {
  return (
    <section id="results" className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Changes After LeadWorth
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-accent/50">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
