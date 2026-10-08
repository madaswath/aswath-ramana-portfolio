import {
  capabilities,
  certifications,
  education,
  experience,
  metrics,
  person,
  projects,
} from "../lib/content.ts";

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

const SYSTEM = `You answer visitors who want to know more about Aswath Ramana. Use only the profile below. Do not invent employers, dates, metrics, tools, degrees, or projects. If the profile does not contain the answer, say that it is not in the published profile and suggest the Get in touch section. Speak in the third person about Aswath. Keep the reply under 120 words, in plain sentences, without markdown headings or bullet symbols.

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

  return { status: 200, body: { reply: localAnswer(latest.content), source: "profile" } };
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
        max_tokens: 500,
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
          max_tokens: 500,
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
  const reply = content.trim();
  return reply || null;
}

function localAnswer(question: string) {
  const q = question.toLowerCase();

  if (/(email|e-mail|phone|mobile|call|linkedin|github|contact|reach)/.test(q)) {
    return `${person.name} is based in ${person.location}. Email ${person.email}, call ${person.phone}, or use LinkedIn (${person.linkedin}) and GitHub (${person.github}). A PDF resume is available from Get in touch.`;
  }

  if (/(certif|azure ai engineer|az-900|copilot certification)/.test(q)) {
    return `${person.name}'s certifications are ${certifications.join("; ")}.`;
  }

  if (/(education|degree|college|university|pgpm|b\.tech|sastra|great lakes)/.test(q)) {
    return `${person.name} completed ${education
      .map((item) => `${item.credential} at ${item.school} (${item.dates})`)
      .join(", and ")}.`;
  }

  const skillHit = capabilities
    .flatMap((group) => group.skills)
    .find((skill) => q.includes(skill.toLowerCase()));
  if (/(skill|competenc|tools|stack|technolog)/.test(q) || skillHit) {
    if (skillHit) {
      const group = capabilities.find((item) => item.skills.includes(skillHit));
      return `Yes. ${skillHit} is part of ${person.name}'s ${group?.category ?? "technical skills"}. Related tools in that group include ${group?.skills.join(", ")}.`;
    }
    return `${person.name}'s technical skills cover ${capabilities.map((group) => group.category.toLowerCase()).join("; ")}. Delivery is mainly in Python, LangGraph, LangChain, AWS, and Azure.`;
  }

  if (/\bprojects?\b|\bdeliverables?\b|\bshipped\b|\bbuilt\b/.test(q)) {
    const ranked = rank(
      q,
      projects.map((item) => ({
        scoreText: `${item.name} ${item.type} ${item.context} ${item.tools.join(" ")}`,
        reply: `${item.name} (${item.context}) is a ${item.type.toLowerCase()} project. ${item.challenge} ${item.outcome} Tools included ${item.tools.join(", ")}.`,
      })),
    );
    const specific = ranked[0] && ranked[0].score >= 2 && ranked[0].score > (ranked[1]?.score ?? 0);
    if (specific) return ranked[0].reply;
    return `${person.name}'s key projects are ${projects
      .map((item) => `${item.name} (${item.context}): ${item.outcome}`)
      .join(" ")}`;
  }

  if (/\b(experience|roles?|jobs?|worked|career|companies)\b/.test(q)) {
    const ranked = rank(
      q,
      experience.map((item) => ({
        scoreText: `${item.company} ${item.role} ${item.location}`,
        reply: `${person.name} was ${item.role} at ${item.company} in ${item.location} (${item.dates}). ${item.achievements[0]}`,
      })),
    );
    const specific = ranked[0] && ranked[0].score >= 2 && ranked[0].score > (ranked[1]?.score ?? 0);
    if (specific) return ranked[0].reply;
    return experience
      .map((item) => `${item.role} at ${item.company}, ${item.location} (${item.dates}).`)
      .join(" ");
  }

  if (/(highlight|metric|impact|false|employee|fastener)/.test(q)) {
    return metrics.map((metric) => `${metric.figure} ${metric.label.toLowerCase()}: ${metric.detail}`).join(" ");
  }

  return `${person.name} is a ${person.role} in ${person.location}, with 7 years delivering AI, ML, and enterprise automation for banking, insurance, and financial services. Recent work includes an enterprise finance chatbot, an insurance BI assistant, a mock-call training simulator, invoice and inventory intelligence, employee wellness analytics, and an AML sanctions screening engine. Ask about a project, a role, or a skill for the details published on this page.`;
}

function rank(question: string, items: { scoreText: string; reply: string }[]) {
  const tokens = question.split(/[^a-z0-9+#]+/).filter((token) => token.length > 2);
  return items
    .map((item) => {
      const haystack = item.scoreText.toLowerCase();
      const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0);
      return { score, reply: item.reply };
    })
    .sort((a, b) => b.score - a.score);
}
