import { Link } from 'react-router-dom';
import { SplitHeadline } from '../components/SplitHeadline';
import { projects } from '../data/projects';
import { site } from '../data/site';

export function Work() {
  return (
    <section className="page container" aria-label="Все работы">
      <div className="page__eyebrow mono">{String(projects.length).padStart(2, '0')} работ / 2023—2025</div>
      <SplitHeadline lines={[site.work.heading]} />
      <p className="page__intro">{site.work.intro}</p>
      <ul className="project-index">
        {projects.map((project) => (
          <li className="project-index__item" key={project.slug}>
            <Link className="project-index__link" to={`/work/${project.slug}`}>
              <span className="project-index__title">{project.title}<span>{project.subtitle}</span></span>
              <span className="project-index__type mono">{project.type}</span>
              <span className="project-index__year mono">{project.year}</span>
              <span className="project-index__arrow" aria-hidden="true">↗</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
