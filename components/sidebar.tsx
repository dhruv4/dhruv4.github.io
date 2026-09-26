"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { profile, retroNavigation } from "@/content/profile";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("work");
  const primary = retroNavigation.filter((item) => !item.group);
  const highSchool = retroNavigation.filter((item) => item.group === "High School");

  useEffect(() => {
    const sections = retroNavigation
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-12% 0px -70% 0px", threshold: [0, 0.1, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLink = (item: (typeof retroNavigation)[number]) => (
    <a
      key={item.href}
      href={item.href}
      className={active === item.href.slice(1) ? "is-active" : undefined}
      onClick={() => setOpen(false)}
    >
      {item.label}
    </a>
  );

  return (
    <>
      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="site-sidebar"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      <aside id="site-sidebar" className={`sidebar${open ? " is-open" : ""}`}>
        <a className="sidebar__identity" href="#head-section" onClick={() => setOpen(false)}>
          <Image src={profile.image} alt="" width={64} height={64} />
          <span>
            <strong>{profile.name}</strong>
            <small>{profile.emailLabel}</small>
          </span>
        </a>
        <nav aria-label="Page sections">
          <div className="sidebar__links">{primary.map(navLink)}</div>
          <p className="sidebar__label">High School</p>
          <div className="sidebar__links sidebar__links--nested">{highSchool.map(navLink)}</div>
        </nav>
      </aside>
      {open && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
