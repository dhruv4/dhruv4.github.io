import { Hero } from "@/components/hero";
import { ModernSections } from "@/components/modern-sections";
import { profile } from "@/content/profile";

export default function Home() {
  return (
    <main className="modern-site">
      <header className="modern-nav">
        <a className="modern-nav__name" href="#top">DG</a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#research">Research</a>
        </nav>
        <a className="modern-nav__contact" href={`mailto:${profile.email}`}>Let&apos;s talk ↗</a>
      </header>

      <div id="top" className="modern-shell">
        <Hero />
        <ModernSections />
        <footer className="modern-footer">
          <p>Dhruv Gupta</p>
          <div>
            <a href={profile.linkedin}>LinkedIn</a>
            <a href={profile.twitter}>X</a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
          <p>Washington, DC · 2026</p>
        </footer>
      </div>
    </main>
  );
}
