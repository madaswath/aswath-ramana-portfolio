import { capabilities, certifications, education, experience, metrics, person, projects } from "./content.ts";

export function answerFromProfile(question: string) {
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
      const group = capabilities.find((item) => (item.skills as readonly string[]).includes(skillHit));
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
