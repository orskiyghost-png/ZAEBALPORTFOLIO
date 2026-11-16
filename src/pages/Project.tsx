import { Link, useParams } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { SplitHeadline } from '../components/SplitHeadline';
import { getProject } from '../data/projects';
import { NotFound } from './NotFound';

export function Project() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);

  if (!project) return <NotFound />;

  return (
    <article className="page project-page container">
      <Link className="page__back mono text-link" to="/work">Все работы</Link>
      <div className="page__eyebrow mono">{project.type} / {project.year}</div>
      <SplitHeadline lines={[project.title.toLocaleUpperCase('ru-RU')]} />
      <p className="project-page__subtitle">{project.subtitle}</p>
      <p className="page__intro">{project.oneLiner}</p>
      <dl className="project-page__facts">
        <div><dt className="mono">Роль</dt><dd>{project.role}</dd></div>
        <div><dt className="mono">Стек</dt><dd>{project.stack.join(', ')}</dd></div>
      </dl>
      <Reveal className="project-page__problem">
        <h2>Задача</h2>
        <p>{project.problem}</p>
      </Reveal>
    </article>
  );
}
