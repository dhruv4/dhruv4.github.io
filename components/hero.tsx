import { EasterEggPortrait } from "@/components/easter-egg-portrait";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="modern-hero" aria-labelledby="page-title">
      <div className="modern-hero__copy">
        <h1 id="page-title">Dhruv Gupta</h1>
        <p className="modern-hero__lead">
          CEO &amp; Co-Founder at <a href="https://www.drumkit.ai">Drumkit</a>.
          <br />Logistics, technology, and politics.
        </p>
        <p className="modern-hero__note">
          Harvard and Y Combinator alum. <a href={profile.forbes}>Forbes 30 Under 30</a>.
        </p>
      </div>
      <div className="modern-hero__portrait">
        <EasterEggPortrait />
      </div>
    </section>
  );
}
