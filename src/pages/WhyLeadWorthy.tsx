import { Link } from "react-router-dom";
import { Phone, Calendar, Users, Zap, Clock, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";

const stats = [
  { value: "24/7", label: "Always On" },
  { value: "< 1s", label: "Response Time" },
  { value: "100%", label: "Calls Answered" },
  { value: "3x", label: "More Bookings" },
];

const problems = [
  "Missing calls while you're busy with clients",
  "Losing leads to competitors who answer first",
  "Spending hours on scheduling & follow-ups",
  "Paying for a receptionist you don't always need",
];

const features = [
  {
    icon: Phone,
    title: "Never Miss a Call",
    desc: "Your AI receptionist picks up every call instantly — nights, weekends, holidays.",
  },
  {
    icon: Calendar,
    title: "Book Appointments Automatically",
    desc: "Prospects get booked directly into your calendar without back-and-forth.",
  },
  {
    icon: Users,
    title: "Qualify Leads Instantly",
    desc: "Asks the right questions so you only spend time on high-value prospects.",
  },
  {
    icon: Zap,
    title: "SMS Follow-Ups",
    desc: "Sends automated texts with confirmations, reminders, and next steps.",
  },
  {
    icon: Clock,
    title: "Works 24/7/365",
    desc: "No sick days, no breaks, no overtime. Always professional, always on.",
  },
  {
    icon: BarChart3,
    title: "CRM Integration",
    desc: "Syncs with GoHighLevel and other CRMs so every lead is tracked.",
  },
];

const testimonials = [
  {
    quote: "We were losing 40% of our calls after hours. LeadWorthy turned those into booked appointments overnight.",
    name: "Marcus T.",
    role: "Roofing Company Owner",
  },
  {
    quote: "It's like having a full-time receptionist for a fraction of the cost. Our no-show rate dropped by half.",
    name: "Dr. Sarah L.",
    role: "Dental Practice Owner",
  },
  {
    quote: "Within a week, LeadWorthy booked 12 consultations that my team would have missed.",
    name: "James R.",
    role: "Law Firm Partner",
  },
];

const WhyLeadWorthy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-accent-foreground text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Zap size={14} />
            AI-Powered Receptionist for Small Businesses
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
            Stop Losing Leads.<br />
            <span className="text-gradient">Start Closing Them.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            LeadWorthy answers every call, books appointments, and follows up with your leads — automatically. 
            So you can focus on running your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/demo"
              className="btn-primary-gradient px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-2 shadow-lg"
            >
              Schedule a Free Demo <ArrowRight size={20} />
            </Link>
            <Link
              to="/talk-to-sales"
              className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-colors inline-flex items-center gap-2"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-muted/50 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-extrabold text-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Sound Familiar?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Every missed call is a missed opportunity. Here's what most small businesses deal with:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {problems.map((p) => (
              <div
                key={p}
                className="flex items-start gap-3 p-5 rounded-xl bg-destructive/5 border border-destructive/10"
              >
                <span className="mt-0.5 text-destructive text-lg">✕</span>
                <span className="text-foreground font-medium">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / Features */}
      <section className="section-alt py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            How LeadWorthy Fixes This
          </h2>
          <p className="text-center text-muted-foreground mb-14 max-w-xl mx-auto">
            An AI receptionist that works harder than any hire — at a fraction of the cost.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-elevated rounded-2xl p-6">
                <div className="h-11 w-11 rounded-xl btn-primary-gradient flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-14">
            Up and Running in 3 Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Book a Demo", desc: "See LeadWorthy in action for your business type." },
              { step: "2", title: "We Set It Up", desc: "Our team configures everything — scripts, CRM, scheduling." },
              { step: "3", title: "Start Closing", desc: "Your AI receptionist goes live and starts booking leads." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="h-14 w-14 rounded-full btn-primary-gradient flex items-center justify-center text-xl font-bold text-primary-foreground mb-4">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-alt py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-14">
            Businesses Like Yours Love LeadWorthy
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card-elevated rounded-2xl p-6 flex flex-col">
                <p className="text-foreground italic flex-1 mb-4">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
            What You Get With LeadWorthy
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {[
              "AI receptionist answering every call",
              "Automatic appointment booking",
              "Lead qualification & scoring",
              "SMS confirmations & follow-ups",
              "GoHighLevel / CRM integration",
              "24/7 coverage — no overtime",
              "Custom scripts for your business",
              "Dedicated onboarding support",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 py-2">
                <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center rounded-3xl btn-primary-gradient p-12 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Stop Missing Leads?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Join hundreds of small businesses using LeadWorthy to answer calls, book appointments, and grow — on autopilot.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/demo"
              className="px-8 py-4 rounded-full text-lg font-semibold bg-background text-primary hover:bg-background/90 transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              Schedule a Free Demo <ArrowRight size={20} />
            </Link>
            <Link
              to="/talk-to-sales"
              className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors inline-flex items-center gap-2"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        <Link to="/" className="text-primary hover:underline">
          ← Back to LeadWorthy.ca
        </Link>
      </footer>
    </div>
  );
};

export default WhyLeadWorthy;
