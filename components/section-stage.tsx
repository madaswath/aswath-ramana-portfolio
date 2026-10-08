"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Range = {
  id: string;
  start: number;
  length: number;
  content: number;
};

export function SectionStage({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const html = document.documentElement;
    html.classList.add("section-scroll");

    let ranges: Range[] = [];
    let frame = 0;
    let currentId = "";

    const sections = () =>
      Array.from(root.querySelectorAll<HTMLElement>(":scope > section"));

    const headerHeight = () =>
      document.querySelector("header")?.getBoundingClientRect().height ?? 0;

    const apply = () => {
      const available = Math.max(window.innerHeight - headerHeight(), 1);
      html.style.setProperty("--header-offset", `${headerHeight()}px`);
      const y = window.scrollY;
      let index = ranges.findIndex((range) => y < range.start + range.length - 0.5);
      if (index < 0) index = Math.max(ranges.length - 1, 0);
      const range = ranges[index];
      if (!range) return;

      const offset = Math.min(Math.max(y - range.start, 0), range.length);
      const overflow = Math.max(range.content - available, 0);
      const shift = range.length > 0 ? (offset / range.length) * overflow : 0;

      sections().forEach((section, sectionIndex) => {
        const active = sectionIndex === index;
        section.dataset.active = active ? "true" : "false";
        section.style.transform = active ? `translate3d(0, ${-shift}px, 0)` : "";
        section.toggleAttribute("inert", !active);
      });

      if (range.id !== currentId) {
        currentId = range.id;
        const nextHash = `#${range.id}`;
        if (window.location.hash !== nextHash) {
          history.replaceState(null, "", nextHash);
        }
      }
    };

    const measure = () => {
      const available = Math.max(window.innerHeight - headerHeight(), 1);
      let start = 0;
      ranges = sections().map((section) => {
        const content = section.offsetHeight;
        const length = Math.max(content, 1);
        const range = { id: section.id, start, length, content };
        start += length;
        return range;
      });
      const spacer = root.parentElement?.querySelector<HTMLElement>("[data-scroll-spacer]");
      if (spacer) spacer.style.height = `${start + available}px`;
      apply();
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    const scrollToId = (id: string, behavior: ScrollBehavior) => {
      const range = ranges.find((item) => item.id === id);
      if (!range) return;
      window.scrollTo({ top: range.start, behavior });
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a[href^='#']");
      if (!link || link.getAttribute("href") === "#content") return;
      const id = link.getAttribute("href")?.slice(1) ?? "";
      if (!ranges.some((range) => range.id === id)) return;
      event.preventDefault();
      scrollToId(id, "smooth");
    };

    const onHashChange = () => {
      const id = window.location.hash.replace("#", "") || "top";
      scrollToId(id, "auto");
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const line = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      window.scrollBy({ top: event.deltaY * line, left: 0, behavior: "auto" });
    };

    let touchY = 0;
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      touchY = event.touches[0].clientY;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const nextY = event.touches[0].clientY;
      window.scrollBy(0, touchY - nextY);
      touchY = nextY;
      event.preventDefault();
    };

    measure();
    const initial = window.location.hash.replace("#", "");
    if (initial) scrollToId(initial, "auto");

    const observer = new ResizeObserver(() => measure());
    sections().forEach((section) => observer.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    document.addEventListener("toggle", measure, true);
    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", measure, true);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      html.classList.remove("section-scroll");
      html.style.removeProperty("--header-offset");
      sections().forEach((section) => {
        section.dataset.active = "false";
        section.style.transform = "";
        section.removeAttribute("inert");
      });
    };
  }, []);

  return (
    <div className="section-stage">
      <div ref={rootRef} className="section-viewport">
        {children}
      </div>
      <div data-scroll-spacer aria-hidden="true" />
    </div>
  );
}
