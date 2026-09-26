import type { Metadata } from "next";
import { InteractiveResume } from "@/components/interactive-resume";
import { RetroHero } from "@/components/retro-hero";
import { Sidebar } from "@/components/sidebar";
import { getFullResumeContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Time Capsule · Dhruv Gupta",
  description: "An archive from an earlier internet.",
  robots: { index: false, follow: false },
};

export default function TimeCapsule() {
  return (
    <div className="retro-page">
      <a className="skip-link" href="#retro-content">Skip to content</a>
      <Sidebar />
      <main id="retro-content" className="site-main">
        <RetroHero />
        <InteractiveResume html={getFullResumeContent()} />
      </main>
      <a className="retro-return" href="/">Return to 2026 →</a>
    </div>
  );
}
