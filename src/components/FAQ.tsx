import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does it take to set up?",
    a: "Most businesses are live within 5–7 business days. We handle everything from mapping your services to training the AI.",
  },
  {
    q: "Will the AI sound robotic to my customers?",
    a: "Not at all. LeadWorthy Marketing is trained on natural conversational language specific to your industry and sounds professional and friendly.",
  },
  {
     q: "Can LeadWorthy Marketing book jobs directly into my calendar?",
     a: "Yes. LeadWorthy Marketing integrates with most popular calendar and booking tools, including Google Calendar, Jobber, ServiceTitan, and more.",
  },
  {
     q: "What happens with emergency calls?",
     a: "LeadWorthy Marketing is trained to identify urgent situations and can immediately route those calls to a designated team member or on-call number.",
  },
  {
    q: "Do I need to change my phone number?",
    a: "No. LeadWorthy Marketing works with your existing business number. We simply forward calls or integrate directly with your phone system.",
  },
  {
    q: "Is my customer data secure?",
    a: "Absolutely. All data is encrypted in transit and at rest. We comply with industry standards for data privacy and never share your information.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="card-elevated rounded-xl border-none px-6"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
