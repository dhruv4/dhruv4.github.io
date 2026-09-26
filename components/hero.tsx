import { profile } from "@/content/profile";
import { EasterEggPortrait } from "@/components/easter-egg-portrait";

export function Hero() {
  return (
    <section id="head-section" className="hero" aria-labelledby="page-title">
      <div className="hero__portrait-wrap">
        <EasterEggPortrait />
      </div>
      <div className="hero__copy">
        <h1 id="page-title">{profile.name}</h1>
        <p className="hero__role">{profile.role}</p>
        <div className="hero__links" aria-label="Contact links">
          <a href={`mailto:${profile.email}`}>{profile.emailLabel}</a>
          <div className="hero__socials">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.8 9.8h4.36V21H2.8V9.8Zm7.06 0h4.18v1.53h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.22 2.9 5.22 6.67V21h-4.35v-4.67c0-1.11-.02-2.55-1.56-2.55-1.56 0-1.8 1.22-1.8 2.47V21H9.86V9.8Z" />
              </svg>
            </a>
            <a
              href={profile.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              title="X"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.26-8.3L2.97 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.84h1.73L8.43 4.05H6.58L17.8 19.84Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="hero__intro">
        <p>
          CEO &amp; Co-Founder at <a href="https://www.drumkit.ai">Drumkit</a>.
        </p>
        <p>Logistics, Technology, and Politics.</p>
        <p>
          Harvard, YC Alum. <a href={profile.forbes}>Forbes 30 Under 30</a>.
        </p>
      </div>
    </section>
  );
}
