import Image from "next/image";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section id="head-section" className="hero" aria-labelledby="page-title">
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
        <h1 id="page-title">{profile.name}</h1>
        <p className="hero__role">{profile.role}</p>
        <div className="hero__links" aria-label="Contact links">
          <a href={`mailto:${profile.email}`}>{profile.emailLabel}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">www.linkedin.com/in/dhruv4</a>
          <a href={profile.twitter} target="_blank" rel="noreferrer">www.twitter.com/iamdhruv4</a>
        </div>
      </div>
      <div className="hero__intro">
        <p>
          BD at <a href="https://www.zoba.com">Zoba</a>. Co-Founder at{" "}
          <a href="https://www.votemegaphone.org">Megaphone</a>
        </p>
        <p>Urban Mobility, Technology, and Politics.</p>
        <p>Harvard, YC Alum.</p>
      </div>
    </section>
  );
}
