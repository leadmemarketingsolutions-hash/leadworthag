import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PainPoints from "@/components/PainPoints";
import Process from "@/components/Process";
import Results from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <PainPoints />
      <Process />
      <Results />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Index;
