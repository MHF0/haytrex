import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { FALLBACK, GREETING, KNOWLEDGE } from "@/data/assistant-knowledge";
import { deliverLead } from "@/components/assistant/lead-delivery";
import { useReducedMotion } from "@/hooks/use-motion";

interface Message {
  role: "bot" | "user";
  text: string;
  chips?: string[];
}

/** Stage of the details hand-off. `idle` means we are still just answering. */
type Capture = "idle" | "name" | "email" | "phone" | "sending" | "done";

/** Answer after this many visitor questions, then offer to take details. */
const ASK_AFTER = 3;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Scores each knowledge entry against the question and returns the best match.
 * Longer keyword hits count for more, so "portal cost" beats a bare "portal".
 * Returns null when nothing scores well enough to answer honestly.
 */
function findAnswer(question: string) {
  const text = question.toLowerCase();
  let best: (typeof KNOWLEDGE)[number] | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (text.includes(keyword)) score += keyword.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 3 ? best : null;
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: GREETING.message, chips: GREETING.chips },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [capture, setCapture] = useState<Capture>("idle");
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [answered, setAnswered] = useState(0);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  // Keep the newest message in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [messages, typing, reduced]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, capture]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const say = (text: string, chips?: string[], delay = 420) => {
    setTyping(true);
    window.setTimeout(
      () => {
        setTyping(false);
        setMessages((current) => [...current, { role: "bot", text, chips }]);
      },
      reduced ? 0 : delay,
    );
  };

  const beginCapture = () => {
    setCapture("name");
    say("Happy to. What name should I put on it?");
  };

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text) return;

    setMessages((current) => [...current, { role: "user", text }]);
    setDraft("");

    // --- collecting details -------------------------------------------------
    if (capture === "name") {
      setLead((l) => ({ ...l, name: text }));
      setCapture("email");
      say(`Thanks ${text.split(" ")[0]}. What's the best email to reach you on?`);
      return;
    }

    if (capture === "email") {
      if (!EMAIL_PATTERN.test(text)) {
        say("That doesn't look like a complete email address — could you check it?");
        return;
      }
      setLead((l) => ({ ...l, email: text }));
      setCapture("phone");
      say("Got it. And a phone number?");
      return;
    }

    if (capture === "phone") {
      if (text.replace(/\D/g, "").length < 7) {
        say("That looks a little short for a phone number — could you check it?");
        return;
      }

      const finished = { ...lead, phone: text };
      setLead(finished);
      setCapture("sending");
      setTyping(true);

      const transcript = [...messages, { role: "user" as const, text }].map(({ role, text }) => ({ role, text }));
      const outcome = await deliverLead({ ...finished, transcript });

      setTyping(false);
      setCapture("done");
      setMessages((current) => [
        ...current,
        {
          role: "bot",
          text:
            outcome === "sent"
              ? `Thank you — that's with the team now, and they'll reply to ${finished.email} shortly. Anything else I can help with in the meantime?`
              : `I've opened an email draft with your details — press send and it will reach the team. You can also reach us directly at ${COMPANY.email}.`,
        },
      ]);
      return;
    }

    // --- answering ----------------------------------------------------------
    const wantsHandoff = /take my details|contact me|call me|speak to someone|talk to someone|yes,? take/i.test(text);
    if (wantsHandoff) {
      beginCapture();
      return;
    }

    const match = findAnswer(text);
    const asked = answered + 1;
    setAnswered(asked);

    if (!match) {
      say(FALLBACK, ["Yes, take my details"]);
      return;
    }

    // After a few answered questions, offer the hand-off alongside the answer.
    const offerNow = asked >= ASK_AFTER && capture === "idle";
    const chips = offerNow
      ? [...(match.followUps ?? []).slice(0, 2), "Yes, take my details"]
      : match.followUps;

    say(
      offerNow
        ? `${match.answer}\n\nIf it would help, I can pass your details to the team so they can come back to you directly.`
        : match.answer,
      chips,
    );
  };

  const handleChip = (chip: string) => {
    if (chip === "Open the booking calendar" || chip === "Book a demo" || chip === "Book a consultation") {
      window.open(COMPANY.calendly, "_blank", "noopener,noreferrer");
      return;
    }
    if (chip === "Open the Business Map") {
      window.open("/business-map", "_blank", "noopener,noreferrer");
      return;
    }
    if (chip === "Yes, take my details") {
      setMessages((current) => [...current, { role: "user", text: chip }]);
      beginCapture();
      return;
    }
    void send(chip);
  };

  const placeholder =
    capture === "name"
      ? "Your name"
      : capture === "email"
        ? "you@example.com"
        : capture === "phone"
          ? "Your phone number"
          : "Ask a question…";

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close the assistant" : "Open the assistant"}
        aria-expanded={open}
        className={cn(
          "fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full",
          "bg-accent text-white shadow-lg shadow-accent/30 transition-transform duration-300",
          "hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        )}
      >
        {!open && (
          <span
            aria-hidden="true"
            className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulse-ring"
          />
        )}
        <span className="relative">
          {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label={`${COMPANY.name} assistant`}
          className={cn(
            "fixed bottom-24 right-5 z-[70] flex w-[min(23rem,calc(100vw-2.5rem))] flex-col",
            "overflow-hidden rounded-2xl border border-border/60 bg-background shadow-custom",
            "animate-zoom-in-soft",
          )}
          style={{ maxHeight: "min(34rem, calc(100vh - 8rem))" }}
        >
          <header className="flex items-center gap-3 border-b bg-primary px-4 py-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <MessageSquare className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">{COMPANY.name} assistant</p>
              <p className="flex items-center gap-1.5 text-[11px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Usually replies instantly
              </p>
            </div>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div key={index} className={cn("flex flex-col", message.role === "user" ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm animate-fade-up",
                    message.role === "user"
                      ? "rounded-br-sm bg-accent text-white"
                      : "rounded-bl-sm bg-muted text-foreground",
                  )}
                >
                  {message.text}
                </div>

                {message.chips?.length ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {message.chips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleChip(chip)}
                        className="rounded-full border border-accent/40 bg-accent/5 px-2.5 py-1 text-[11px] font-medium text-accent transition-colors duration-200 hover:bg-accent/15"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            {typing && (
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-3.5 py-3 w-fit">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce-subtle"
                    style={{ animationDelay: `${dot * 140}ms` }}
                  />
                ))}
              </div>
            )}

            {capture === "done" && (
              <p className="flex items-center gap-1.5 text-[11px] text-emerald-600">
                <Check className="h-3 w-3" /> Details passed to the team
              </p>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
            // The input switches to type="email"/"tel" while collecting
            // details. Without this, the browser's own validation silently
            // blocks submit and the assistant never gets to reply in its own
            // words about what is wrong.
            noValidate
            className="flex items-center gap-2 border-t p-3"
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={placeholder}
              type={capture === "email" ? "email" : capture === "phone" ? "tel" : "text"}
              aria-label={placeholder}
              disabled={capture === "sending"}
              className="min-w-0 flex-1 rounded-full border border-border bg-background px-3.5 py-2 text-sm outline-none transition-colors focus:border-accent disabled:opacity-60"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!draft.trim() || capture === "sending"}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform duration-200 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
