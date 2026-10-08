import { Download, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nav, person } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e4e9f1] bg-white/92 backdrop-blur-md">
      <div className="page-wrap flex items-center justify-between gap-4 py-3">
        <a href="#top" className="font-serif text-xl tracking-tight text-[#1b2d4f]">
          <span className="sr-only">Home, </span>
          {person.name}
        </a>
        <div className="hidden items-center gap-3 lg:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-[#51627a] hover:text-[#1b2d4f]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Button
            nativeButton={false}
            render={<a href={person.resume.href} download={person.resume.filename} />}
            variant="outline"
            className="h-10 rounded-full px-3 text-sm font-semibold"
          >
            <Download className="size-4" aria-hidden="true" />
            Download resume
          </Button>
          <Button
            nativeButton={false}
            render={<a href="#contact" />}
            className="h-10 rounded-full px-3 text-sm font-semibold"
          >
            Get in touch
          </Button>
        </div>
        <details className="relative lg:hidden">
          <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-[#e4e9f1] text-[#1b2d4f]">
            <span className="sr-only">Open menu</span>
            <Menu aria-hidden="true" />
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute top-12 right-0 z-50 w-[min(18rem,calc(100vw-2.5rem))] rounded-2xl border border-[#e4e9f1] bg-white p-3 shadow-xl"
          >
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="block rounded-xl px-3 py-3 text-base text-[#1b2d4f] hover:bg-[#eef2f7]">
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="px-1 pt-2">
                <Button
                  nativeButton={false}
                  render={<a href={person.resume.href} download={person.resume.filename} />}
                  variant="outline"
                  className="h-11 w-full rounded-full"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download resume
                </Button>
              </li>
              <li className="px-1 pt-2">
                <Button
                  nativeButton={false}
                  render={<a href="#contact" />}
                  className="h-11 w-full rounded-full"
                >
                  Get in touch
                </Button>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
