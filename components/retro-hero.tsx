import Image from "next/image";
import { profile } from "@/content/profile";

export function RetroHero() {
  return (
    <section id="head-section" className="hero" aria-labelledby="retro-page-title">
      <div className="hero__portrait-wrap">
        <Image
          className="hero__portrait"
          src={profile.image}
          alt="Dhruv Gupta"
          width={220}
          height={220}
          priority
        />
      </div>
      <div className="hero__copy">
        <h1 id="retro-page-title">{profile.name}</h1>
        <p className="hero__role">{profile.role}</p>
        <div className="hero__links">
          <a href={`mailto:${profile.email}`}>{profile.emailLabel}</a>
          <a href={profile.linkedin}>LinkedIn</a>
          <a href={profile.twitter}>Twitter</a>
        </div>
      </div>
      <div className="hero__intro">
        <p>CEO &amp; Co-Founder at Drumkit.</p>
        <p>Logistics, Technology, and Politics.</p>
        <p>Harvard, YC Alum.</p>
      </div>
    </section>
  );
}
