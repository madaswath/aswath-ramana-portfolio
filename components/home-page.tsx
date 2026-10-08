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
import { SectionStage } from "@/components/section-stage";
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
  "Employees evaluated": Users,
  "Developers led": Users,
  "BI response time": Clock3,
  "Fastener products": Bot,
};

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
        <SectionStage>
          <Hero />
          <Work />
          <Experience />
          <Capabilities />
          <Achievements />
          <Credentials />
          <Contact />
        </SectionStage>
      </main>
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
            AI, ML, and enterprise automation for banking and insurance.
          </p>
          <div className="relative mx-auto mt-6 aspect-square w-56 overflow-hidden rounded-[1.6rem] border-4 border-white shadow-lg lg:hidden">
            <Image
              src="/aswath-ramana.jpg"
              alt="Aswath Ramana, Senior Generative AI Engineer, in a navy suit"
              fill
              sizes="224px"
              className="object-cover object-[center_18%]"
            />
          </div>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#31445f]">{person.summary}</p>
        </div>
        <div className="relative mx-auto hidden w-full max-w-sm lg:block lg:h-[500px] lg:max-w-md">
          <div className="pointer-events-none absolute inset-6 hidden rounded-full border border-[#d7deea] lg:block" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-14 hidden rounded-full border border-dashed border-[#c9d3e2] lg:block" aria-hidden="true" />
          <div className="relative mx-auto aspect-square w-[86%] overflow-hidden rounded-[2rem] border-4 border-white shadow-xl lg:absolute lg:top-1/2 lg:left-1/2 lg:w-[68%] lg:-translate-x-1/2 lg:-translate-y-1/2">
            <Image
              src="/aswath-ramana.jpg"
              alt="Aswath Ramana, Senior Generative AI Engineer, in a navy suit"
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
      <div className="mt-8">
        <ProofBand />
      </div>
      <details className="mt-6 rounded-3xl border border-[#e4e9f1] bg-white p-6 shadow-sm">
        <summary className="cursor-pointer list-none font-semibold text-[#1b2d4f]">
          Focus, industries, and platforms
        </summary>
        <div className="pt-6">
          <ProfileFacts />
        </div>
      </details>
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

function ProofBand() {
  return (
    <div aria-label="Headline outcomes" className="grid gap-6 rounded-3xl bg-[#1b2d4f] px-6 py-8 text-white sm:grid-cols-3 md:px-10">
        {metrics.slice(0, 3).map((metric) => (
          <div key={metric.label}>
            <p className="font-serif text-3xl text-[#e7d3a1] md:text-4xl">{metric.figure}</p>
            <p className="mt-2 text-sm text-[#d5deea]">{metric.label}</p>
          </div>
        ))}
    </div>
  );
}

function Work() {
  if (!featured) return null;

  return (
    <section id="work" aria-labelledby="work-heading">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 md:px-8 md:py-12">
        <SectionIntro id="work-heading" title="Selected projects" />
        <p className="mt-3 max-w-xl text-sm text-[#51627a]">
          Open a project for the business context, contributions, and tools.
        </p>
        <div className="mt-6 space-y-3">
          <ProjectArticle project={featured} featured />
          {supporting.map((project) => (
            <ProjectArticle key={project.name} project={project} />
          ))}
          {further.map((project) => (
            <ProjectArticle key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectArticle({ project, featured = false }: { project: Project; featured?: boolean }) {
  const kind = project.type;

  return (
    <article className="overflow-hidden rounded-3xl border border-[#e4e9f1] bg-white shadow-sm">
      <details className="group" {...(featured ? { open: true } : {})}>
        <summary className="cursor-pointer list-none p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-[#9a7840] uppercase">{kind}</p>
              <h3 className="mt-2 font-serif text-2xl tracking-tight text-[#1b2d4f]">{project.name}</h3>
              <p className="mt-1 text-sm text-[#51627a]">{project.context}</p>
              <p className="mt-2 text-sm leading-6 text-[#31445f] group-open:hidden">{project.outcome}</p>
            </div>
            <DisclosureMark />
          </div>
        </summary>
        <dl className="border-t border-[#eef1f6]">
          <Field label="Business context">{project.challenge}</Field>
          <Field label="Contributions">
            <ul className="list-disc space-y-2 pl-4">
              {project.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </Field>
          <Field label="Outcome">{project.outcome}</Field>
          <Field label="Tools">
            <ul className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <li key={tool} className="rounded-full bg-[#eef2f7] px-2.5 py-1 text-xs text-[#1b2d4f]">
                  {tool}
                </li>
              ))}
            </ul>
          </Field>
        </dl>
      </details>
    </article>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-[#eef1f6] px-5 py-4 first:border-t-0 md:px-6">
      <dt className="text-xs font-semibold tracking-[0.14em] text-[#9a7840] uppercase">{label}</dt>
      <dd className="text-sm leading-6 text-[#31445f]">{children}</dd>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 md:px-8 md:py-12">
        <SectionIntro id="experience-heading" title="Experience" />
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
                  <DisclosureMark />
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
    <section id="skills" aria-labelledby="skills-heading">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 md:px-8 md:py-12">
        <SectionIntro id="skills-heading" title="Technical skills" />
        <p className="mt-3 text-sm text-[#51627a]">Open a group to see the tools in it.</p>
        <div className="mt-6 space-y-3">
          {capabilities.map((group) => (
            <details key={group.category} className="group rounded-3xl border border-[#e4e9f1] bg-white shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
                <span>
                  <span className="block font-serif text-2xl text-[#1b2d4f]">{group.category}</span>
                  <span className="mt-1 block text-sm text-[#51627a]">{group.skills.length} skills</span>
                </span>
                <DisclosureMark />
              </summary>
              <ul className="flex flex-wrap gap-2 border-t border-[#eef1f6] px-5 py-4">
                {group.skills.map((skill) => (
                  <li key={skill} className="rounded-full bg-[#eef2f7] px-3 py-1.5 text-sm text-[#1b2d4f]">
                    {skill}
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

function Achievements() {
  return (
    <section id="achievements" aria-labelledby="impact-heading" className="scroll-mt-24 md:scroll-mt-20">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 md:px-8 md:py-20">
        <SectionIntro id="impact-heading" title="Career highlights" />
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
        <SectionIntro id="credentials-heading" title="Certifications" />
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
          <SectionIntro id="education-heading" title="Education" />
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
                Get in touch
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
              <Button
                nativeButton={false}
                render={<a href="#work" />}
                className="h-12 rounded-full bg-white px-6 text-[#1b2d4f] hover:bg-[#f3efe6]"
              >
                View projects
              </Button>
              {email ? (
                <Button
                  nativeButton={false}
                  render={<a href={email} />}
                  variant="outline"
                  className="h-12 rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10"
                >
                  Email me
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
    </section>
  );
}

function DisclosureMark() {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#e4e9f1] text-lg leading-none text-[#1b2d4f]">
      <span className="group-open:hidden" aria-hidden="true">
        +
      </span>
      <span className="hidden group-open:block" aria-hidden="true">
        –
      </span>
    </span>
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

function SectionIntro({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} className="font-serif text-4xl tracking-tight text-[#1b2d4f] md:text-5xl">
      {title}
    </h2>
  );
}
