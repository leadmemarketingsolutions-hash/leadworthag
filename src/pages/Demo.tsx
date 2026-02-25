import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Demo = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
          Schedule a Demo
        </h1>

        {/* GoHighLevel Booking Widget */}
        <iframe
          src="https://api.leadconnectorhq.com/widget/booking/Wl78X5fFfbzJd4ZiH5Lz"
          style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "800px" }}
          scrolling="no"
          id="Wl78X5fFfbzJd4ZiH5Lz"
          title="LeadWorthy Demo Booking"
        />
      </div>
    </div>
  );
};

export default Demo;