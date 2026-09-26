import type { Metadata } from "next";
import Link from "next/link";
import { InteractiveResume } from "@/components/interactive-resume";
import { getHighSchoolContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Time Capsule · Dhruv Gupta",
  description: "A small archive from an earlier internet.",
  robots: { index: false, follow: false },
};

export default function TimeCapsule() {
  return (
    <main className="archive-page">
      <header className="archive-header">
        <p className="archive-eyebrow">CLASSIFIED · CIRCA 2016</p>
        <h1>You found the time capsule.</h1>
        <p>Built before I knew enough to be embarrassed.</p>
        <Link href="/">Return to the present →</Link>
      </header>
      <InteractiveResume html={getHighSchoolContent()} />
    </main>
  );
}
