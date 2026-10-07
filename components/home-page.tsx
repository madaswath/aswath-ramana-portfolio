import type { ReactNode } from "react";
import Image from "next/image";
import {
  Bot,
  Clock3,
  Link2,
  Mail,
  Phone,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import {
  capabilities,
  certifications,
  education,
  experience,
  metrics,
  person,
  profile,
  projects,
  type Project,
} from "@/lib/content";
import { httpsHref, mailtoHref, telHref } from "@/lib/links";

const featured = projects.find((project) => project.placement === "featured");
const supporting = projects.filter((project) => project.placement === "supporting");
const further = projects.filter((project) => project.placement === "further");

const achievementIcons: Record<string, LucideIcon> = {
  "False-positive rate": ShieldCheck,
  "Daily review time": Clock3,
  "Production users": Users,
  "Developers led": Users,
  "Client teams led": Users,
  "Client handover": Bot,
};

const orbit = [
  { label: "RAG", className: "top-8 left-6 bg-[#f3e7cf] text-[#1b2d4f]" },
  { label: "Agents", className: "top-16 right-4 bg-white text-[#1b2d4f]" },
  { label: "Azure", className: "top-1/2 right-0 bg-[#e7eef8] text-[#1b2d4f]" },
  { label: "AWS", className: "bottom-16 left-2 bg-white text-[#1b2d4f]" },
  { label: "NLP", className: "bottom-8 right-10 bg-[#1b2d4f] text-white" },
];

export function HomePage() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#1b2d4f] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">
        <Hero />
        <ProofBand />
        <Work />
        <Experience />
        <Capabilities />
        <Achievements />
        <Credentials />
        <Contact />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            email: person.email,
            telephone: person.phone,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Chennai",
              addressCountry: "India",
            },
            sameAs: [person.linkedin, person.github],
            description: person.summary,
          }),
        }}
      />
    </>
  );
}

function Hero() {
  const email = mailtoHref(person.email);
  const phone = telHref(person.phone);
  const linkedin = httpsHref(person.linkedin);
  const github = httpsHref(person.github);

  return (
    <section id="top" className="mx-auto w-full max-w-[1120px] px-5 pt-12 pb-8 md:px-8 md:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#e4e9f1] bg-white px-3 py-1 text-xs font-semibold tracking-[0.14em] text-[#9a7840] uppercase">
            <span className="size-1.5 rounded-full bg-[#9a7840]" aria-hidden="true" />
            {person.role}
            <span className="text-[#c5ceda]" aria-hidden="true">
              ·
            </span>
            <span className="tracking-normal text-[#51627a] normal-case">{person.location}</span>
          </p>
          <h1 className="mt-5 font-serif text-[clamp(3.4rem,8vw,6.4rem)] leading-[0.9] tracking-tight text-[#1b2d4f]">
            Aswath
            <span className="block text-[#9a7840]">Ramana</span>
          </h1>
          <p className="mt-4 text-lg text-[#51627a]">
            Technical lead for production GenAI. RAG, agents, and client delivery on AWS and Azure.
          </p>
          <div className="relative mx-auto mt-6 aspect-square w-56 overflow-hidden rounded-[1.6rem] border-4 border-white shadow-lg lg:hidden">
            <Image
              src="/aswath-ramana.jpg"
              alt="Aswath Ramana, Senior GenAI Engineer, in a navy suit"
              fill
              sizes="224px"
              className="object-cover object-[center_18%]"
            />
          </div>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#31445f]">{person.summary}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              nativeButton={false}
              render={<a href="#work" />}
              className="h-12 rounded-full px-5 text-sm font-semibold"
            >
              View selected work
            </Button>
            <Button
              nativeButton={false}
              render={<a href="#contact" />}
              variant="outline"
              className="h-12 rounded-full border-[#d5dce6] bg-white px-5 text-sm font-semibold text-[#1b2d4f]"
            >
              Get in touch
            </Button>
            {github ? (
              <Button
                nativeButton={false}
                render={
                  <a href={github} target="_blank" rel="noopener noreferrer" />
                }
                variant="outline"
                className="h-12 rounded-full border-[#d5dce6] bg-white px-5 text-sm font-semibold text-[#1b2d4f]"
              >
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </Button>
            ) : null}
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {email ? (
              <li>
                <Chip href={email} icon={Mail} label={person.email} />
              </li>
            ) : null}
            {phone ? (
              <li>
                <Chip href={phone} icon={Phone} label={person.phone} />
              </li>
            ) : null}
            {linkedin ? (
              <li>
                <Chip href={linkedin} icon={Link2} label="LinkedIn" external />
              </li>
            ) : null}
          </ul>
        </div>
        <div className="relative mx-auto hidden w-full max-w-sm lg:block lg:h-[500px] lg:max-w-md">
          <div className="pointer-events-none absolute inset-6 hidden rounded-full border border-[#d7deea] lg:block" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-14 hidden rounded-full border border-dashed border-[#c9d3e2] lg:block" aria-hidden="true" />
          <div className="relative mx-auto aspect-square w-[86%] overflow-hidden rounded-[2rem] border-4 border-white shadow-xl lg:absolute lg:top-1/2 lg:left-1/2 lg:w-[68%] lg:-translate-x-1/2 lg:-translate-y-1/2">
            <Image
              src="/aswath-ramana.jpg"
              alt="Aswath Ramana, Senior GenAI Engineer, in a navy suit"
              fill
              priority
              sizes="(min-width: 1024px) 320px, 80vw"
              className="object-cover object-[center_18%]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            <FloatCard className="top-4 right-0" figure="55% → 10%" label="False positives" />
            <FloatCard className="bottom-20 left-0" figure="1,000+" label="Production users" />
            <FloatCard className="right-0 bottom-6" figure="~3 days → ~3 hrs" label="Daily review" />
          </div>
        </div>
      </div>
      <aside className="mt-10 rounded-3xl border border-[#e4e9f1] bg-white p-6 shadow-sm lg:hidden" aria-label="Profile">
        <ProfileFacts />
      </aside>
      <aside className="mt-8 hidden rounded-3xl border border-[#e4e9f1] bg-white p-6 shadow-sm lg:block" aria-label="Profile">
        <ProfileFacts />
      </aside>
    </section>
  );
}

function ProfileFacts() {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-[#9a7840] uppercase">Now</p>
        <p className="mt-2 font-semibold text-[#1b2d4f]">{profile.currentRole}</p>
        <p className="text-sm text-[#51627a]">
          {profile.currentCompany} · {person.location}
        </p>
      </div>
      <FactList title="Focus" items={profile.focus} />
      <FactList title="Industries" items={profile.industries} />
      <FactList title="Platforms" items={profile.platforms} />
    </div>
  );
}

function FactList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.16em] text-[#9a7840] uppercase">{title}</p>
      <ul className="mt-2 flex flex-wrap gap-1.5 text-sm leading-5 text-[#31445f]">
        {items.map((item) => (
          <li key={item} className="rounded-full bg-[#eef2f7] px-2.5 py-1">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FloatCard({ className, figure, label }: { className: string; figure: string; label: string }) {
  return (
    <div className={`absolute rounded-2xl border border-[#e4e9f1] bg-white px-4 py-3 shadow-lg ${className}`}>
      <p className="text-lg font-bold tracking-tight text-[#1b2d4f]">{figure}</p>
      <p className="text-xs text-[#51627a]">{label}</p>
    </div>
  );
}

function Chip({
  href,
  icon: Icon,
  label,
  external = false,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-[#e4e9f1] bg-white px-3 py-2 text-sm text-[#31445f] hover:border-[#1b2d4f]"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

function ProofBand() {
  return (
    <section aria-label="Headline outcomes" className="mx-auto w-full max-w-[1120px] px-5 py-8 md:px-8">
      <div className="grid gap-6 rounded-3xl bg-[#1b2d4f] px-6 py-8 text-white sm:grid-cols-3 md:px-10">
        {metrics.slice(0, 3).map((metric) => (
          <div key={metric.label}>
            <p className="font-serif text-3xl text-[#e7d3a1] md:text-4xl">{metric.figure}</p>
            <p className="mt-2 text-sm text-[#d5deea]">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Work() {
  if (!featured) return null;

  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-24 md:scroll-mt-20">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 md:px-8 md:py-20">
        <SectionIntro id="work-heading" kicker="Selected work" title="Systems" accent="shipped." />
        <div className="mt-10">
          <ProjectArticle project={featured} featured />
        </div>
        <div className="mt-5 space-y-5">
          {supporting.map((project) => (
            <ProjectArticle key={project.name} project={project} />
          ))}
        </div>
        <h3 className="mt-14 font-serif text-3xl text-[#1b2d4f]">
          Further <span className="text-[#9a7840]">engagements</span>
        </h3>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {further.map((project) => (
            <ProjectArticle key={project.name} project={project} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectArticle({
  project,
  featured = false,
  compact = false,
}: {
  project: Project;
  featured?: boolean;
  compact?: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-[#e4e9f1] bg-white shadow-sm">
      <div className={featured ? "grid lg:grid-cols-12" : undefined}>
        <div className={featured ? "border-b border-[#e4e9f1] p-6 md:p-8 lg:col-span-5 lg:border-r lg:border-b-0" : "border-b border-[#e4e9f1] p-6"}>
          <p className="text-xs font-semibold tracking-[0.16em] text-[#9a7840] uppercase">
            {featured ? "Featured" : "Project"} · {project.type}
          </p>
          <h3 className={`mt-3 font-serif tracking-tight text-[#1b2d4f] ${featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>
            {project.name}
          </h3>
          <p className="mt-2 text-[#51627a]">{project.context}</p>
        </div>
        <dl className={featured ? "lg:col-span-7" : undefined}>
          <Field label="Challenge" compact={compact}>
            {project.challenge}
          </Field>
          <Field label="Approach" compact={compact}>
            <ul className="list-disc space-y-2 pl-4">
              {project.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </Field>
          <Field label="Outcome" compact={compact}>
            {project.outcome}
          </Field>
          <Field label="Stack" compact={compact}>
            <ul className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <li key={tool} className="rounded-full bg-[#eef2f7] px-2.5 py-1 text-xs text-[#1b2d4f]">
                  {tool}
                </li>
              ))}
            </ul>
          </Field>
        </dl>
      </div>
    </article>
  );
}

function Field({ label, children, compact }: { label: string; children: ReactNode; compact?: boolean }) {
  return (
    <div className={`grid gap-1 border-t border-[#eef1f6] first:border-t-0 ${compact ? "px-6 py-4" : "px-6 py-5 md:px-8"}`}>
      <dt className="text-xs font-semibold tracking-[0.14em] text-[#9a7840] uppercase">{label}</dt>
      <dd className="text-sm leading-6 text-[#31445f]">{children}</dd>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-24 md:scroll-mt-20">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 md:px-8 md:py-20">
        <SectionIntro id="experience-heading" kicker="Career journey" title="Professional" accent="experience" />
        <div className="mt-10 space-y-4">
          {experience.map((role, index) => (
            <details
              key={`${role.company}-${role.dates}`}
              open={index === 0}
              className="group rounded-3xl border border-[#e4e9f1] bg-white shadow-sm"
            >
              <summary className="cursor-pointer list-none p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-[#9a7840] uppercase">{role.company}</p>
                    <h3 className="mt-2 font-serif text-2xl text-[#1b2d4f] md:text-3xl">{role.role}</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[#51627a]">
                      <span className="rounded-full bg-[#eef2f7] px-3 py-1 text-[#1b2d4f]">{role.dates}</span>
                      <span>{role.span}</span>
                      <span aria-hidden="true">·</span>
                      <span>{role.location}</span>
                      {role.current ? (
                        <span className="rounded-full bg-[#e7f6ee] px-3 py-1 text-[#146c43]">Current role</span>
                      ) : null}
                    </div>
                  </div>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#e4e9f1] text-lg text-[#1b2d4f] group-open:hidden">
                    +
                  </span>
                </div>
              </summary>
              <ul className="space-y-3 border-t border-[#eef1f6] px-6 py-5 text-sm leading-6 text-[#31445f]">
                {role.achievements.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#9a7840]" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-24 md:scroll-mt-20">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.8fr)] md:px-8 md:py-20">
        <div>
          <SectionIntro id="skills-heading" kicker="Expertise" title="Core" accent="capabilities" />
          <div className="mt-8 space-y-4">
            {capabilities.map((group) => (
              <article key={group.category} className="rounded-3xl border border-[#e4e9f1] bg-white p-5 shadow-sm">
                <h3 className="text-xs font-semibold tracking-[0.16em] text-[#51627a] uppercase">{group.category}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill} className="rounded-full bg-[#eef2f7] px-3 py-1.5 text-sm text-[#1b2d4f]">
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <div className="relative hidden min-h-[460px] lg:block" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 grid size-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#1b2d4f] text-center text-white">
            <span className="font-serif text-2xl">GenAI</span>
          </div>
          {orbit.map((node) => (
            <span
              key={node.label}
              className={`absolute grid size-20 place-items-center rounded-full text-center text-sm font-semibold shadow-md ${node.className}`}
            >
              {node.label}
            </span>
          ))}
          <p className="absolute right-0 bottom-0 left-0 text-center text-sm text-[#51627a]">
            Production systems: retrieval, agents, language, and cloud delivery.
          </p>
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" aria-labelledby="impact-heading" className="scroll-mt-24 md:scroll-mt-20">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 md:px-8 md:py-20">
        <SectionIntro id="impact-heading" kicker="Impact metrics" title="Key" accent="outcomes" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => {
            const Icon = achievementIcons[metric.label] ?? Bot;
            return (
              <li key={metric.label} className="rounded-3xl border border-[#e4e9f1] bg-white p-6 shadow-sm">
                <span className="grid size-10 place-items-center rounded-xl bg-[#1b2d4f] text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-5 font-serif text-3xl tracking-tight text-[#1b2d4f]">{metric.figure}</p>
                <p className="mt-2 font-semibold text-[#1b2d4f]">{metric.label}</p>
                <p className="mt-2 text-sm leading-6 text-[#51627a]">{metric.detail}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-heading" className="scroll-mt-24 md:scroll-mt-20">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 md:px-8 md:py-20">
        <SectionIntro id="credentials-heading" kicker="Credentials" title="Certifications" />
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {certifications.map((item) => (
            <li key={item} className="rounded-3xl border border-[#e4e9f1] bg-white p-5 shadow-sm">
              <span className="grid size-10 place-items-center rounded-xl bg-[#1b2d4f] font-serif text-sm text-[#e7d3a1]">
                AI
              </span>
              <p className="mt-4 font-semibold text-[#1b2d4f]">{item}</p>
            </li>
          ))}
        </ul>
        <div className="mt-16">
          <SectionIntro id="education-heading" kicker="Academic background" title="Education" />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {education.map((item) => (
              <li key={item.school} className="rounded-3xl border border-[#e4e9f1] bg-white p-6 shadow-sm">
                <p className="font-serif text-2xl text-[#1b2d4f]">{item.credential}</p>
                <p className="mt-2 text-[#9a7840]">{item.school}</p>
                <p className="mt-1 text-sm text-[#51627a]">{item.dates}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const email = mailtoHref(person.email);
  const phone = telHref(person.phone);
  const linkedin = httpsHref(person.linkedin);
  const github = httpsHref(person.github);

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 md:scroll-mt-20">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 md:px-8 md:py-20">
        <div className="rounded-[2rem] bg-[#1b2d4f] px-6 py-10 text-white md:px-12 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h2 id="contact-heading" className="font-serif text-4xl md:text-5xl">
                Let&apos;s <span className="text-[#e7d3a1]">talk.</span>
              </h2>
              <p className="mt-4 max-w-xl text-[#d5deea]">
                For a lead AI engineering role, a hands-on AI engineer seat, or deployment into a client environment. Email, call, or open the profiles below.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {email ? (
                  <li>
                    <a href={email} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm">
                      <Mail className="size-4" aria-hidden="true" />
                      {person.email}
                    </a>
                  </li>
                ) : null}
                {phone ? (
                  <li>
                    <a href={phone} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm">
                      <Phone className="size-4" aria-hidden="true" />
                      {person.phone}
                    </a>
                  </li>
                ) : null}
                {linkedin ? (
                  <li>
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm"
                    >
                      <Link2 className="size-4" aria-hidden="true" />
                      LinkedIn
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ) : null}
                {github ? (
                  <li>
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm"
                    >
                      <Link2 className="size-4" aria-hidden="true" />
                      GitHub
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              {email ? (
                <Button
                  nativeButton={false}
                  render={<a href={email} />}
                  className="h-12 rounded-full bg-white px-6 text-[#1b2d4f] hover:bg-[#f3efe6]"
                >
                  Email me
                </Button>
              ) : null}
              {linkedin ? (
                <Button
                  nativeButton={false}
                  render={<a href={linkedin} target="_blank" rel="noopener noreferrer" />}
                  variant="outline"
                  className="h-12 rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10"
                >
                  View LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-[#e4e9f1]">
      <p className="mx-auto w-full max-w-[1120px] px-5 py-8 text-center text-sm text-[#51627a] md:px-8">
        {person.name} · {person.role} · {person.location}
      </p>
    </footer>
  );
}

function SectionIntro({
  id,
  kicker,
  title,
  accent,
}: {
  id: string;
  kicker: string;
  title: string;
  accent?: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-[#9a7840] uppercase">
        <span className="h-px w-8 bg-[#9a7840]" aria-hidden="true" />
        {kicker}
      </p>
      <h2 id={id} className="mt-3 font-serif text-4xl tracking-tight text-[#1b2d4f] md:text-5xl">
        {title}
        {accent ? <span className="text-[#9a7840]"> {accent}</span> : null}
      </h2>
    </div>
  );
}
