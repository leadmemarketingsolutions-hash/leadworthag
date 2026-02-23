import { Phone, Calendar, RefreshCw, HelpCircle, AlertTriangle, Moon, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
{ icon: Phone, title: "Instantly answers incoming service calls" },
{ icon: Calendar, title: "Books jobs and updates calendars automatically" },
{ icon: RefreshCw, title: "Handles reschedules and cancellations" },
{ icon: HelpCircle, title: "Answers common questions about services and pricing" },
{ icon: AlertTriangle, title: "Flags emergency or high-priority calls" },
{ icon: Moon, title: "Captures after-hours leads" },
{ icon: Link, title: "Connects with your CRM or booking software" }];


const Features = () => {
  return (
    <section id="features" className="py-20 md:py-28 section-alt">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Always-On AI Front Desk
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">LeadWorthy works across phone, SMS, WhatsApp, and web chat — built for real-world trade businesses.

          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) =>
          <div
            key={i}
            className="card-elevated rounded-xl p-6 flex items-start gap-4">

              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <f.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground leading-relaxed">{f.title}</p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="btn-primary-gradient rounded-full px-8 h-12" asChild>
            <a href="/demo">Launch Your LeadWorthy Assistant</a>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">Ready in under a week.</p>
        </div>
      </div>
    </section>);

};

export default Features;