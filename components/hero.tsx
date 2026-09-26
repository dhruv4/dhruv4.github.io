import { EasterEggPortrait } from "@/components/easter-egg-portrait";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="modern-hero" aria-labelledby="page-title">
      <div className="modern-hero__copy">
        <p className="modern-kicker">Logistics · Technology · Politics</p>
        <h1 id="page-title">Dhruv Gupta</h1>
        <p className="modern-hero__lead">
          CEO &amp; Co-Founder at <a href="https://www.drumkit.ai">Drumkit</a>.
          Working across logistics, technology, and politics.
        </p>
        <div className="modern-hero__proof" aria-label="Background">
          <a href={profile.forbes}>Forbes 30 Under 30</a>
          <span>Harvard</span>
          <span>Y Combinator</span>
        </div>
      </div>
      <div className="modern-hero__portrait">
        <EasterEggPortrait />
      </div>
    </section>
  );
}
