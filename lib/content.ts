import fs from "node:fs";
import path from "node:path";

/**
 * The original page remains the content source so this migration cannot
 * accidentally rewrite Dhruv's history. Layout and behavior can evolve
 * independently from the resume copy.
 */
function getSource(): string {
  return fs.readFileSync(
    path.join(process.cwd(), "content", "resume.html"),
    "utf8",
  );
}

export function getResumeContent(): string {
  const source = getSource();
  const firstSection = source.indexOf('<div id="work"');
  const archiveStart = source.indexOf('<div id="high-school"');

  if (firstSection === -1 || archiveStart === -1) {
    throw new Error("Could not find the resume sections in content/resume.html");
  }

  return source.slice(firstSection, archiveStart);
}

export function getHighSchoolContent(): string {
  const source = getSource();
  const archiveStart = source.indexOf('<div id="high-school"');
  const mainEnd = source.indexOf("</main>");

  if (archiveStart === -1 || mainEnd === -1) {
    throw new Error("Could not find the archived sections in content/resume.html");
  }

  return source.slice(archiveStart, mainEnd);
}
