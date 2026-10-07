import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  capabilities,
  certifications,
  education,
  experience,
  metrics,
  nav,
  person,
  profile,
  projects,
  type Project,
} from "@/lib/content";
import { httpsHref, mailtoHref, telHref } from "@/lib/links";

const featured = projects.find((project) => project.placement === "featured");
const supporting = projects.filter((project) => project.placement === "supporting");
const further = projects.filter((project) => project.placement === "further");

const channels = [
  { label: "Email", value: person.email, href: mailtoHref(person.email), external: false },
  { label: "Phone", value: person.phone, href: telHref(person.phone), external: false },
  {
    label: "LinkedIn",
    value: person.linkedin,
    href: httpsHref(person.linkedin),
    external: true,
  },
  {
    label: "GitHub",
    value: person.github,
    href: httpsHref(person.github),
    external: true,
  },
];

export function HomePage() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#8ef0d2] focus:px-4 focus:py-2 focus:text-[#07111c]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">
        <Hero />
        <Metrics />
        <Work />
        <Experience />
        <Capabilities />
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

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#081221]/88 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <a href="#top" className="text-[0.95rem] font-semibold tracking-tight">
          <span className="sr-only">Home, </span>
          {person.name}
        </a>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-[#d5deea] underline-offset-4 hover:text-[#8ef0d2] hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto w-full max-w-[1120px] px-5 pt-12 pb-16 md:px-8 md:pt-20 md:pb-24">
      <p className="text-xs font-medium tracking-[0.22em] text-[#8ef0d2] uppercase">
        <span className="sr-only">Location: </span>
        {person.location}
      </p>
      <h1 className="mt-4 max-w-[16ch] text-[clamp(3.4rem,11vw,7.4rem)] leading-[0.88] font-bold tracking-[-0.045em]">
        {person.name}
        <span className="mt-3 block max-w-[18ch] font-serif text-[clamp(1.7rem,4vw,3rem)] leading-tight font-normal tracking-normal text-[#e8894a] italic">
          {person.role}
        </span>
      </h1>
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-14">
        <div>
          <p className="max-w-[42rem] text-base leading-7 text-[#e7eef6] md:text-lg md:leading-8">
            {person.summary}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              render={<a href="#work" />}
              className="h-12 rounded-sm px-5 text-[0.95rem] font-semibold"
            >
              Explore selected work
            </Button>
            <Button
              nativeButton={false}
              render={<a href="#contact" />}
              variant="outline"
              className="h-12 rounded-sm border-[#e8894a] bg-transparent px-5 text-[0.95rem] font-semibold text-[#e8894a] hover:bg-[#e8894a]/10 hover:text-[#e8894a]"
            >
              Start a conversation
            </Button>
          </div>
        </div>
        <aside
          aria-label="Profile"
          className="border border-white/12 bg-[#0c1930]"
        >
          <div className="h-1 bg-[#8ef0d2]" aria-hidden="true" />
          <div className="space-y-6 p-6 md:p-7">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-[#8ef0d2] uppercase">
                Now
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight">
                {profile.currentRole}
              </p>
              <p className="text-[#d5deea]">
                {profile.currentCompany}
                <span aria-hidden="true"> · </span>
                <span className="sr-only">, </span>
                {person.location}
              </p>
            </div>
            <ProfileList title="Focus" items={profile.focus} />
            <ProfileList title="Industries" items={profile.industries} />
            <ProfileList title="Platforms" items={profile.platforms} />
          </div>
        </aside>
      </div>
    </section>
  );
}

function ProfileList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.18em] text-[#8ef0d2] uppercase">
        {title}
      </p>
      <ul className="mt-2 space-y-1.5 text-sm leading-6 text-[#e7eef6]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Metrics() {
  return (
    <section aria-labelledby="impact-heading" className="border-y border-white/10 bg-[#0c1930]/80">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-14 md:px-8 md:py-16">
        <h2 id="impact-heading" className="text-xs font-medium tracking-[0.22em] text-[#8ef0d2] uppercase">
          Impact
        </h2>
        <p className="mt-3 max-w-[20ch] font-serif text-3xl text-[#f4f7fb] italic md:text-4xl">
          Three measured outcomes.
        </p>
        <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {metrics.map((metric, index) => (
            <li
              key={metric.label}
              className="border-t border-white/10 pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-6 md:first:border-l-0 md:first:pl-0"
            >
              <p className="font-serif text-sm text-[#e8894a] italic">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] leading-none font-bold tracking-tight">
                {metric.figure}
              </p>
              <p className="mt-3 text-base font-semibold">{metric.label}</p>
              <p className="mt-2 text-sm leading-6 text-[#d5deea]">{metric.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Work() {
  if (!featured) return null;

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto w-full max-w-[1120px] scroll-mt-24 px-5 py-16 md:px-8 md:py-24"
    >
      <SectionIntro
        id="work-heading"
        kicker="Selected work"
        title="A featured build, then the record around it."
      />
      <div className="mt-10">
        <ProjectArticle project={featured} featured />
      </div>
      <div className="mt-6 space-y-6">
        {supporting.map((project) => (
          <ProjectArticle key={project.name} project={project} />
        ))}
      </div>
      <div className="mt-16">
        <h3 className="font-serif text-3xl italic">Further engagements</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#d5deea]">
          The rest of the project record, with the same fields: type, challenge, approach, outcome, and stack.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
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
    <article className="border border-white/10 bg-[#0c1930]">
      <div className={featured ? "grid lg:grid-cols-12" : "grid"}>
        <div
          className={
            featured
              ? "border-b border-white/10 p-6 md:p-8 lg:col-span-5 lg:border-r lg:border-b-0"
              : "border-b border-white/10 p-6 md:p-7"
          }
        >
          <p className="text-xs font-medium tracking-[0.18em] text-[#8ef0d2] uppercase">
            {featured ? "Featured" : "Project"}
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, type: </span>
            {project.type}
          </p>
          <h3
            className={
              featured
                ? "mt-4 text-3xl leading-tight font-bold tracking-tight md:text-4xl"
                : "mt-3 text-2xl leading-tight font-bold tracking-tight"
            }
          >
            {project.name}
          </h3>
          <p className="mt-3 font-serif text-xl text-[#e8894a] italic md:text-2xl">
            {project.context}
          </p>
        </div>
        <div className={featured ? "lg:col-span-7" : undefined}>
          <dl className="divide-y divide-white/10">
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
              <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
                {project.tools.map((tool) => (
                  <li
                    key={tool}
                    className="border border-white/15 px-2 py-1 text-xs tracking-wide text-[#e7eef6]"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </Field>
          </dl>
        </div>
      </div>
    </article>
  );
}

function Field({
  label,
  children,
  compact,
}: {
  label: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "grid gap-2 px-6 py-4 md:px-7" : "grid gap-2 px-6 py-5 md:px-8"}>
      <dt className="text-xs font-medium tracking-[0.16em] text-[#8ef0d2] uppercase">
        {label}
      </dt>
      <dd className="text-sm leading-6 text-[#e7eef6]">{children}</dd>
    </div>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 border-t border-white/10"
    >
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 md:px-8 md:py-24">
        <SectionIntro
          id="experience-heading"
          kicker="Experience"
          title="Roles, places, and what changed."
        />
        <ol className="relative mt-12 space-y-12 border-l border-white/15 pl-0">
          {experience.map((role) => (
            <li key={`${role.company}-${role.dates}`} className="relative pl-8">
              <span
                className="absolute top-1.5 left-0 size-2.5 -translate-x-1/2 rounded-full bg-[#8ef0d2]"
                aria-hidden="true"
              />
              <div className="grid gap-3 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
                <p className="text-sm leading-6 text-[#d5deea]">
                  <span className="block font-medium text-[#f4f7fb]">{role.dates}</span>
                  {role.location}
                </p>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{role.company}</h3>
                  <p className="mt-1 font-serif text-xl text-[#e8894a] italic">{role.role}</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-[#e7eef6]">
                    {role.achievements.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-24 border-t border-white/10">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 md:px-8 md:py-24">
        <SectionIntro
          id="skills-heading"
          kicker="Skills"
          title="Capabilities, grouped for the work."
        />
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {capabilities.map((group) => (
            <article
              key={group.category}
              className="grid gap-4 py-8 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-10"
            >
              <h3 className="font-serif text-3xl leading-tight text-[#f4f7fb] italic">
                {group.category}
              </h3>
              <ul className="flex flex-wrap content-start gap-2" aria-label={group.category}>
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border border-white/15 px-2.5 py-1 text-sm text-[#e7eef6]"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section aria-labelledby="credentials-heading" className="border-t border-white/10">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-16 md:px-8 md:py-24">
        <SectionIntro
          id="credentials-heading"
          kicker="Record"
          title="Credentials and education."
        />
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-medium tracking-[0.18em] text-[#8ef0d2] uppercase">
              Certifications
            </h3>
            <ul className="mt-5 space-y-4">
              {certifications.map((item) => (
                <li key={item} className="border-l-2 border-[#e8894a] pl-4 text-base leading-6">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-medium tracking-[0.18em] text-[#8ef0d2] uppercase">
              Education
            </h3>
            <ul className="mt-5 space-y-6">
              {education.map((item) => (
                <li key={item.school} className="border-l-2 border-[#8ef0d2] pl-4">
                  <p className="text-lg font-semibold tracking-tight">{item.school}</p>
                  <p className="mt-1 font-serif text-lg text-[#e8894a] italic">{item.credential}</p>
                  <p className="mt-1 text-sm text-[#d5deea]">{item.dates}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-white/10">
      <div className="mx-auto w-full max-w-[1120px] scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
        <h2 id="contact-heading" className="text-xs font-medium tracking-[0.22em] text-[#8ef0d2] uppercase">
          Contact
        </h2>
        <p className="mt-3 max-w-[16ch] text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] font-bold tracking-tight">
          Start a{" "}
          <span className="font-serif font-normal text-[#e8894a] italic">conversation.</span>
        </p>
        <p className="mt-6 max-w-xl text-base leading-7 text-[#d5deea]">
          Email, phone, LinkedIn, and GitHub are the direct ways to reach {person.name}.
        </p>
        <ul className="mt-10 border-b border-white/10">
          {channels.map((channel) => (
            <li key={channel.label}>
              {channel.href ? (
                <a
                  href={channel.href}
                  className="flex min-h-16 flex-col justify-center gap-1 border-t border-white/10 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="text-xs font-medium tracking-[0.16em] text-[#8ef0d2] uppercase">
                    {channel.label}
                  </span>
                  <span className="text-base font-medium break-all sm:text-lg">
                    {channel.value}
                    {channel.external ? (
                      <span className="sr-only"> (opens in a new tab)</span>
                    ) : null}
                  </span>
                </a>
              ) : (
                <div className="flex min-h-16 flex-col justify-center gap-1 border-t border-white/10 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-xs font-medium tracking-[0.16em] text-[#8ef0d2] uppercase">
                    {channel.label}
                  </span>
                  <span className="text-base font-medium break-all">{channel.value}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-2 px-5 py-8 text-sm text-[#d5deea] md:flex-row md:items-center md:justify-between md:px-8">
        <p>{person.name}</p>
        <p>
          {person.role}
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
          {person.location}
        </p>
      </div>
    </footer>
  );
}

function SectionIntro({
  id,
  kicker,
  title,
}: {
  id: string;
  kicker: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.22em] text-[#8ef0d2] uppercase">{kicker}</p>
      <h2 id={id} className="mt-3 max-w-[18ch] text-4xl leading-[1.05] font-bold tracking-tight md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
