"use client";

import { useEffect, useRef } from "react";

export function InteractiveResume({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activators = container.querySelectorAll<HTMLElement>(".activator");
    const revealTitles = container.querySelectorAll<HTMLElement>(".card-reveal .card-title");
    const collapsibleHeaders = container.querySelectorAll<HTMLElement>(".collapsible-header");
    container.querySelectorAll<HTMLElement>(".material-icons").forEach((icon) => {
      icon.setAttribute("aria-hidden", "true");
    });
    activators.forEach((activator) => {
      activator.tabIndex = 0;
      activator.setAttribute("role", "button");
    });
    revealTitles.forEach((title) => {
      title.tabIndex = 0;
      title.setAttribute("role", "button");
      title.setAttribute("aria-label", "Close details");
    });
    collapsibleHeaders.forEach((header) => {
      header.tabIndex = 0;
      header.setAttribute("role", "button");
      header.setAttribute("aria-expanded", "false");
    });

    const activate = (target: HTMLElement) => {
      const cardActivator = target.closest<HTMLElement>(".activator");
      const revealTitle = target.closest<HTMLElement>(".card-reveal .card-title");
      const collapsibleHeader = target.closest<HTMLElement>(".collapsible-header");
      if (cardActivator) {
        cardActivator.closest(".card")?.classList.add("is-revealed");
      } else if (revealTitle) {
        revealTitle.closest(".card")?.classList.remove("is-revealed");
      } else if (collapsibleHeader) {
        const item = collapsibleHeader.closest("li");
        const isOpen = item?.classList.toggle("is-open") ?? false;
        collapsibleHeader.setAttribute("aria-expanded", String(isOpen));
      }
    };

    const onClick = (event: MouseEvent) => activate(event.target as HTMLElement);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = event.target as HTMLElement;
      if (target.matches(".activator, .card-reveal .card-title, .collapsible-header")) {
        event.preventDefault();
        activate(target);
      }
    };
    container.addEventListener("click", onClick);
    container.addEventListener("keydown", onKeyDown);
    return () => {
      container.removeEventListener("click", onClick);
      container.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="resume-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
