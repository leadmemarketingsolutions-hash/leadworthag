import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const getSessionId = () => {
  let id = localStorage.getItem("chatSessionId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("chatSessionId", id);
  }
  return id;
};

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sessionId = getSessionId();

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          sessionId,
          messages: [...messages, userMsg],
        }),
      });

      if (!resp.ok) {
        throw new Error("Server error");
      }

      const contentType = resp.headers.get("content-type");

      // ✅ If streaming
      if (contentType?.includes("text/event-stream")) {
        const reader = resp.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let assistantText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          let idx;
          while ((idx = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, idx);
            buffer = buffer.slice(idx + 1);

            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.replace("data: ", "");

            if (jsonStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonStr);
              const chunk =
                parsed.choices?.[0]?.delta?.content ||
                parsed.choices?.[0]?.message?.content;

              if (chunk) {
                assistantText += chunk;
                setMessages((prev) => {
                  const last = prev[prev.length - 1];
                  if (last?.role === "assistant") {
                    return prev.map((m, i) =>
                      i === prev.length - 1
                        ? { ...m, content: assistantText }
                        : m
                    );
                  }
                  return [...prev, { role: "assistant", content: assistantText }];
                });
              }
            } catch {}
          }
        }
      } else {
        // ✅ Normal JSON response
        const data = await resp.json();
        const msg =
          data?.choices?.[0]?.message?.content ||
          "Sorry, something went wrong.";

        setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Connection error. Please refresh the page and try again.",
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full btn-primary-gradient shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        {open ? (
          <X size={24} className="text-primary-foreground" />
        ) : (
          <MessageCircle size={24} className="text-primary-foreground" />
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] rounded-2xl border bg-background shadow-xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b bg-primary/5 flex items-center gap-3">
            <MessageCircle size={18} />
            <div>
              <p className="text-sm font-semibold">LeadWorthy AI</p>
              <p className="text-xs text-muted-foreground">
                Book your demo instantly
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground text-center">
                👋 Hi! Ask anything or type "Book a demo".
              </p>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user"
                      ? "btn-primary-gradient text-white"
                      : "bg-muted"
                  }`}
                >
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="p-3 border-t flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-full px-4 py-2 text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="h-10 w-10 rounded-full btn-primary-gradient flex items-center justify-center"
            >
              <Send size={16} className="text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;