import { capabilities, certifications, education, experience, metrics, person, projects } from "./content.ts";

export function answerFromProfile(question: string) {
  const { glimpse, heading, bullets } = compose(question);
  return [glimpse, "", `**${heading}**`, ...bullets.map((item) => `- ${item}`)].join("\n");
}

function compose(question: string): { glimpse: string; heading: string; bullets: string[] } {
  const q = question.toLowerCase();

  if (/(email|e-mail|phone|mobile|call|linkedin|github|contact|reach)/.test(q)) {
    return {
      glimpse: `**${person.name}** is a **${person.role}** in ${person.location}, easy to reach for a role or a client deployment.`,
      heading: "Contact",
      bullets: [
        `**Email** — ${person.email}`,
        `**Phone** — ${person.phone}`,
        `**LinkedIn** — ${person.linkedin}`,
        `**GitHub** — ${person.github}`,
        "**Resume** — PDF download in Get in touch.",
      ],
    };
  }

  if (/(certif|azure ai engineer|az-900|copilot certification)/.test(q)) {
    return {
      glimpse: `**${person.name}** backs delivery on Azure with published certifications, including **Azure AI Engineer Associate**.`,
      heading: "Certifications",
      bullets: certifications.map((item) => `**${item.split("—")[0].trim()}** — ${item.split("—")[1]?.trim() ?? item}`),
    };
  }

  if (/(education|degree|college|university|pgpm|b\.tech|sastra|great lakes)/.test(q)) {
    return {
      glimpse: `**${person.name}** pairs a **data science PGPM** with a biotechnology degree, then seven years of production AI work.`,
      heading: "Education",
      bullets: education.map((item) => `**${item.credential}** — ${item.school} (${item.dates})`),
    };
  }

  const skillHit = capabilities.flatMap((group) => group.skills).find((skill) => q.includes(skill.toLowerCase()));
  if (/(skill|competenc|tools|stack|technolog)/.test(q) || skillHit) {
    if (skillHit) {
      const group = capabilities.find((item) => (item.skills as readonly string[]).includes(skillHit));
      return {
        glimpse: `**${skillHit}** is part of how **${person.name}** delivers ${group?.category.toLowerCase() ?? "technical work"} for enterprise clients.`,
        heading: group?.category ?? "Skills",
        bullets: (group ? [...group.skills] : [skillHit]).map((skill) => `**${skill}**`),
      };
    }
    return {
      glimpse: `**${person.name}** ships agentic AI and RAG on **Python, LangGraph, LangChain, AWS, and Azure**, from design through client handover.`,
      heading: "Technical skills",
      bullets: capabilities.map((group) => `**${group.category}** — ${group.skills.join(", ")}`),
    };
  }

  if (/\bprojects?\b|\bdeliverables?\b|\bshipped\b|\bbuilt\b/.test(q)) {
    const ranked = rank(
      q,
      projects.map((item) => ({
        scoreText: `${item.name} ${item.type} ${item.context} ${item.tools.join(" ")}`,
        bullet: `**${item.name}** — ${item.outcome} (${item.context})`,
      })),
    );
    const specific = ranked[0] && ranked[0].score >= 2 && ranked[0].score > (ranked[1]?.score ?? 0);
    if (specific) {
      const project = projects.find((item) => ranked[0].bullet.includes(item.name));
      return {
        glimpse: project
          ? `**${project.name}** shows **${person.name}** taking a ${project.type.toLowerCase()} problem at ${project.context} through to a production outcome.`
          : `**${person.name}** has a published project that matches this question.`,
        heading: "Project",
        bullets: project
          ? [
              `**Context** — ${project.challenge}`,
              `**Outcome** — ${project.outcome}`,
              `**Tools** — ${project.tools.join(", ")}`,
            ]
          : [ranked[0].bullet],
      };
    }
    return {
      glimpse: `**${person.name}** has shipped production AI for **banking, insurance, and enterprise operations**, with measurable results on screening, training, and finance workflows.`,
      heading: "Key projects",
      bullets: projects.map((item) => `**${item.name}** — ${item.outcome}`),
    };
  }

  if (/\b(experience|roles?|jobs?|worked|career|companies)\b/.test(q)) {
    const ranked = rank(
      q,
      experience.map((item) => ({
        scoreText: `${item.company} ${item.role} ${item.location}`,
        bullet: `**${item.role}, ${item.company}** — ${item.achievements[0]}`,
      })),
    );
    const specific = ranked[0] && ranked[0].score >= 2 && ranked[0].score > (ranked[1]?.score ?? 0);
    if (specific) {
      const role = experience.find((item) => ranked[0].bullet.includes(item.role));
      return {
        glimpse: role
          ? `**${role.role} at ${role.company}** is where **${person.name}** ${role.current ? "is now delivering" : "delivered"} enterprise AI, ${role.dates}.`
          : `**${person.name}** has a published role that matches this question.`,
        heading: "Experience",
        bullets: role ? role.achievements.map((line) => `**${role.company}** — ${line}`) : [ranked[0].bullet],
      };
    }
    return {
      glimpse: `**${person.name}** is a **${person.role}** who has moved from retail banking into senior AI delivery at **EY** and **Qentelli**.`,
      heading: "Experience",
      bullets: experience.map(
        (item) => `**${item.role}, ${item.company}** — ${item.location}, ${item.dates}. ${item.achievements[0]}`,
      ),
    };
  }

  if (/(highlight|metric|impact|false|employee|fastener)/.test(q)) {
    return {
      glimpse: `**${person.name}** can point to published results, including a **false-positive cut from 55% to 10%** and training evaluations for **1,000+ employees**.`,
      heading: "Career highlights",
      bullets: metrics.map((metric) => `**${metric.figure}** — ${metric.label}. ${metric.detail}`),
    };
  }

  return {
    glimpse: `**${person.name}** is a **${person.role}** in ${person.location}, with 7 years delivering production AI for banking, insurance, and financial services.`,
    heading: "Where to look next",
    bullets: projects.map((item) => `**${item.name}**`),
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
