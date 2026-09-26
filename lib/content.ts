import fs from "node:fs";
import path from "node:path";

/**
 * The original page remains the content source so this migration cannot
 * accidentally rewrite Dhruv's history. Layout and behavior can evolve
 * independently from the resume copy.
 */
export function getResumeContent(): string {
  const source = fs.readFileSync(
    path.join(process.cwd(), "content", "resume.html"),
    "utf8",
  );
  const firstSection = source.indexOf('<div id="work"');
  const mainEnd = source.indexOf("</main>");

  if (firstSection === -1 || mainEnd === -1) {
    throw new Error("Could not find the resume sections in content/resume.html");
  }

  return source.slice(firstSection, mainEnd);
}
