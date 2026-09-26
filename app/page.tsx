import { Hero } from "@/components/hero";
import { ModernSections } from "@/components/modern-sections";

export default function Home() {
  return (
    <main id="top" className="modern-site">
      <div className="modern-shell">
        <Hero />
        <ModernSections />
      </div>
    </main>
  );
}
