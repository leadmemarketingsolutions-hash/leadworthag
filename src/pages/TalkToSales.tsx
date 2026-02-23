import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TalkToSales = () => {
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
          Talk to Sales
        </h1>
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/RJ1uIxyuE0nSyi6e6b3o"
          style={{ width: "100%", height: "1331px", border: "none", borderRadius: "3px" }}
          id="inline-RJ1uIxyuE0nSyi6e6b3o"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Talk to Sales Form"
          data-height="1331"
          data-layout-iframe-id="inline-RJ1uIxyuE0nSyi6e6b3o"
          data-form-id="RJ1uIxyuE0nSyi6e6b3o"
          title="Talk to Sales Form"
        />
      </div>
    </div>
  );
};

export default TalkToSales;
