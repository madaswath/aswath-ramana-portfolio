import {
  capabilities,
  certifications,
  education,
  experience,
  metrics,
  person,
  projects,
} from "../lib/content.ts";
import { answerFromProfile } from "../lib/profile-answers.ts";

const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
const MAX_MESSAGES = 8;
const MAX_CHARS = 500;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;

const hits = new Map<string, number[]>();

export function profileBrief(): string {
  const lines = [
    `${person.name}, ${person.role}, ${person.location}.`,
    `Email: ${person.email}. Phone: ${person.phone}. LinkedIn: ${person.linkedin}. GitHub: ${person.github}.`,
    `Summary: ${person.summary}`,
    "",
    "Career highlights:",
    ...metrics.map((metric) => `- ${metric.figure} — ${metric.label}. ${metric.detail}`),
    "",
    "Experience:",
    ...experience.map(
      (role) =>
        `- ${role.role} at ${role.company}, ${role.location}, ${role.dates}${role.current ? " (current)" : ""}. ${role.achievements.join(" ")}`,
    ),
    "",
    "Key projects:",
    ...projects.map(
      (project) =>
        `- ${project.name} (${project.type}; ${project.context}). Context: ${project.challenge} Contributions: ${project.approach.join(" ")} Outcome: ${project.outcome} Tools: ${project.tools.join(", ")}.`,
    ),
    "",
    "Technical skills:",
    ...capabilities.map((group) => `- ${group.category}: ${group.skills.join(", ")}.`),
    "",
    "Certifications:",
    ...certifications.map((item) => `- ${item}`),
    "",
    "Education:",
    ...education.map((item) => `- ${item.credential}, ${item.school}, ${item.dates}.`),
  ];
  return lines.join("\n");
}

const SYSTEM = `You format answers for visitors asking about Aswath Ramana. Use only the profile below. Do not invent employers, dates, metrics, tools, degrees, or projects. If the profile does not contain the answer, say so in one sentence and suggest Get in touch.

Write the reply in this shape only:
- Line 1: one sentence that answers the question, in the third person.
- A blank line.
- Then one fact per line, each line starting with "- ".
No headings, no bold, no numbered lists, and no code fences. Stay under 180 words.

Profile:
${profileBrief()}`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function answerQuestion(input: unknown, ip = "local") {
  if (!allow(ip)) {
    return { status: 429, body: { error: "Too many questions. Please try again in a minute." } };
  }

  const messages = sanitize(input);
  if (!messages) {
    return { status: 400, body: { error: "Send a short question about the profile." } };
  }

  const latest = [...messages].reverse().find((message) => message.role === "user");
  if (!latest) {
    return { status: 400, body: { error: "Send a short question about the profile." } };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (apiKey) {
    const groqReply = await askGroq(apiKey, messages);
    if (groqReply) {
      return { status: 200, body: { reply: groqReply, source: "groq", model: MODEL } };
    }
  }

  return { status: 200, body: { reply: answerFromProfile(latest.content), source: "profile" } };
}

function allow(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

function sanitize(input: unknown): ChatMessage[] | null {
  if (!input || typeof input !== "object" || !("messages" in input)) return null;
  const raw = (input as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages: ChatMessage[] = [];
  for (const item of raw.slice(-MAX_MESSAGES)) {
    if (!item || typeof item !== "object") return null;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const trimmed = content.trim().slice(0, MAX_CHARS);
    if (!trimmed) return null;
    messages.push({ role, content: trimmed });
  }
  return messages;
}

async function askGroq(apiKey: string, messages: ChatMessage[]) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        max_tokens: 700,
        reasoning_effort: "low",
        messages: [{ role: "system", content: SYSTEM }, ...messages],
      }),
    });

    if (!response.ok) {
      const retry = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          temperature: 0.2,
          max_tokens: 700,
          messages: [{ role: "system", content: SYSTEM }, ...messages],
        }),
      });
      if (!retry.ok) return null;
      return readReply(await retry.json());
    }

    return readReply(await response.json());
  } catch {
    return null;
  }
}

function readReply(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || !choices[0] || typeof choices[0] !== "object") return null;
  const message = (choices[0] as { message?: { content?: unknown } }).message;
  const content = message?.content;
  if (typeof content !== "string") return null;
  const reply = content
    .trim()
    .replace(/^```[a-z]*\n?/i, "")
    .replace(/\n?```$/, "")
    .trim();
  return reply || null;
}

