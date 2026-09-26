import { education, projects, work } from "@/content/modern";

export function ModernSections() {
  return (
    <>
      <section id="work" className="modern-section">
        <h2>Work</h2>
        <div className="modern-work-list">
          {work.map((item) => (
            <article className="modern-work-row" key={item.company}>
              <span className="modern-work-row__years">{item.years}</span>
              <div>
                <h3><a href={item.href}>{item.company}</a></h3>
                <p>{item.role}</p>
                <p className="modern-work-row__description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="education" className="modern-section">
        <h2>Education</h2>
        <div className="modern-plain-list">
          {education.map((item) => (
            <article key={item.school}>
              <span>{item.year}</span>
              <div><h3><a href={item.href}>{item.school}</a></h3><p>{item.detail}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="modern-section">
        <h2>Projects</h2>
        <div className="modern-plain-list modern-plain-list--projects">
          {projects.map((item) => (
            <article key={item.name}>
              <div><h3><a href={item.href}>{item.name}</a></h3><p>{item.description}</p></div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
