import { capabilities, certifications, education, experience, metrics, person, projects } from "./content.ts";

export function answerFromProfile(question: string) {
  const { intro, bullets } = compose(question);
  const lines = [intro];
  if (bullets.length) {
    lines.push("", ...bullets.map((item) => `- ${item}`));
  }
  return lines.join("\n");
}

function compose(question: string): { intro: string; bullets: string[] } {
  const q = question.toLowerCase();

  if (/(email|e-mail|phone|mobile|call|linkedin|github|contact|reach)/.test(q)) {
    return {
      intro: `${person.name} is based in ${person.location}. These are the published contact details.`,
      bullets: [
        `Email: ${person.email}`,
        `Phone: ${person.phone}`,
        `LinkedIn: ${person.linkedin}`,
        `GitHub: ${person.github}`,
        "A PDF resume is available from Get in touch.",
      ],
    };
  }

  if (/(certif|azure ai engineer|az-900|copilot certification)/.test(q)) {
    return {
      intro: `${person.name} holds these certifications.`,
      bullets: [...certifications],
    };
  }

  if (/(education|degree|college|university|pgpm|b\.tech|sastra|great lakes)/.test(q)) {
    return {
      intro: `${person.name}'s education is listed below.`,
      bullets: education.map((item) => `${item.credential}, ${item.school} (${item.dates})`),
    };
  }

  const skillHit = capabilities.flatMap((group) => group.skills).find((skill) => q.includes(skill.toLowerCase()));
  if (/(skill|competenc|tools|stack|technolog)/.test(q) || skillHit) {
    if (skillHit) {
      const group = capabilities.find((item) => (item.skills as readonly string[]).includes(skillHit));
      return {
        intro: `${skillHit} is part of ${person.name}'s ${group?.category ?? "technical skills"}.`,
        bullets: group ? [...group.skills] : [skillHit],
      };
    }
    return {
      intro: `${person.name} delivers with Python, LangGraph, LangChain, AWS, and Azure. The skill groups are below.`,
      bullets: capabilities.map((group) => `${group.category}: ${group.skills.join(", ")}`),
    };
  }

  if (/\bprojects?\b|\bdeliverables?\b|\bshipped\b|\bbuilt\b/.test(q)) {
    const ranked = rank(
      q,
      projects.map((item) => ({
        scoreText: `${item.name} ${item.type} ${item.context} ${item.tools.join(" ")}`,
        bullet: `${item.name} (${item.context}). ${item.outcome}`,
      })),
    );
    const specific = ranked[0] && ranked[0].score >= 2 && ranked[0].score > (ranked[1]?.score ?? 0);
    if (specific) {
      const project = projects.find((item) => ranked[0].bullet.startsWith(item.name));
      return {
        intro: project
          ? `${project.name} is a ${project.type.toLowerCase()} project for ${project.context}.`
          : `${person.name} worked on this project.`,
        bullets: project
          ? [project.challenge, project.outcome, `Tools: ${project.tools.join(", ")}`]
          : [ranked[0].bullet],
      };
    }
    return {
      intro: `${person.name}'s key projects and outcomes are below.`,
      bullets: projects.map((item) => `${item.name} (${item.context}). ${item.outcome}`),
    };
  }

  if (/\b(experience|roles?|jobs?|worked|career|companies)\b/.test(q)) {
    const ranked = rank(
      q,
      experience.map((item) => ({
        scoreText: `${item.company} ${item.role} ${item.location}`,
        bullet: `${item.role} at ${item.company}, ${item.location} (${item.dates}). ${item.achievements[0]}`,
      })),
    );
    const specific = ranked[0] && ranked[0].score >= 2 && ranked[0].score > (ranked[1]?.score ?? 0);
    if (specific) {
      const role = experience.find((item) => ranked[0].bullet.startsWith(item.role));
      return {
        intro: role
          ? `${person.name} was ${role.role} at ${role.company} in ${role.location} (${role.dates}).`
          : `${person.name}'s role is below.`,
        bullets: role ? [...role.achievements] : [ranked[0].bullet],
      };
    }
    return {
      intro: `${person.name}'s roles, from the most recent, are below.`,
      bullets: experience.map((item) => `${item.role}, ${item.company}, ${item.location} (${item.dates})`),
    };
  }

  if (/(highlight|metric|impact|false|employee|fastener)/.test(q)) {
    return {
      intro: "These figures are the published career highlights.",
      bullets: metrics.map((metric) => `${metric.figure} — ${metric.label}. ${metric.detail}`),
    };
  }

  return {
    intro: `${person.name} is a ${person.role} in ${person.location}, with 7 years in AI, ML, and enterprise automation for banking, insurance, and financial services.`,
    bullets: [
      ...projects.map((item) => item.name),
      "Ask about a project, a role, or a skill for the detail published on this page.",
    ],
  };
}

function rank(question: string, items: { scoreText: string; bullet: string }[]) {
  const tokens = question.split(/[^a-z0-9+#]+/).filter((token) => token.length > 2);
  return items
    .map((item) => {
      const haystack = item.scoreText.toLowerCase();
      const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0);
      return { score, bullet: item.bullet };
    })
    .sort((a, b) => b.score - a.score);
}
