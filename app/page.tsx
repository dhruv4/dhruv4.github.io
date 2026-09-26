import { Hero } from "@/components/hero";
import { ModernSections } from "@/components/modern-sections";
import { profile } from "@/content/profile";

export default function Home() {
  return (
    <main id="top" className="modern-site">
      <div className="modern-shell">
        <header className="modern-nav">
          <a className="modern-nav__name" href="#top">Dhruv Gupta</a>
          <nav aria-label="Contact links">
            <a href={profile.linkedin}>LinkedIn</a>
            <a href={profile.twitter}>X</a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </nav>
        </header>
        <Hero />
        <ModernSections />
        <footer className="modern-footer">
          <p>Washington, DC</p>
          <a href="#top">Back to top</a>
        </footer>
      </div>
    </main>
  );
}
