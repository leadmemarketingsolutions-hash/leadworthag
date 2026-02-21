import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "LeadMe picks up every call we miss. We've booked 30% more jobs since going live.",
    name: "Mike Reynolds",
    role: "Owner, Reynolds HVAC",
  },
  {
    quote: "Our office staff used to dread Monday mornings. Now LeadMe handles the rush before we even open.",
    name: "Sarah Chen",
    role: "Operations Manager, BrightClean Services",
  },
  {
    quote: "We were losing leads on weekends. LeadMe captures every one and books them straight into our calendar.",
    name: "James Okoro",
    role: "Founder, Apex Roofing Co.",
  },
  {
    quote: "Setup was dead simple. Within a week, our AI was answering like it had worked with us for years.",
    name: "Linda Marsh",
    role: "Admin Lead, ProPlumb Solutions",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Trade Businesses
          </h2>
        </div>

        <div className="card-elevated rounded-2xl p-8 md:p-12 text-center relative">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>

          <blockquote className="text-lg md:text-xl text-foreground font-medium leading-relaxed mb-6 min-h-[60px]">
            "{t.quote}"
          </blockquote>

          <div>
            <p className="font-semibold text-foreground">{t.name}</p>
            <p className="text-sm text-muted-foreground">{t.role}</p>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
