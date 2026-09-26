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

function getDivById(source: string, id: string): string {
  const start = source.indexOf(`<div id="${id}"`);
  if (start === -1) throw new Error(`Could not find #${id} in content/resume.html`);

  const divTag = /<\/?div\b[^>]*>/gi;
  divTag.lastIndex = start;
  let depth = 0;
  let match: RegExpExecArray | null;

  while ((match = divTag.exec(source))) {
    depth += match[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return source.slice(start, divTag.lastIndex);
  }

  throw new Error(`Could not find the end of #${id} in content/resume.html`);
}

function cardGrid(source: string, ids: string[]): string {
  const cards = ids.map((id) => getDivById(source, id));
  const rows: string[] = [];

  for (let index = 0; index < cards.length; index += 2) {
    const row = cards.slice(index, index + 2).map((card, cardIndex) => {
      const offset = cardIndex === 1 ? " offset-m1" : "";
      return `<div class="col s12${offset} m5">${card}</div>`;
    });
    rows.push(`<div class="row">${row.join("")}</div>`);
  }

  return rows.join("");
}

function cardSection(
  source: string,
  id: string,
  title: string,
  cardIds: string[],
): string {
  return `<div id="${id}" class="container scrollspy">
    <div class="row"><div class="col s12">
      <h4 class="grey-text text-darken-2">${title}</h4>
      <h6 class="grey-text text-darken-2">Select a card to read more</h6>
    </div></div>
    ${cardGrid(source, cardIds)}
  </div>`;
}

export function getResumeContent(): string {
  const source = getSource();
  return [
    cardSection(source, "work", "Work Experience", [
      "drumkit",
      "zoba",
      "megaphone",
      "bikepath",
    ]),
    cardSection(source, "education", "Education", [
      "yc-education",
      "harvard-education",
    ]),
    getDivById(source, "apps"),
    getDivById(source, "volunteering"),
    getDivById(source, "research"),
  ].join("\n");
}

export function getArchiveContent(): string {
  const source = getSource();
  const archiveStart = source.indexOf('<div id="high-school"');
  const mainEnd = source.indexOf("</main>");

  if (archiveStart === -1 || mainEnd === -1) {
    throw new Error("Could not find the archived sections in content/resume.html");
  }

  return [
    cardSection(source, "internships", "Internships", [
      "bwater",
      "msft",
      "capone",
      "means",
      "harvard",
      "innolance",
    ]),
    cardSection(source, "early-education", "Earlier Education", [
      "high-school-education",
    ]),
    getDivById(source, "ecs"),
    getDivById(source, "patents"),
    source.slice(archiveStart, mainEnd),
  ].join("\n");
}

export function getFullResumeContent(): string {
  const source = getSource();
  const firstSection = source.indexOf('<div id="work"');
  const mainEnd = source.indexOf("</main>");

  if (firstSection === -1 || mainEnd === -1) {
    throw new Error("Could not find the full resume in content/resume.html");
  }

  return source
    .slice(firstSection, mainEnd)
    .replaceAll('src="media/', 'src="/media/');
}
