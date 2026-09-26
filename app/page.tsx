import { Hero } from "@/components/hero";
import { InteractiveResume } from "@/components/interactive-resume";
import { Sidebar } from "@/components/sidebar";
import { getResumeContent } from "@/lib/content";

export default function Home() {
  const resumeHtml = getResumeContent();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Sidebar />
      <main id="main-content" className="site-main">
        <Hero />
        <InteractiveResume html={resumeHtml} />
      </main>
    </>
  );
}
