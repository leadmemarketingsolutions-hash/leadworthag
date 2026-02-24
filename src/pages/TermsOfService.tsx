import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-20 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 24, 2026</p>

        <div className="prose prose-sm max-w-none text-foreground space-y-6">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using the LeadWorthy website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">2. Description of Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              LeadWorthy provides AI-powered receptionist and lead management solutions for trade and service businesses. Our services include automated call answering, appointment scheduling, lead nurturing, and customer follow-up across phone, SMS, WhatsApp, and web chat.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Provide accurate and complete information when using our services</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not attempt to reverse-engineer, disassemble, or exploit our AI technology</li>
              <li>Maintain the confidentiality of any account credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">4. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, features, and functionality of the LeadWorthy website and services — including text, graphics, logos, and AI models — are owned by LeadWorthy Marketing and protected by intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">5. Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Fees for our services are outlined in your service agreement. All payments are due according to the terms specified in your subscription or contract. Late payments may result in service suspension.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">6. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              LeadWorthy shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our AI receptionist is a tool to assist your business and should not be solely relied upon for critical communications.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">7. Service Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive for 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance and unforeseen circumstances may temporarily affect availability.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">8. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              Either party may terminate the service agreement with 30 days written notice. We reserve the right to suspend or terminate access immediately for violations of these terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">9. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of Canada, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please contact us at:<br />
              <strong className="text-foreground">Email:</strong> legal@leadworthy.ca
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
