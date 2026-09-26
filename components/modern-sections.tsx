import { education, projects, research, volunteering, work } from "@/content/modern";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ModernSections() {
  return (
    <>
      <section id="work" className="modern-section">
        <div className="modern-section__heading"><p>01</p><h2>Selected work</h2></div>
        <div className="modern-work-list">
          {work.map((item) => (
            <a className={`modern-work-row${item.current ? " is-current" : ""}`} href={item.href} key={item.company}>
              <span className="modern-work-row__years">{item.years}</span>
              <span className="modern-work-row__identity"><strong>{item.company}</strong><span>{item.role}</span></span>
              <span className="modern-work-row__description">{item.description}</span>
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <section id="education" className="modern-section">
        <div className="modern-section__heading"><p>02</p><h2>Education</h2></div>
        <div className="modern-education">
          {education.map((item) => (
            <a href={item.href} key={item.school}>
              <span>{item.year}</span><strong>{item.school}</strong><p>{item.detail}</p><Arrow />
            </a>
          ))}
        </div>
      </section>

      <section id="projects" className="modern-section">
        <div className="modern-section__heading"><p>03</p><h2>Selected projects</h2></div>
        <div className="modern-projects">
          {projects.map((item, index) => (
            <a href={item.href} key={item.name}>
              <span>0{index + 1}</span>
              <div><h3>{item.name}</h3><p>{item.description}</p></div>
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <section id="research" className="modern-section modern-section--split">
        <div>
          <div className="modern-section__heading"><p>04</p><h2>Research</h2></div>
          <div className="modern-text-list">
            {research.map((item) => <article key={item.name}><h3>{item.name}</h3><p>{item.description}</p></article>)}
          </div>
        </div>
        <div>
          <div className="modern-section__heading"><p>05</p><h2>Community</h2></div>
          <ul className="modern-community">
            {volunteering.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
