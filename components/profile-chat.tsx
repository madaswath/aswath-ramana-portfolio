"use client";

import { FormEvent, useId, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { answerFromProfile } from "@/lib/profile-answers";

type ChatMessage = { role: "user" | "assistant"; content: string };

const starters = [
  "What projects has he shipped?",
  "Where has he worked?",
  "What are his main skills?",
];

const endpoint = "/api/chat";

function FormattedReply({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <div className="space-y-2">
      {blocks.map((block, index) => {
        const lines = block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
        const bullets = lines.filter((line) => line.startsWith("- ")).map((line) => line.slice(2));
        const prose = lines.filter((line) => !line.startsWith("- "));
        return (
          <div key={`${index}-${block.slice(0, 24)}`} className="space-y-1.5">
            {prose.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {bullets.length ? (
              <ul className="list-disc space-y-1 pl-4">
                {bullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function ProfileChat() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Ask about Aswath Ramana’s experience, projects, or technical skills. Answers stay within the published profile.",
    },
  ]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;

    const history = [...messages, { role: "user" as const, content: question }];
    setMessages(history);
    setDraft("");
    setError("");
    setPending(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.slice(1).slice(-8),
        }),
      });
      const payload = (await response.json()) as { reply?: string; error?: string };
      if (response.status === 429) {
        throw new Error(payload.error || "Too many questions. Please try again in a minute.");
      }
      if (!response.ok || !payload.reply) {
        throw new Error("fallback");
      }
      setMessages((current) => [...current, { role: "assistant", content: payload.reply! }]);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "";
      if (message.startsWith("Too many")) {
        setError(message);
      } else {
        setMessages((current) => [...current, { role: "assistant", content: answerFromProfile(question) }]);
      }
    } finally {
      setPending(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void send(draft);
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <section
          role="dialog"
          aria-labelledby={titleId}
          className="flex h-[min(32rem,calc(100svh-6.5rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-[#e4e9f1] bg-white shadow-2xl"
        >
          <header className="flex items-start justify-between gap-3 bg-[#1b2d4f] px-4 py-3 text-white">
            <div>
              <h2 id={titleId} className="font-serif text-xl">
                Ask about Aswath
              </h2>
              <p className="text-xs text-[#d5deea]">Profile, projects, and skills</p>
            </div>
            <button
              type="button"
              className="grid size-8 place-items-center rounded-full text-white hover:bg-white/10"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X className="size-4" />
            </button>
          </header>
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "user"
                    ? "ml-8 rounded-2xl bg-[#1b2d4f] px-3 py-2 text-sm leading-6 text-white"
                    : "mr-2 rounded-2xl bg-[#eef2f7] px-3 py-2 text-sm leading-6 text-[#1b2d4f]"
                }
              >
                {message.role === "assistant" ? <FormattedReply text={message.content} /> : message.content}
              </div>
            ))}
            {pending ? <p className="text-sm text-[#51627a]">Looking through the profile…</p> : null}
            {error ? <p className="text-sm text-[#8a3b2d]">{error}</p> : null}
          </div>
          <div className="border-t border-[#eef1f6] px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {starters.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  className="rounded-full bg-[#eef2f7] px-3 py-1 text-left text-xs text-[#1b2d4f] hover:bg-[#e4e9f1]"
                  onClick={() => void send(starter)}
                  disabled={pending}
                >
                  {starter}
                </button>
              ))}
            </div>
            <form className="flex items-center gap-2" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="profile-question">
                Question about Aswath Ramana
              </label>
              <input
                id="profile-question"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={500}
                placeholder="Ask about a project or skill"
                className="h-11 min-w-0 flex-1 rounded-full border border-[#e4e9f1] px-4 text-sm text-[#1b2d4f] outline-none focus:border-[#1b2d4f]"
              />
              <button
                type="submit"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-[#1b2d4f] text-white disabled:opacity-50"
                disabled={pending || !draft.trim()}
                aria-label="Send question"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </section>
      ) : null}
      <button
        type="button"
        className="grid size-14 place-items-center rounded-full bg-[#1b2d4f] text-white shadow-xl hover:bg-[#243a64]"
        aria-expanded={open}
        aria-label={open ? "Close profile chat" : "Open profile chat"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}
